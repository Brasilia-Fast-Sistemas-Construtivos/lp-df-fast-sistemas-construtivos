# LP Fast Sistemas Construtivos — Brasília (DF)

Landing page de captação de leads para steel frame, drywall, obras e serviços da Fast em Brasília.

Domínio: `df.fastsistemasconstrutivos.com.br`

O site comunica a marca Fast com atendimento dedicado ao DF — não se posiciona como franqueada. Detalhes em [docs/regras.md](docs/regras.md).

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Estilização | Emotion (`@emotion/react`, `@emotion/styled`) + CSS Variables |
| Carrossel | Swiper |
| Ícones | `@phosphor-icons/react` |
| Linguagem | TypeScript |

## Rodando

```bash
npm run dev
npm run build
npm start
```

## Estrutura

```
docs/                     briefing e regras do projeto
public/
  brand/                  logos e ícones da marca
  images/                 imagens da LP
src/
  app/                    rotas (App Router)
    globals.css           entrada única do CSS
    layout.tsx            fontes, metadata e providers
    page.tsx              home
  components/
    layout/               header, footer, shell
    providers/            EmotionProvider
    sections/             seções da LP
    ui/                   componentes reutilizáveis
  data/                   dados estáticos (contato, marca, conteúdo)
  hooks/                  hooks customizados
  lib/                    utilitários e integrações
  styles/
    reset.css             reset base
    tokens/theme.css      tokens da identidade visual
    tokens/theme-helpers.css
    components/effects.css
  types/                  tipos compartilhados
```

## Identidade visual

Espelhada de `app/i-fast-sistemas-construtivos`. Cores, fontes e raios ficam em [src/styles/tokens/theme.css](src/styles/tokens/theme.css).

As variáveis `--font-dm-sans`, `--font-urbanist` e `--font-manrope` são injetadas pelo `next/font` em [src/app/layout.tsx](src/app/layout.tsx) e consumidas por `--font-body`, `--font-display` e `--font-alt`. Não redefina essas três variáveis no CSS.

## SEO

Arquitetura, rotas geradas e pendências de dados em [docs/seo.md](docs/seo.md).

## Antes de codar

Leia [docs/regras.md](docs/regras.md), [docs/briefing.md](docs/briefing.md) e [docs/seo.md](docs/seo.md).

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica usada em `metadataBase` e Open Graph |

## Deploy

GitHub para versionamento, Vercel (plano free) para hospedagem.
