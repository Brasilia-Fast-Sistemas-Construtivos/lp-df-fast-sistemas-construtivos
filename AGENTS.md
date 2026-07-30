<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Antes de qualquer ação

Este projeto tem skills instaladas em `.agents/skills/`. Elas não são opcionais.

Para qualquer tarefa que toque em UI, layout, estilo, copy de interface ou experiência:

1. Leia a skill aplicável em `.agents/skills/`
2. Estude o que ela indica para este caso
3. Só então escreva código, declarando de qual skill veio a decisão
4. Audite o resultado com `web-design-guidelines` antes de considerar pronto

As regras completas de qual skill usar em cada situação estão em [docs/skills.md](docs/skills.md). Leia antes de começar.

Ordem obrigatória em tarefas de UI:

```
ui-ux-pro-max → frontend-design → revisar plano → código → web-design-guidelines
```

O `search.py` da `ui-ux-pro-max` não roda nesta máquina (Python ausente/corrompido). Consulte os CSVs em `.agents/skills/ui-ux-pro-max/data/` diretamente, com Grep. Detalhes em [docs/skills.md](docs/skills.md).

# Regras do projeto

Leitura obrigatória antes de codar:

| Documento | Conteúdo |
| --- | --- |
| [docs/regras.md](docs/regras.md) | Padrões de código, estilização e arquitetura de conversão |
| [docs/briefing.md](docs/briefing.md) | Objetivo do site, posicionamento e segmentos |
| [docs/skills.md](docs/skills.md) | Como usar as skills instaladas |
| [docs/seo.md](docs/seo.md) | Arquitetura de SEO e pendências |

Não negociáveis:

- **Sem comentários no código** — nenhum, em TSX/TS/CSS
- **Sem hardcode** — cor, espaço, raio, fonte e z-index vêm de `src/styles/tokens/theme.css`
- **ID em todo botão e campo** de formulário
- **Styled aninhado** com `& > .filho`, media query na própria regra que ela altera
- **Todo botão abre o modal do formulário** — objetivo único da LP
- **O site vende a marca Fast**, não uma franqueada. Brasília é recorte de atendimento
