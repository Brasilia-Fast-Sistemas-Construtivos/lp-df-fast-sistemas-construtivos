# Arquitetura da aplicação

## Princípio

É uma landing page, mas não parece uma. O visitante precisa sentir estrutura de site profissional — menu, footer, políticas, tudo no lugar — sem nunca ser levado para longe do objetivo, que é preencher o formulário.

Regra prática: **navegar dentro da página, nunca para fora dela.**

## Navegação

### Menu

Header fixo com âncoras para as seções da própria página. Nenhum item de menu leva para fora da LP.

- Links de âncora com scroll suave, respeitando `scroll-margin-block-start: var(--header-height)`
- Indicação da seção ativa conforme o scroll
- CTA no header abre o modal do formulário, como todo botão do site
- Mobile: menu em painel, com o CTA sempre visível
- O logo volta para o topo, não para outro site

### Footer

Robusto e organizado, transmitindo empresa estabelecida — sem virar um labirinto.

Colunas previstas:

| Coluna | Conteúdo |
| --- | --- |
| Marca | Logo, frase curta de posicionamento, contato |
| Soluções | Âncoras para as seções de serviço da LP |
| Atendimento | Regiões atendidas (reforço de SEO local) |
| Institucional | Link para o site nacional e as políticas |
| Legal | Políticas, CNPJ, copyright |

Links externos (site nacional, redes) marcados com `rel="noopener noreferrer"` e sinalizados visualmente como saída.

## Políticas

Cinco páginas, espelhando a estrutura do institucional:

```
/politicas                 índice
/politicas/privacidade
/politicas/cookies
/politicas/lgpd
/politicas/termos
/politicas/seguranca
```

Regras:

- **Conteúdo** adaptado do institucional (`app/(site)/politicas/` de `i-fast-sistemas-construtivos`)
- **Contato e e-mail sempre os daqui** — `CONTACT` em `src/data/site.ts`, nunca os do institucional
- Layout próprio com sidebar de navegação entre as políticas
- `noIndex` não se aplica: políticas indexadas reforçam confiança
- Cada política registra data de última atualização
- Voltar para a LP precisa ser óbvio em qualquer ponto

Como são as únicas rotas fora da raiz, precisam entrar em `PAGES` no `src/data/seo.ts` para constar no sitemap.

## Consentimento de cookies

Popup de aprovação, adaptado de `components/cookies/CookieConsentPopup.tsx` do institucional.

- Chave de storage `cookie_consent_choice` — **precisa ser a mesma** usada pelo módulo de atribuição, senão a promoção de UTM quebra
- Aceitar promove a atribuição de `sessionStorage` para `localStorage`
- Recusar mantém tudo efêmero na sessão
- Não pode cobrir o botão de WhatsApp nem o CTA principal no mobile
- Não bloqueia o conteúdo antes da escolha; a LP continua utilizável

## Atribuição e UTM

O ativo mais importante para marketing. Origem: `utils/attribution.ts` + `components/utm/UtmPersist.tsx` do institucional.

### O que precisa continuar funcionando

- Captura de `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`
- Click IDs: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid`, `igshid`, `gad_source`, `gad_campaignid`
- **Last-paid-click com janela de 90 dias**: visita orgânica não derruba origem paga dentro da janela
- Persistência condicionada ao consentimento — `localStorage` com aceite, `sessionStorage` sem
- Reescrita de `href` em toda âncora, interna e externa, preservando os parâmetros
- Opt-out por elemento via `data-no-utm`
- `openWithUtm()` para aberturas programáticas

### Onde a atribuição precisa chegar

Todo envio de formulário carrega os parâmetros de origem **mais** o `id` do botão que abriu o modal. Sem isso não há como saber qual campanha e qual seção geraram o lead.

```
utm_source, utm_medium, utm_campaign, ... + origin (id do gatilho)
```

O link do WhatsApp também propaga a atribuição.

## Movimento

`SmoothScroll` (Lenis) adaptado do institucional, que já resolve o essencial:

- Desliga em `prefers-reduced-motion`
- Desliga em `pointer: coarse` — sem smooth scroll forçado no mobile
- Integra Lenis ao GSAP ScrollTrigger via ticker, com `lagSmoothing(0)`, evitando conflito e tremor

GSAP 3.15 está instalado com todos os plugins (ScrollTrigger, SplitText, ScrollSmoother, Flip, Observer) — desde a aquisição pela Webflow, o que era Club virou público.

O plano de motion por seção vive em [design.md](design.md).

## Componentes vindos do institucional

| Origem | Destino | Ajuste necessário |
| --- | --- | --- |
| `utils/attribution.ts` | `src/lib/attribution.ts` | Remover comentários |
| `components/utm/UtmPersist.tsx` | `src/components/utm/UtmPersist.tsx` | Trocar dependência do popup de contato pelo modal daqui |
| `components/layout/SmoothScroll.tsx` | `src/components/layout/SmoothScroll.tsx` | Remover comentários |
| `components/cookies/CookieConsentPopup.tsx` | `src/components/cookies/` | Adaptar visual à direção desta LP |
| `components/layout/WhatsAppButton.tsx` | `src/components/layout/` | Mensagem e número vindos de `data/site.ts` |
| `app/(site)/politicas/` | `src/app/politicas/` | Contato daqui, layout próprio |

Nada é copiado sem passar pelas regras de [regras.md](regras.md): sem comentário, sem hardcode, styled aninhado, media query inline.
