# Integrações

## Mapa dos arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `src/data/integrations.ts` | ID do container GTM, rota interna do lead, URL do webhook n8n |
| `src/components/analytics/GoogleTagManager.tsx` | Consent Mode v2 + carregamento do GTM + fallback `noscript` |
| `src/lib/analytics.ts` | `pushDataLayerEvent` e `updateConsentState` |
| `src/lib/leads.ts` | Envio do formulário para a rota interna |
| `src/app/api/lead/route.ts` | Validação no servidor e repasse ao webhook do n8n |
| `src/components/cookies/CookieConsent.tsx` | Escolha do usuário, que atualiza o consentimento no GTM |

## Variáveis de ambiente

Nenhuma é obrigatória: todas têm valor padrão no código. Defina na Vercel quando precisar trocar sem deploy de código.

| Variável | Padrão | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://df.fastsistemasconstrutivos.com.br` | Base de canonical, OG, sitemap e schema |
| `NEXT_PUBLIC_GTM_ID` | `GTM-KLTB6X2D` | Container do Google Tag Manager |
| `LEAD_WEBHOOK_URL` | webhook n8n de produção | Destino do lead. Só servidor, não vai para o navegador |
| `GOOGLE_SITE_VERIFICATION` | ausente | Emite a meta de verificação do Search Console quando preenchida |

## Google Tag Manager

Container `GTM-KLTB6X2D`, carregado com `next/script` em `strategy="afterInteractive"` (a tag entra depois da hidratação, para não competir com o LCP da dobra).

O `noscript` com o iframe fica como primeiro elemento do `<body>`, conforme o snippet oficial.

### Consent Mode v2

O site já tinha banner de cookies com opção de recusar. Para a escolha valer também para as tags, um script inline no `<head>` roda **antes** do GTM e define o estado inicial:

```
ad_storage · ad_user_data · ad_personalization · analytics_storage → denied
functionality_storage · security_storage → granted
wait_for_update → 500ms
```

Se o visitante já tinha aceitado antes, o estado inicial sobe como `granted` na mesma leitura. Ao clicar em Aceitar ou Recusar, `updateConsentState()` dispara `gtag("consent","update",…)` e empurra o evento `consent_state` para o dataLayer.

Consequência prática para mídia: com consentimento negado, as tags do Google continuam recebendo os eventos, mas sem cookie de identificação (pings sem cookie, conversão modelada). Se o time de tráfego preferir consentimento liberado por padrão, a mudança é só o `estado` inicial em `CONSENT_DEFAULT_SCRIPT`, e aí o banner precisa ser revisto junto com o jurídico.

### Eventos no dataLayer

| Evento | Quando | Campos |
| --- | --- | --- |
| `consent_state` | Carregamento e a cada escolha no banner | `consent_state` |
| `form_open` | Modal do formulário abre | `form_origin` |
| `steel_conecta_view` | Seção `#steel-conecta` entra em 40% da viewport, uma vez por sessão de página | nenhum |
| `generate_lead` | Envio aceito pelo webhook | `form_origin`, `interesse`, `atendimento`, `tipo_obra`, `regiao` |

`form_origin` é a origem do botão que abriu o modal (`hero`, `sistemas-drywall`, `footer`…). É o que permite saber qual seção converte.

## Formulário e webhook do n8n

O navegador **não** fala direto com o n8n. O caminho é:

```
FormModal → POST /api/lead → validação no servidor → POST webhook n8n
```

Motivo: as regras do projeto pedem validação no client e no server, e assim a URL do webhook não vai no bundle do navegador.

### Contrato enviado ao n8n

```json
{
  "nome": "Ana Paula",
  "telefone": "(61) 9 8119-1999",
  "email": "ana@exemplo.com",
  "estado": "Distrito Federal",
  "cidade": "Brasília",
  "tipoObra": "Construção Residencial",
  "metragemEstimada": "80 a 200 m²",
  "temProjeto": "Não",
  "temLocal": "Sim",
  "etapaObra": "Não informado",
  "sistemaEmUso": "Não informado",
  "descricao": "Descrição opcional do que será feito",
  "referrer": "https://df.fastsistemasconstrutivos.com.br/?utm_source=ig&utm_medium=organic",
  "regiao": "Asa Sul",
  "interesse": "ambos",
  "interesseLabel": "Material + mão de obra",
  "atendimento": "Steel Conecta",
  "origin": "hero"
}
```

### `interesse`: o parâmetro que separa os dois fluxos

O passo 1 do formulário pergunta o que a pessoa precisa e grava a resposta em `interesse`. É esse valor que decide a marca do formulário, as perguntas do passo 2 e para qual time o lead vai.

| `interesse` | `interesseLabel` | `atendimento` | Fluxo |
| --- | --- | --- | --- |
| `material` | Só material | Fast Sistemas Construtivos | Material |
| `mao_obra` | Só mão de obra | Steel Conecta | Execução |
| `ambos` | Material + mão de obra | Steel Conecta | Execução |

`interesseLabel` e `atendimento` são derivados no servidor a partir de `interesse`, em `OPCOES_INTERESSE` (`src/data/content.ts`). O n8n pode rotear só por `interesse`; os outros dois existem para não obrigar a automação a traduzir slug.

O contrato mantém **as mesmas chaves nos dois fluxos**. O que a pessoa não respondeu vai como `"Não informado"` (`VALOR_NAO_INFORMADO`), para nenhum node do n8n quebrar por campo ausente:

| Campo | Fluxo Material | Fluxo Execução |
| --- | --- | --- |
| `regiao` | respondido | respondido |
| `etapaObra` | respondido | `Não informado` |
| `sistemaEmUso` | respondido | `Não informado` |
| `tipoObra` | `Não informado` | respondido |
| `metragemEstimada` | `Não informado` | respondido |
| `temProjeto` | `Não informado` | respondido |
| `temLocal` | `Não informado` | respondido |
| `descricao` | lista de materiais, opcional | o que precisa, opcional |

`descricao` é o mesmo campo nos dois fluxos, com rótulo diferente: no fluxo de material ele é a **lista de materiais** e aparece no passo 2; no fluxo de execução é o campo aberto do passo 3. Não foi criada uma chave nova para não duplicar texto livre no contrato.

Além disso, quando houver atribuição persistida, os parâmetros vão como campos à parte (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `gclid`, `fbclid` e os demais de `ATTRIBUTION_KEYS`). O contrato do n8n dá prioridade a esses campos sobre o que estiver na query da `referrer`, que é o comportamento desejado: a `referrer` é a URL da página no momento do envio, e os UTMs são o último clique relevante, que pode ter vindo de uma sessão anterior.

`origin` e `regiao` não fazem parte do contrato original do n8n. Vão junto porque `origin` é a única forma de saber de qual botão veio o lead, e `regiao` é a informação que o comercial usa para agendar a visita. Campo extra é ignorado pela automação.

### Cidade, estado e região

O formulário pergunta a **região da obra** em campo aberto, não a cidade. O que a pessoa digita vai inteiro em `regiao`, e o servidor deriva `cidade` e `estado` por comparação normalizada (sem acento, sem caixa) com `REGIOES_ATENDIDAS`:

| O que foi digitado | `cidade` | `estado` |
| --- | --- | --- |
| Bate com uma RA do DF (`Asa Sul`, `guara`, `ÁGUAS CLARAS`…) | `Brasília` | `Distrito Federal` |
| Começa com "Entorno" | o texto digitado | `Goiás` |
| Qualquer outra coisa | o texto digitado | `Não informado` |

O DF é município único, então toda RA é Brasília: mandar "Asa Sul" no campo `cidade` quebraria a semântica do contrato. A RA vai preservada em `regiao`.

Fora disso o servidor não inventa: prefere repassar o texto em `cidade` e marcar o estado como `Não informado` a afirmar "Distrito Federal" para quem escreveu uma cidade de Goiás. Quem atende confirma no contato. Se a automação precisar de `estado` sempre preenchido, o ajuste é uma linha em `src/app/api/lead/route.ts`.

### Campos do formulário

| Campo | Tipo | Obrigatório em | Valores |
| --- | --- | --- | --- |
| `interesse` | cartões de escolha | sempre | `material`, `mao_obra`, `ambos` |
| `regiao` | texto | sempre | livre, mínimo 2 caracteres, até 80 |
| `etapaObra` | select | fluxo Material | `Planejamento`, `Início da execução`, `Final da obra` |
| `sistemaEmUso` | select | fluxo Material | `Drywall`, `Steel Frame`, `Drywall + Steel Frame` |
| `tipoObra` | select | fluxo Execução | `Construção Residencial`, `Construção Comercial`, `Reforma ou Ampliação` |
| `metragemEstimada` | texto | fluxo Execução | livre, não vazio, até 60 |
| `temProjeto` | Sim/Não | fluxo Execução | `Sim`, `Não` |
| `temLocal` | Sim/Não | fluxo Execução | `Sim`, `Não` |
| `nome` | texto | sempre | mínimo 2 caracteres |
| `telefone` | tel | sempre | mínimo 10 dígitos, máscara no client |
| `email` | e-mail | sempre | formato validado |
| `descricao` | textarea | nunca | até 2000 caracteres |

A validação do servidor segue a mesma tabela: com `interesse=material`, o payload é recusado se faltar `etapaObra` ou `sistemaEmUso`, e `tipoObra`, `metragemEstimada`, `temProjeto` e `temLocal` não são exigidos. Nos outros dois valores, o inverso.

`estado` e `cidade` não são campos de tela, saem da região (tabela acima). Pedir o estado numa LP que atende só o DF seria fricção sem informação nova.

O telefone vai como o cliente digitou. O node `Padroniza e limpa os dados` do n8n normaliza para `55DDDNÚMERO`.

### Três etapas com ramificação

Dez campos num modal derrubam conversão. O formulário abre em três passos, e o primeiro decide os outros dois:

1. **O que você precisa** — três cartões de escolha, grava `interesse`
2. **A obra** — perguntas diferentes por fluxo, nenhuma digitação obrigatória, teclado não aparece no mobile
3. **Seu contato** — nome, telefone e e-mail

No fluxo de material o passo 2 pergunta região, etapa da obra, sistema em uso e a lista de materiais, que é o que o comercial precisa para separar e cotar o pedido. No fluxo de execução o passo 2 pergunta tipo de obra, região, metragem, projeto e local, que é o que a equipe precisa para escopar o serviço. O passo 3 é o mesmo nos dois, sem repetir a pergunta aberta no fluxo de material, já respondida no passo 2.

Marca, título e texto do botão final acompanham o fluxo: `Pedir orçamento` no fluxo Fast, `Falar com a Steel Conecta` no fluxo de execução, com selo "Steel Conecta · Execução" no topo do modal. A troca acontece assim que a pessoa marca a opção no passo 1, antes de continuar, para o roteamento ficar visível.

Quem chega pela barra do hero já tem o passo 3 preenchido. Quem chega por um card de sistema já tem o `tipoObra` preenchido (`TIPO_OBRA_POR_SISTEMA`). Quem chega pelos botões da seção Steel Conecta ou da faixa de execução em Obras já tem `interesse=ambos` marcado no passo 1, e confirma ou troca em um toque.

Decisões e a skill de origem estão em [design.md](design.md) e nas regras de UX consultadas: indicador de passo (`ux-guidelines` #82), validação no blur para texto (#56), rota de escape com botão Voltar (`escape-routes`), label sempre visível (`input-labels`).

### Respostas da rota `/api/lead`

| Status | Significado |
| --- | --- |
| `204` | Lead aceito e repassado |
| `400` | Payload inválido. Corpo traz `camposInvalidos` |
| `502` | n8n fora do ar, recusou ou estourou 10s de timeout |

Em qualquer falha o modal pede nova tentativa e mostra o telefone. O WhatsApp foi retirado do modal de propósito: o formulário é o único caminho com rastreio de origem e atribuição, e oferecer o WhatsApp ali drenava lead para um canal cego. O botão flutuante de WhatsApp na página continua, como canal secundário.

### Teste manual

```bash
curl -X POST https://df.fastsistemasconstrutivos.com.br/api/lead \
  -H "Content-Type: application/json" \
  -d '{"interesse":"ambos","nome":"Teste Fast","telefone":"61999999999","email":"teste@exemplo.com","regiao":"Asa Sul","tipoObra":"Construção Residencial","metragemEstimada":"30 a 80 m²","temProjeto":"Sim","temLocal":"Sim","descricao":"teste de integração","origin":"teste-manual","referrer":"https://df.fastsistemasconstrutivos.com.br/"}'
```

E o fluxo de material:

```bash
curl -X POST https://df.fastsistemasconstrutivos.com.br/api/lead \
  -H "Content-Type: application/json" \
  -d '{"interesse":"material","nome":"Teste Fast","telefone":"61999999999","email":"teste@exemplo.com","regiao":"Guará","etapaObra":"Planejamento","sistemaEmUso":"Drywall","descricao":"40 placas standard e 60 montantes de 70mm","origin":"teste-manual","referrer":"https://df.fastsistemasconstrutivos.com.br/"}'
```

Resposta esperada: `204` sem corpo, e o lead aparecendo na automação.
