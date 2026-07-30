# SEO — arquitetura e operação

## Mapa dos arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `src/data/seo.ts` | Conteúdo semântico: serviços, áreas atendidas, públicos, keywords, FAQ, páginas |
| `src/data/site.ts` | Identidade, contato e dados do negócio (`BUSINESS`) |
| `src/data/brand.ts` | Cores da marca em TS, para uso fora do CSS |
| `src/types/seo.ts` | Tipos compartilhados |
| `src/lib/seo/config.ts` | `SITE_URL`, `absoluteUrl`, IDs de schema, config da OG image |
| `src/lib/seo/metadata.ts` | `buildMetadata()` — gera o objeto `Metadata` de qualquer página |
| `src/lib/seo/schema.ts` | Builders de JSON-LD |
| `src/components/seo/JsonLd.tsx` | Renderiza o schema com escape de `<` |
| `src/app/robots.ts` | robots.txt |
| `src/app/sitemap.ts` | sitemap.xml |
| `src/app/manifest.ts` | manifest.webmanifest |
| `src/app/llms.txt/route.ts` | Contexto estruturado para LLMs |
| `src/app/opengraph-image.tsx` | OG image 1200×630 gerada no build |

## Rotas geradas

Todas prerenderizadas como estáticas:

```
/robots.txt
/sitemap.xml
/manifest.webmanifest
/llms.txt
/opengraph-image
```

## JSON-LD

Dois grafos, para não repetir nós entre páginas:

**Layout (global)** — `Organization`, `LocalBusiness` + `HomeAndConstructionBusiness`, `WebSite`

**Página** — `WebPage`, `ItemList` de serviços

Os nós se referenciam por `@id` (`#organization`, `#localbusiness`, `#website`), que é o formato que o Google prefere para relacionar entidades.

Validar em [Rich Results Test](https://search.google.com/test/rich-results) e [Schema Markup Validator](https://validator.schema.org/).

## Adicionando uma página

1. Registre em `PAGES` no `src/data/seo.ts` — isso já a inclui no sitemap
2. Na page, exporte a metadata:

```ts
export const metadata = buildMetadata({
  path: "/nova-rota",
  title: "Título da página",
  description: "Descrição de 140 a 160 caracteres.",
});
```

3. Adicione o `WebPage` schema com `webPageSchema({ path, name, description })`

## FAQ schema — ainda não ativado

`faqSchema()` está pronto em `src/lib/seo/schema.ts` e os dados em `FAQ`, mas **não está sendo renderizado**.

Motivo: o Google exige que o conteúdo do `FAQPage` esteja visível na página. Publicar o schema sem a seção correspondente é violação de diretriz e pode gerar ação manual. Ative junto com a seção de FAQ na LP:

```tsx
import { faqSchema } from "@/lib/seo/schema";
```

## Pendências de dados

Campos em `BUSINESS` (`src/data/site.ts`) que estão nulos e derrubam a nota de SEO local enquanto não forem preenchidos:

| Campo | Impacto |
| --- | --- |
| `address.streetAddress` e `postalCode` | Endereço completo é o sinal mais forte de SEO local. Hoje só há cidade/UF |
| `geo` | Latitude/longitude ajudam em buscas "perto de mim" |
| `openingHours` | Sem isso o Google não mostra "aberto agora" |
| `mapUrl` | Link do Google Maps do local |
| `SOCIAL_PROFILES` | `sameAs` conecta o site aos perfis sociais e reforça a entidade |

Não preencher com dado inventado — schema incorreto é pior que schema ausente.

## Fora do código

O que o repositório não resolve sozinho:

1. **Google Search Console** — verificar a propriedade `df.fastsistemasconstrutivos.com.br` e enviar o sitemap
2. **Google Business Profile** — perfil da unidade de Brasília; é o que mais pesa em busca local
3. **Bing Webmaster Tools** — importar do Search Console
4. **Conteúdo real** — schema e metadata não ranqueiam página vazia. O texto local (bairros, obras, casos do DF) é o que diferencia do institucional
5. **Backlinks locais** — diretórios e parceiros do DF

## Canibalização com o institucional

O `www` já ranqueia nacionalmente para os mesmos produtos. Se a LP repetir aquele conteúdo, os dois domínios competem entre si.

Regra: conteúdo daqui é local de verdade — Brasília, RAs, entorno, obras e casos da região.
