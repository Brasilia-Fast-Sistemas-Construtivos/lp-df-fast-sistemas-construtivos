# Skills — regras de uso

## Regra fundamental

Antes de qualquer ação que toque em UI, layout, estilo, texto de interface ou experiência, o fluxo é obrigatoriamente:

1. **Ler** a skill aplicável em `.agents/skills/`
2. **Estudar** qual abordagem ela indica para este caso
3. **Aplicar** a decisão, declarando de qual skill ela veio
4. **Revisar** o resultado contra a skill de auditoria

Escrever código de UI sem passar por esse ciclo é violação de processo, não questão de estilo. Se a skill contradiz um hábito seu, a skill vence.

## Skills instaladas

| Skill | Origem | Papel |
| --- | --- | --- |
| `frontend-design` | anthropics/skills | Direção estética e decisão criativa |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | Base de dados de padrões, cores, tipografia, UX e stack |
| `web-design-guidelines` | vercel-labs/agent-skills | Auditoria de conformidade da UI construída |

## Quando usar cada uma

### frontend-design — antes de desenhar

Use ao criar uma seção nova, definir hierarquia visual, escolher o tratamento de tipografia, decidir onde a página investe ousadia, ou escrever copy de interface.

Serve para: **decidir a direção.**

O que ela exige e vale como regra aqui:

- Duas passadas: plano de design primeiro, código depois. Não comece pelo código.
- O plano cobre color, type, layout e **signature** — o elemento pelo qual a página é lembrada.
- Antes de construir, revisar o plano: se alguma parte é o default genérico que sairia para qualquer LP de construção, refaça e diga o que mudou.
- Ousadia concentrada em um lugar só. O resto fica quieto e disciplinado.
- Copy é material de design, não decoração. Voz ativa, o botão diz o que acontece, e o nome da ação se mantém em todo o fluxo.

Atenção ao conflito com nosso projeto: a skill pede escolha livre de tipografia. **Aqui a tipografia e a paleta já estão travadas pela identidade Fast** (`src/styles/tokens/theme.css`). A liberdade criativa fica em layout, composição, ritmo, motion e no elemento signature — não em inventar cor ou fonte de marca.

### ui-ux-pro-max — durante a decisão e a construção

Use para escolher padrão de landing, ordem de seções, posicionamento de CTA, regras de UX, acessibilidade, motion e boas práticas de Next.js.

Serve para: **fundamentar a decisão em dados.**

Prioridade das categorias, do mais crítico ao menos:

1. Acessibilidade — contraste 4.5:1, alt, navegação por teclado, aria-label
2. Toque e interação — alvo mínimo 44×44px, espaçamento 8px+, feedback de carregamento
3. Performance — WebP/AVIF, lazy loading, espaço reservado (CLS < 0.1)
4. Seleção de estilo — coerente com o tipo de produto, ícones SVG (nunca emoji)
5. Layout e responsivo — mobile-first, sem scroll horizontal, sem bloquear zoom
6. Tipografia e cor — base 16px, line-height 1.5, tokens semânticos, nunca hex cru no componente
7. Animação — 150–300ms, movimento com significado, respeitar reduced-motion
8. Formulários e feedback — label visível, erro junto do campo, texto de ajuda
9. Navegação — voltar previsível, deep linking
10. Gráficos — legenda, tooltip, cor nunca como único canal de informação

Os itens 1, 2, 3, 6 e 8 são especialmente sensíveis aqui: a LP inteira existe para converter em formulário.

#### Como consultar — o script não roda nesta máquina

A skill documenta um `search.py`, mas **ele não funciona neste ambiente**. Verificado: não há Python instalado (o `python` do PATH é o alias da Microsoft Store), e a instalação encontrada em `C:\Users\Public\Python312-32` está corrompida — sem o módulo `json` da stdlib.

Consequência prática: consulte os dados **direto nos arquivos**. O conteúdo é o mesmo; só falta o ranqueamento automático.

| Precisa de | Arquivo |
| --- | --- |
| Estrutura e ordem de seções da LP | `data/landing.csv` |
| Padrão por tipo de produto | `data/products.csv` |
| Regras de decisão e anti-padrões | `data/ui-reasoning.csv` |
| Regras de UX e acessibilidade | `data/ux-guidelines.csv` |
| Estilos visuais | `data/styles.csv` |
| Paletas | `data/colors.csv` |
| Pares tipográficos | `data/typography.csv` |
| Ícones | `data/icons.csv` |
| Motion / GSAP | `data/motion.csv` |
| Next.js | `data/stacks/nextjs.csv` |
| React | `data/stacks/react.csv` |
| Performance React | `data/react-performance.csv` |
| Lista completa de UX | `references/quick-reference.md` |
| Checklist de pré-entrega | `references/pro-rules.md` |

Todos ficam sob `.agents/skills/ui-ux-pro-max/`.

Use Grep para filtrar por palavra-chave antes de ler — `styles.csv` (139 KB) e `google-fonts.csv` (728 KB) são grandes demais para leitura integral.

Se a consulta não retornar nada relevante: reformule uma vez com termos mais amplos. Se ainda assim vier vazio, diga explicitamente que a decisão veio de julgamento próprio e não da base. **Nunca apresentar decisão inventada como se tivesse saído da skill.**

Se alguém instalar Python 3 funcional, o script volta a valer:

```
python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --stack nextjs
```

### web-design-guidelines — depois de construir

Use antes de dar qualquer entrega de UI por concluída.

Serve para: **auditar o que foi construído.**

A skill busca as regras atualizadas em `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` via WebFetch, e reporta no formato `file:line`. Se a rede não estiver disponível, audite pelo `references/quick-reference.md` da `ui-ux-pro-max` e registre que a fonte foi a alternativa.

## Ordem obrigatória em tarefas de UI

```
1. ui-ux-pro-max     → padrão, estrutura e regras aplicáveis
2. frontend-design   → plano de direção (color, type, layout, signature)
3. revisão do plano  → o que aqui é default genérico? refazer
4. código            → seguindo o plano, com tokens do theme.css
5. web-design-guidelines → auditoria
6. correção          → do que a auditoria apontou
```

Pular a etapa 3 é o erro mais comum e o mais caro: é ela que separa uma LP com identidade de mais uma landing de construtora.

## Registro de decisão

Toda decisão de UI relevante entra na descrição do PR ou do commit em uma linha:

```
Hero: layout assimétrico com peso à esquerda (ui-ux-pro-max/landing.csv),
signature na sobreposição do número da obra (frontend-design).
```

Serve para o time saber que foi decisão fundamentada, e não gosto pessoal do dia.

## Limites

- Skill não sobrepõe a identidade Fast. Cor e fonte vêm de `theme.css`.
- Skill não sobrepõe as regras em [regras.md](regras.md) — sem comentário no código, ID em botão e formulário, styled aninhado, media query inline.
- Skill não sobrepõe o briefing. Se um padrão da base conflita com o objetivo de conversão, o objetivo vence.
- Em conflito entre duas skills, a ordem de precedência é: regras do projeto → briefing → `ui-ux-pro-max` (acessibilidade e performance) → `frontend-design` (estética).
