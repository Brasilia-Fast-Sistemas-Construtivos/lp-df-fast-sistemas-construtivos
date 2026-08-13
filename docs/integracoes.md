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
| `generate_lead` | Envio aceito pelo webhook | `form_origin`, `tipo_obra`, `regiao` |

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
  "descricao": "Descrição opcional do que será feito",
  "referrer": "https://df.fastsistemasconstrutivos.com.br/?utm_source=ig&utm_medium=organic",
  "regiao": "Asa Sul",
  "origin": "hero"
}
```

Além disso, quando houver atribuição persistida, os parâmetros vão como campos à parte (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `gclid`, `fbclid` e os demais de `ATTRIBUTION_KEYS`). O contrato do n8n dá prioridade a esses campos sobre o que estiver na query da `referrer`, que é o comportamento desejado: a `referrer` é a URL da página no momento do envio, e os UTMs são o último clique relevante, que pode ter vindo de uma sessão anterior.

`origin` e `regiao` não fazem parte do contrato original do n8n. Vão junto porque `origin` é a única forma de saber de qual botão veio o lead, e `regiao` é a informação que o comercial usa para agendar a visita. Campo extra é ignorado pela automação.

### Cidade, estado e região

O formulário pergunta a **região da obra**, não a cidade, porque `REGIOES_ATENDIDAS` é lista de regiões administrativas do DF (Asa Sul, Guará, Ceilândia…). O servidor deriva os campos do contrato:

| Região escolhida | `cidade` | `estado` |
| --- | --- | --- |
| Qualquer RA do DF | `Brasília` | `Distrito Federal` |
| `Entorno do DF` | `Entorno do DF` | `Goiás` |

O DF é município único, então toda RA é Brasília: mandar "Asa Sul" no campo `cidade` quebraria a semântica do contrato. A RA vai preservada em `regiao`. No caso do entorno, a cidade exata não é perguntada para não criar mais um campo; quem atende confirma no contato.

### Campos do formulário

| Campo | Tipo | Obrigatório | Valores |
| --- | --- | --- | --- |
| `tipoObra` | select | sim | `Construção Residencial`, `Construção Comercial`, `Reforma ou Ampliação` |
| `regiao` | select | sim | RAs do DF e "Entorno do DF" (`REGIOES_ATENDIDAS`) |
| `metragemEstimada` | select | sim | faixas de `FAIXAS_METRAGEM`, incluindo "Ainda não sei" |
| `temProjeto` | Sim/Não | sim | `Sim`, `Não` |
| `temLocal` | Sim/Não | sim | `Sim`, `Não` |
| `nome` | texto | sim | mínimo 2 caracteres |
| `telefone` | tel | sim | mínimo 10 dígitos, máscara no client |
| `email` | e-mail | sim | formato validado |
| `descricao` | textarea | não | até 2000 caracteres |

`estado` e `cidade` não são campos de tela, saem da região (tabela acima). Pedir o estado numa LP que atende só o DF seria fricção sem informação nova.

O telefone vai como o cliente digitou. O node `Padroniza e limpa os dados` do n8n normaliza para `55DDDNÚMERO`.

### Duas etapas

Dez campos num modal derrubam conversão. O formulário abre em dois passos:

1. **A obra** — cinco escolhas, nenhuma digitação, teclado não aparece no mobile
2. **Seu contato** — nome, telefone, e-mail e a descrição opcional

Quem chega pela barra do hero já tem o passo 2 preenchido. Quem chega por um card de sistema já tem o `tipoObra` preenchido (`TIPO_OBRA_POR_SISTEMA`).

Decisões e a skill de origem estão em [design.md](design.md) e nas regras de UX consultadas: indicador de passo (`ux-guidelines` #82), validação no blur para texto (#56), rota de escape com botão Voltar (`escape-routes`), label sempre visível (`input-labels`).

### Respostas da rota `/api/lead`

| Status | Significado |
| --- | --- |
| `204` | Lead aceito e repassado |
| `400` | Payload inválido. Corpo traz `camposInvalidos` |
| `502` | n8n fora do ar, recusou ou estourou 10s de timeout |

Em qualquer falha o modal mostra o caminho alternativo: WhatsApp e telefone. Lead não se perde em silêncio.

### Teste manual

```bash
curl -X POST https://df.fastsistemasconstrutivos.com.br/api/lead \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste Fast","telefone":"61999999999","email":"teste@exemplo.com","regiao":"Asa Sul","tipoObra":"Construção Residencial","metragemEstimada":"30 a 80 m²","temProjeto":"Sim","temLocal":"Sim","descricao":"teste de integração","origin":"teste-manual","referrer":"https://df.fastsistemasconstrutivos.com.br/"}'
```

Resposta esperada: `204` sem corpo, e o lead aparecendo na automação.
