# PLANO DE DESIGN FINAL — LP Fast Sistemas Construtivos · Brasília/DF

**Destino do documento:** `docs/design.md` (o `docs/arquitetura.md` já referencia esse arquivo e ele ainda não existe).
**Direção vencedora:** LINHA SECA (2 de 3 juízes: conversão e identidade). O juiz de viabilidade votou ESTRUTURA APARENTE — todas as objeções técnicas dele foram absorvidas como correção obrigatória, não como voto perdido. As três correções mais caras que ele apontou (polilinha medida em runtime, pin de 280%, duotone com blend no elemento de LCP) estão **canceladas** neste plano.

---

## 1. TESE

Toda parede a seco começa com uma linha vermelha batida no chão antes de existir parede — esta página faz igual: a linha chega primeiro, marca onde a coisa vai, e o conteúdo se monta em cima dela; nenhuma outra empresa pode usar esse gesto porque nenhuma outra empresa bate linha antes de construir.

O que isso resolve, concretamente: o `#d01218` travado não tem onde morar honestamente numa LP de conversão — ou vira botão neon ou vira papel de parede. Dando a ele um **emprego estrutural** (nunca superfície, sempre a linha que diz onde a superfície vai), a cor deixa de ser decoração e não tem como escorregar para o visual genérico de "quase-preto + acento vibrante".

---

## 2. SISTEMA DE COR

### 2.1 Tokens que já existem e continuam (nenhum é aposentado)

| Token | Valor | Papel nesta LP |
|---|---|---|
| `--color-brand` | `#d01218` | A linha de marcação e o preenchimento do CTA. Só isso. |
| `--color-brand-contrast` | `#7d1813` | Apenas `:active` do botão preenchido. Nunca como segundo vermelho decorativo. |
| `--color-bg` / `--color-surface` | `#ffffff` | Campo das seções de **resultado** e superfície dos módulos sobre cinza. |
| `--color-gray-surface` | `#f0f0f0` | Campo das seções **técnicas**. |
| `--color-dark` | `#050505` | Pontuação. Exatamente **duas** faixas na página inteira. |
| `--color-fg` | `#353535` | Corpo de texto. |
| `--color-muted` | `#666666` | **Toda a camada de texto técnico** (Manrope caps, cotas, unidades sobre claro, rótulos). |
| `--color-muted-white` | `#c2c2c2` | Texto secundário e unidades numéricas **sobre faixa escura**. |
| `--color-border` | `#e5e5e5` | Malha de módulo, bordas de card, separadores. |

### 2.2 Tokens novos — teto de 2, e é 2

```css
--color-galvanized: #8d9499;
--color-chalk: #e0b4b6;
```

**`--color-galvanized`** — aço galvanizado. É o único material do produto que não é branco nem vermelho e o set não tem nenhum tom metálico. **Uso exclusivo em traço, nunca em texto:** fios de cota, ticks, terminadores de seta, a barra vertical do montante nos cards, o furo oval punçoado, separadores do marquee.

> **Correção que nenhum juiz pegou e que é obrigatória:** a direção original punha *todo* rótulo técnico (`--text-xs`) em galvanizado. `#8d9499` sobre branco dá **3,07:1** e sobre `#f0f0f0` dá **2,69:1** — reprova em AA para texto pequeno. A separação stroke/texto (herdada do `zinc` / `zinc-ink` da ESTRUTURA APARENTE) é feita aqui **sem gastar um token**: o traço é galvanizado, o texto técnico é `--color-muted` (**5,74:1** sobre branco, **5,03:1** sobre `#f0f0f0`). Se na build os dois cinzas brigarem visualmente, a saída é subir o texto para `--color-fg`, nunca criar um terceiro token.

**`--color-chalk`** — pó de giz, o resíduo que a linha deixa na laje. Uso exclusivo: o bloom de 300ms no instante do snap. O valor original proposto (`#f2dcdd`) dá **1,15:1** sobre o campo cinza — literalmente invisível. `#e0b4b6` dá **1,62:1** sobre `#f0f0f0` e **1,85:1** sobre `#ffffff`: perceptível como tinta transitória sem virar mancha.

### 2.3 Campos por seção (a inversão de solo é local, não global)

O campo cinza uniforme na página inteira lê como wireframe e mata o desejo do público residencial de alto padrão. A inversão sobrevive como **sistema semântico**, não como fundo único:

| Campo | Seções |
|---|---|
| `--color-gray-surface` | Hero, Quebra-quebra × Montagem, Sistemas, Dentro da parede, Como trabalhamos |
| `--color-bg` | Obras no DF, Depoimentos, FAQ, Footer |
| `--color-dark` | Faixa de credibilidade (1 de 2), CTA final (2 de 2) |

A regra é legível sem texto: **cinza = como fazemos, branco = o que você recebe, escuro = o que é fato.**

### 2.4 Onde o vermelho aparece — e a lista é fechada

1. **Preenchimento do CTA primário.** É o único fill vermelho da página.
2. **A linha de marcação**, nos 5 pontos de snap, e o sublinhado de 3px sob **uma** palavra por título.
3. **A unidade que segue todo número** (`m²`, `mm`, `dB`, `dias`), em Manrope caps `--text-xs` — **e só sobre campo claro**.
4. **`:focus-visible`** — `outline: 2px solid var(--color-brand); outline-offset: 3px`.

### 2.5 Onde o vermelho NÃO aparece

- Nenhum fundo de seção, nenhuma faixa, nenhuma superfície.
- Zero glow, gradiente, `box-shadow` colorida, borda luminosa.
- **Nenhum texto vermelho sobre `#050505`.** `#d01218` contra `#050505` dá **3,66:1** — reprova. Nas duas faixas escuras, unidade e destaque vão em `--color-muted-white`; o anel de foco vira `--color-bg`. `--color-brand-contrast` sobre escuro é pior ainda: proibido.
- Fora dos ticks e fios de cota (galvanizado), fora dos separadores do marquee (galvanizado), fora do numeral (só a unidade é vermelha, o numeral é `--color-dark`).
- Nenhum ícone vermelho, nenhuma borda de card vermelha.
- **Teto de área: 6% de qualquer viewport.** E a regra que fecha a conta: **nunca duas peças vermelhas disputando a mesma dobra.** Na faixa de credibilidade as unidades são vermelhas e não existe CTA; na faixa de CTA final o botão é vermelho e não existe unidade vermelha.

### 2.6 Raios — os valores reais, que as três direções citaram errado

`--radius-sm: 6px` · `--radius-md: 10px` · `--radius-lg: 14px` · `--radius-all: 999px`

- `--radius-md`: foto, card, módulo branco, campo de imagem.
- `--radius-lg`: superfície do modal, barra de pré-qualificação.
- `--radius-all`: botão, campo de formulário, chip, controle.
- `--radius-sm`: etiqueta/tag pequena.
- **Raio zero é proibido em superfície.** É a guarda formal contra a página virar "prancha técnica de jornal".

### 2.7 Teste de aprovação de tela (critério de reprovação, não recomendação)

Screenshot em escala de cinza antes de aprovar qualquer tela. Se a composição desmonta sem o vermelho, o layout está apoiado no acento e a tela é refeita.

---

## 3. SISTEMA TIPOGRÁFICO

### 3.1 Papel de cada face

| Fonte | Token | Papel | Pesos |
|---|---|---|---|
| **Urbanist** | `--font-display` | Só título e numeral grande | 500 padrão · 600 na palavra marcada. **Nunca 700/800** — a densidade Fast vem do tracking, não do peso. |
| **DM Sans** | `--font-body` | Corpo, botão, rótulo de campo, resposta de FAQ, microcopy | 400 / 500 |
| **Manrope** | `--font-alt` | Camada de marcação técnica | 500 / 600 |

### 3.2 Escala — zero token de tipo novo

| Uso | Token | Face / peso | Tracking | Line-height |
|---|---|---|---|---|
| H1 do hero | `--text-4xl` (máx 72px) | Urbanist 500 | `-0.03em` | `--leading-tight` |
| H2 de seção | `--text-3xl` | Urbanist 500 | `-0.025em` | 1.05 |
| Numeral de estatística | `--text-2xl` | Urbanist 500, `tabular-nums` | `-0.02em` | 1 |
| Título de card | `--text-2xl` | Urbanist 500 | `-0.015em` | `--leading-tight` |
| Título de etapa / pergunta FAQ | `--text-xl` | Urbanist 500 | `-0.01em` | `--leading-snug` |
| Parágrafo de abertura | `--text-lg` | DM Sans 400 | 0 | `--leading-normal` |
| Corpo | `--text-md` | DM Sans 400 | 0 | `--leading-relaxed` |
| Botão / rótulo de campo | `--text-sm` | DM Sans 500 | 0 | 1 |
| Corpo de card / microcopy | `--text-sm` | DM Sans 400, `--color-muted` | 0 | `--leading-normal` |
| **Toda a camada Manrope** | `--text-xs` | Manrope 600, **uppercase** | `+0.18em` | 1.2 |

`font-variant-numeric: tabular-nums` é **regra global** em todo numeral da página, não só nos contadores. Motivo concreto: durante o scrub o dígito troca, e figura proporcional causa jitter horizontal.

O H1 no piso mobile fica em 44px (`--text-4xl` clamp mínimo `2.75rem`) com peso 500 — pesado o bastante para ler sob luz de rua, que é onde a maior parte do tráfego do DF vai cair. Sem quebras hard-set com `<br>`: três `<span>` de linha, e o conjunto de quebras troca por media query.

### 3.3 Os três tratamentos que carregam a personalidade

**(a) A PALAVRA MARCADA.** Cada H1/H2 tem exatamente **uma** palavra em Urbanist 600 com um traço vermelho de `--line-w-strong` (3px) sob a base — e esse traço **é o mesmo elemento** da linha de marcação que bate na página. O sublinhado do título e o snap são a mesma peça fazendo dois trabalhos. Uma palavra por título, nunca duas.

**(b) NÚMERO + UNIDADE EM DUAS FACES.** Todo número aparece em Urbanist 500 `tabular-nums` na cor `--color-dark`, com a unidade colada em Manrope 600 caps `--text-xs` em `--color-brand` (ou `--color-muted-white` sobre escuro). `148` grande e escuro, `m²` pequeno e vermelho. É o único lugar da página onde o vermelho toca tipografia, e é onde ele significa mais: o dado é o argumento.

**(c) ETIQUETA DE PLACA — nenhum eyebrow decorativo na página.** Todo rótulo Manrope é o par `RÓTULO · VALOR` com valor verificável, como o carimbo impresso no verso da placa:

```
MONTANTE 48 · EIXO 600 · NBR 15758
PLACA ST 12,5 · BORDA REBAIXADA
OBRAS ENTREGUES · DISTRITO FEDERAL · 26
```

Nunca `NOSSOS SERVIÇOS`, nunca `SOBRE NÓS`. Esse enxerto substitui o "título cotado" original (fio + ticks + vão) que estava previsto acima de **cada** H2 — replicado 10 vezes ele vira maneirismo e adiciona uma camada de leitura entre o olho e o título. O dispositivo de cota com fio e ticks fica restrito a **três seções técnicas**: Sistemas, Dentro da parede, Como trabalhamos.

**Proibido em qualquer lugar:** serif, itálico decorativo, mistura de família dentro da mesma frase, marcador ordinal `01/02/03` (a única sequência numerada é Como trabalhamos, e lá o marcador é a **duração real** — `DIA 1 · 4H` — não o índice).

---

## 4. SIGNATURE — O SNAP DA LINHA

**Uma ideia forte, e é só uma.** A seção "Dentro da parede" deixa de ser uma segunda assinatura e vira seção comum (ver §5.6): duas assinaturas competindo era o defeito nomeado por dois dos três juízes.

### 4.1 O gesto

O montador estica a linha, puxa e solta. Ela bate na laje e deixa um traço vermelho perfeitamente reto dizendo onde a parede vai. Na página, **a linha chega antes do conteúdo** — não é fade, é snap.

### 4.2 DOM

```html
<span class="snap" aria-hidden="true" data-snap>
  <i class="snap__stroke"></i>
  <i class="snap__dust"></i>
</span>
```

```
.snap            position: relative; display: block; height: var(--line-w-strong);
.snap__stroke    position: absolute; inset: 0; background: var(--color-brand);
                 transform: scaleX(0); transform-origin: left center;
.snap__dust      position: absolute; inset: -8px -4px; opacity: 0;
                 border-radius: var(--radius-all);
                 background: radial-gradient(closest-side, var(--color-chalk), transparent 70%);
```

### 4.3 Timeline (uma por instância, `once: true`)

| t | Alvo | De → Para | Duração | Ease |
|---|---|---|---|---|
| 0 | `.snap__stroke` | `scaleX 0 → 1` | `--dur-snap` (180ms) | `--ease-snap` |
| 0.16s | `.snap__stroke` | `scaleY 1 → 1.5 → 1` (yoyo, repeat 1) | 60ms cada | `none` |
| 0.16s | `.snap__dust` | `opacity 0 → 0.55 → 0` + `scaleX .6 → 1.05` | `--dur-settle` (300ms) | `power1.out` |
| 0.30s | módulos filhos | `yPercent 4 → 0`, `opacity 0 → 1`, stagger 0.04 | `--dur-lay` (420ms) | `power2.out` |

**Correção obrigatória sobre a proposta original:** o `elastic.out(1, 0.25)` com deslocamento de 1,5px em Y está abaixo do limiar de percepção sobre um traço de 2-3px — a "corda batendo em concreto" existiria no documento e não na tela. E overshoot contradiz frontalmente uma empresa que vende precisão milimétrica (a própria direção recusava `back.out` no grid pelo mesmo motivo). **O impacto se lê pelo engrossamento de um frame + o pó, não pelo deslocamento.** Zero overshoot na página inteira.

### 4.4 Onde o snap aparece — exatamente 5 vezes

Reduzido de 13 (o que vira tique) para 5:

1. Sublinhado da palavra marcada no H1 — no load.
2. Borda superior da barra de pré-qualificação — no load, logo depois do H1.
3. Abertura de **Quebra-quebra × Montagem** — no enter.
4. Abertura de **Obras no DF** — no enter.
5. **CTA final** — no enter, e aqui está o pagamento: a linha bate e **o que se monta em cima dela é o formulário**. Depois de quatro snaps o usuário já aprendeu que quando a linha bate algo vai ser levantado; o único lugar da página onde a coisa levantada é o lead.

### 4.5 O que foi CANCELADO da proposta original

**O eixo / polilinha vertical contínua está morto.** Uma polilinha cujo `d` depende do Y medido de todos os limites de seção precisa: medir depois do mount, reconstruir no `resize`, reconstruir depois de `document.fonts.ready`, reconstruir depois do load de cada imagem, **e reconstruir toda vez que o acordeão da FAQ abre ou fecha** — cada reconstrução é um read de layout de página inteira, e errar a invalidação faz a linha descolar visivelmente justamente porque o ponto dela é estar registrada ao layout. Além disso, os juízes de identidade e conversão marcaram que ela lia como barra de progresso de agência, que é o clichê que a própria direção nomeia.

A assinatura sobrevive inteira sem ela, mais barata e mais robusta.

### 4.6 Enxerto que substitui o eixo — "FOTO VEM COTADA" (de O RISCO)

Toda imagem do site carrega, **estaticamente, sem JS**, duas ou três cotas impressas em cima: espessura da parede acabada, módulo da placa, um dado de desempenho. Fio de 1px galvanizado com ticks nas pontas e o valor em Manrope caps `--color-muted`.

Por que este é o melhor enxerto do conjunto: é o único ativo dos três documentos que **sobrevive fora do scroll**. Funciona no Instagram, no PDF de orçamento, no WhatsApp. Responde em silêncio às três objeções reais (aguenta peso, abafa som, é frágil) já na primeira dobra, antes de qualquer FAQ. E absorve metade do trabalho da seção "Dentro da parede" — é o que autoriza matar o pin.

**Condição de execução:** as cotas ficam num overlay SVG com `viewBox` próprio posicionado por âncoras percentuais **em regiões neutras da foto** (canto, parede lisa), nunca travadas em feição geométrica específica. Foi assim que O RISCO quebrou: elevação registrada feição-por-feição não sobrevive ao recrop de `object-fit: cover` em outra largura.

### 4.7 Enxerto — O FURO OVAL PUNÇOADO (de ESTRUTURA APARENTE)

O micro-detalhe menos copiável dos três documentos: grid de linha fina existe em milhares de sites, um rasgo oval punçoado a passo fixo dentro de uma linha vertical só existe dentro de uma parede.

Aplicação restrita, para não virar papel de parede: na **barra vertical de 2px** que corre na borda esquerda de cada card de sistema e no rótulo vertical das obras. `background-image` em data-URI, repeat-y, passo fixo. **Desenhado como rasgo — traço externo galvanizado + fio interno de sombra dentro do C.** Elipse de traço único lê como tracejado decorativo e a tese desaba.

### 4.8 Fallback

`prefers-reduced-motion`: a linha nasce desenhada (`scaleX: 1`), o pó não existe, os módulos nascem visíveis. As cotas das fotos já são estáticas. A página perde o gesto e não perde uma informação sequer.

---

## 5. ESTRUTURA DA LP

9 seções de conteúdo + header + footer. (A proposta original tinha 14 — cada seção é custo de rolagem numa página de objetivo único.)

**Regra de distribuição de CTA:** em nenhum ponto do scroll o usuário está a mais de uma seção de um botão visível. Obrigatório na saída de Dentro da parede e logo após Obras no DF — os dois picos de convicção.

**Um verbo só, do começo ao fim:** botão `Pedir orçamento` → modal `Pedir orçamento` → confirmação `Orçamento solicitado`. Nenhum "Saiba mais", "Enviar" ou "Clique aqui".

### 5.0 HEADER (persistente)
Logo 180px (140px mobile), âncoras internas, CTA sempre visível. Encolhe de `--header-height` (80px) para 56px por classe, nunca some. Sem hambúrguer no desktop.
`id="header-btn-orcamento"`

### 5.1 HERO
**Job:** dizer em 3 segundos o que a Fast faz, que é a marca nacional e que atende o DF, com promessa **e prazo** na primeira dobra.
Campo cinza. H1 com a palavra marcada, etiqueta de placa acima, foto de **ambiente entregue em cor plena** (não processo em duotone — vender o canteiro na dobra em que a pessoa quer ver a sala pronta é o erro que dois dos três juízes marcaram), microcopy de segurança colada ao botão.

Estrutura de copy travada (H1 = promessa + prazo; subtítulo = dor + diferencial):
> **H1:** Parede pronta, pintada e entregue em `N` dias.
> **Sub:** Sem quebra-quebra, sem entulho, sem obra parada. A Fast vende o material e executa — um contrato, um responsável.

`N` é um **gate de conteúdo** (§8). Se a operação não confirmar, o H1 cai para a versão sem número: *"Parede pronta, pintada e entregue. Sem quebra-quebra."* — nunca se inventa o prazo.

**CTA único.** O segundo botão ("Ver as etapas") está cortado: divide o clique na dobra mais cara e viola a regra do projeto de que todo botão abre o mesmo modal.
`id="hero-btn-orcamento"`

### 5.2 BARRA DE PRÉ-QUALIFICAÇÃO
**Job:** capturar a intenção no ponto de maior atenção. Atravessa a costura entre o hero e a faixa escura — é o **único** elemento autorizado a romper a grade.
Três campos que **não enviam nada**: abrem o modal já preenchidos, transformando o formulário em continuação de algo começado em vez de interrupção.

`id="hero-form-tipo-obra"` (select) · `id="hero-form-metragem"` (select de faixas: até 30 m² / 30–80 / 80–200 / +200 m²) · `id="hero-form-regiao"` (select) · `id="hero-btn-prequalificacao"`

> Metragem como campo livre é a maior fricção evitável do projeto: cliente residencial não sabe a metragem e exigir cálculo no ponto de maior atenção trava sem informar nada ao comercial. **Select de faixas, sempre.**

**Cuidado de execução:** metade do elemento fica sobre campo claro e metade sobre `#050505`. Cor de rótulo, placeholder e anel de foco trocam no meio do próprio componente — resolver com `data-field-on="light|dark"` nos wrappers, não com `mix-blend-mode`.

### 5.3 FAIXA DE CREDIBILIDADE (escura, 1 de 2)
**Job:** matar em uma linha a leitura de "prestador local anônimo". Números da marca nacional em Urbanist com unidade em `--color-muted-white`. **Sem CTA nesta faixa** (regra de não-competição vermelha).
`+20 ANOS · +45 UNIDADES NO BRASIL · 1,5 Mi m²/MÊS · +20.000 PEDIDOS/ANO · ABF`

### 5.4 QUEBRA-QUEBRA × MONTAGEM
**Job:** o melhor bloco de qualquer uma das três propostas. Nomeia a dor na língua do cliente antes de vender. Duas colunas em confronto: uma cinza e suja (duotone frio — é aqui que o duotone mora, com significado), uma branca e limpa em cor.
Lista do que **não** acontece: sem entulho, sem água, sem tempo de cura, sem ficar três semanas sem o cômodo.
Fecha com o bloco **UM RESPONSÁVEL** em três itens (material + mão de obra + garantia, um contrato). Absorvido aqui em vez de virar seção própria: o argumento é adjacente e não paga uma rolagem sozinho.
`id="comparativo-btn-orcamento"`

### 5.5 SISTEMAS — 6 CARDS
**Job:** cobrir o escopo com um recado por card, e esse recado é sempre um **fato mensurável**, nunca um adjetivo.
Drywall · Steel frame · Forro · Divisória · Piso vinílico · Revestimento. Cada card abre pelo **problema** que resolve, não pelo nome da disciplina, e fecha com uma etiqueta de placa. Barra vertical galvanizada com furo oval na borda esquerda. **Sem ícone de linha** — ícone genérico é marcador de site barato tanto quanto foto de banco.

> **A regra "última peça cortada pela borda" NÃO se aplica aqui.** Se o 6º card é piso vinílico e alguém chegou buscando piso vinílico, a assinatura de layout está comendo uma intenção de compra. O corte fica **exclusivo do mosaico de obras**, onde não esconde escopo.

`id="sistemas-btn-drywall"`, `sistemas-btn-steel-frame`, `sistemas-btn-forro`, `sistemas-btn-divisoria`, `sistemas-btn-piso-vinilico`, `sistemas-btn-revestimento` · `id="sistemas-btn-orcamento"`

### 5.6 DENTRO DA PAREDE
**Job:** mostrar o que o cliente nunca viu. Figura SVG em **3 momentos** (estrutura → isolamento → fechamento), animada por scrub **sem pin**, terminando na superfície fechada e pintada — não numa camada empilhada. É subtrativa: a axonométrica explodida que empilha camadas é o movimento previsível do setor; terminar no produto entregue é o oposto e é o que a empresa realmente vende.
`id="parede-btn-orcamento"` (obrigatório na saída da seção)

### 5.7 COMO TRABALHAMOS — 5 ETAPAS
**Job:** matar o medo nº 1 de quem contrata obra: ficar refém de uma obra que não acaba.
Visita técnica → projeto e orçamento fechado → montagem → acabamento → entrega com garantia. Marcador é a **duração real** (`DIA 1 · 4H`), não o ordinal.

### 5.8 OBRAS NO DF + PROVA SOCIAL (fundidas)
**Job:** prova local específica e verificável, colada na prova humana. Campo branco, fotos em cor plena, cada card com tipo de obra + m² + prazo + sistema + região. Mosaico modular assimétrico com a última peça cortada pela borda (affordance de arraste sem inventar seta).
Abaixo, no mesmo bloco: **três depoimentos nomeados** (nome completo, tipo de obra, região do DF) estáticos, sem carrossel, + faixa de logos corporativos reais. Depoimento anônimo não entra.
`id="obras-btn-orcamento"`

### 5.9 FAQ — OBJEÇÕES REAIS
**Job:** derrubar a última barreira. Escrito como a pessoa pergunta:
A parede aguenta TV e armário? · Vai sujar minha casa? · Abafa o som do vizinho? · **Sai mais caro que alvenaria?** · Qual a garantia? · Quanto tempo leva?
Resposta direta na primeira linha, detalhe na segunda. Acordeão animado por `height: auto` do GSAP em `--dur-normal`.
`id="faq-btn-orcamento"`

### 5.10 ONDE ATENDEMOS (faixa, não seção)
Marquee de velocidade variável com as regiões, separador em **fio vertical galvanizado** (não vermelho, não asterisco). Abaixo, a lista em texto indexável — SEO local de verdade, que é o que impede a canibalização do institucional.

### 5.11 CTA FINAL (escura, 2 de 2)
**Job:** fechar. A linha bate e o bloco se monta em cima dela. Botão vermelho sólido, microcopy de segurança e selo ABF ao lado do botão — não no rodapé.
`id="cta-final-btn-orcamento"`

### 5.12 FOOTER
Contato **jamais escondido** (erro nº 1 do setor): telefone, e-mail, WhatsApp, área de atendimento, link para o institucional nacional, CNPJ, políticas. Sem newsletter, sem bloco de franquia.
`id="footer-btn-whatsapp"` · `id="footer-btn-orcamento"`

### 5.13 PERSISTENTES
- **Modal único global**, montado uma vez no shell via `FormModalProvider` (regras.md manda contexto, não evento customizado). Foco preso, `Esc`, retorno de foco ao gatilho, body travado, `origin` = id do botão indo junto no envio.
  Campos travados: `contato-form-nome` · `contato-form-whatsapp` · `contato-form-tipo-obra` · `contato-form-regiao` · `contato-form-mensagem` (opcional) · `contato-btn-enviar` · `contato-btn-fechar`.
  **Quatro campos obrigatórios, e os três da barra chegam preenchidos — sobra um.** Rótulo visível sempre (placeholder-only reprova). Erro abaixo do campo, nunca lista no topo. Erro e sucesso com ícone + texto, nunca só cor. Sucesso diz o próximo passo real: *"Orçamento solicitado. Nossa equipe em Brasília responde no próximo dia útil."* — e isso só entra se a operação cumprir.
- **WhatsApp flutuante** 56px, `--z-sticky`, mensagem pré-preenchida **carregando a seção de origem do clique** e a atribuição UTM. Em serviço de obra no DF ele provavelmente captura mais contato que o modal; sem o parâmetro de origem a página converte e ninguém consegue provar de onde veio.
  `id="flutuante-btn-whatsapp"`

---

## 6. MOTION

### 6.1 Regras de orçamento

- **GSAP core + ScrollTrigger + SplitText.** `gsap@3.15.0` está instalado com **todos** os plugins (`SplitText.js`, `DrawSVGPlugin.js`, `Flip.js`, `MorphSVGPlugin.js`, `ScrollSmoother.js`) — desde a aquisição pela Webflow o que era Club virou público. As três direções trabalharam com a premissa falsa de que SplitText é pago e escreveram mascaramento por linha à mão. **Use SplitText (`type: 'lines'`, ~3KB gz) e apague o wrapper manual.**
- **Zero framer-motion.** Zero Flip.
- **Lenis fica**, porque `docs/arquitetura.md` prescreve o `SmoothScroll` e a dependência já está paga. Portado com os dois defeitos corrigidos: remover o `gsap.ticker.add` no cleanup e trocar a flag `scrollTriggerConnected` por ref (senão o rAF de fallback dirige o Lenis em paralelo no boot). Desliga em `prefers-reduced-motion` e em `pointer: coarse`. **Critério de corte:** se INP ou CLS piorarem na medição, o Lenis sai — nada neste plano depende dele.
- **Tudo dentro de `gsap.matchMedia()`.** Guarda de `prefers-reduced-motion` **antes** de qualquer `ScrollTrigger.create()`.
- Anima só `transform`, `opacity` e `clip-path` sobre elemento pequeno. Nunca `width/height/top/left`.
- **Teto de 2 elementos animados por dobra.**
- `ScrollTrigger.refresh()` após `document.fonts.ready` e após o `onLoad` das imagens acima da dobra. `width`/`height` declarados em toda imagem.
- **Orçamento de tweens acoplados ao scroll na página inteira: 3.** Contados e nomeados abaixo. Tudo mais é one-shot com `once: true`.

### 6.2 Doutrina de LCP (enxerto de O RISCO — o item de maior valor técnico dos três documentos)

**A imagem do hero nunca recebe filtro, nunca recebe parallax, nunca recebe animação de entrada.** `loading="eager"`, `fetchPriority="high"`.

O duotone das fotos de processo é aplicado **no WebP exportado, no build** — nunca por `filter` CSS e jamais por `mix-blend-mode`, que força stacking context próprio e derruba caminhos rápidos do compositor. O `yPercent: -6` de parallax que a proposta original punha na foto do hero está **cortado**: parallax + blend no maior elemento pintado da página é a pior configuração possível de LCP.

### 6.3 FOUC de movimento — o jeito mais provável de isso quebrar em produção

A contradição que as três direções carregavam: *"nenhum conteúdo nasce com opacity 0 no CSS, é o `gsap.from` que esconde"* **e** *"GSAP via `next/dynamic` com `ssr: false`"*. As duas regras são incompatíveis — o chunk dinâmico chega depois do primeiro paint, o usuário vê o hero renderizado, o `from()` joga para escondido e remonta. Em 4G com Android mediano isso é um flash visível de 200–600ms.

Resolução em duas partes:

1. **No hero, nada com texto anima de escondido.** H1, subtítulo, CTA e microcopy nascem pintados e ficam. Quem anima é só o snap e o sublinhado — elementos sem conteúdo. FOUC morto por construção, e o crawler lê a dobra inteira.
2. **Abaixo da dobra**, o estado inicial escondido vem de CSS condicionado a `html[data-motion="on"]`, atributo carimbado por um script inline **síncrono** no `<head>`. Sem JS, sem atributo, sem estado escondido: a página lê completa.

### 6.4 Tokens de movimento novos

```css
--ease-snap:      cubic-bezier(0.16, 1, 0.3, 1);
--dur-snap:       180ms;
--dur-settle:     300ms;
--dur-lay:        420ms;
--line-w:         2px;
--line-w-strong:  3px;
```

Reaproveitados: `--ease-standard`, `--dur-fast`, `--dur-normal`, `--dur-slow`.

### 6.5 Plano seção a seção

| # | Seção | O que anima | Gatilho | Duração | Easing |
|---|---|---|---|---|---|
| 1 | Hero | Linhas do H1 via SplitText (`lines`), `yPercent 100 → 0` dentro de wrapper `overflow:hidden` | load, +120ms | 500ms, stagger 0.06 | `power2.out` |
| 2 | Hero | **Snap 1** — sublinhado da palavra marcada | load, após última linha | ver §4.3 | `--ease-snap` |
| 3 | Hero | Foto | — | **nada** | — |
| 4 | Barra pré-qual | **Snap 2** + assentamento dos 4 campos | load | 400ms | `power2.out` |
| 5 | Credibilidade | **Contador único** sobre `{v:0}`, todos os números escritos no mesmo `onUpdate` | **scrub** `top 85%` → `top 45%` | scrub | — |
| 6 | Comparativo | **Snap 3** + colunas | enter `top 82%`, `once: true` | 420ms | `power2.out` |
| 7 | Sistemas | 6 cards `y 16→0`, `opacity 0→1`, `stagger { each: 0.04, grid: 'auto' }` | enter `top 85%`, **`once: true`** | 400ms | `power2.out` — **sem `back.out`**, overshoot contradiz precisão milimétrica |
| 8 | Dentro da parede | 3 momentos do SVG por `clip-path: inset()` de baixo para cima + rótulo entrando `x -8→0` | **scrub 0.6, SEM PIN** | scrub | — |
| 9 | Como trabalhamos | 5 etapas, stagger | enter, `once: true` | 350ms, stagger 0.04 | `power2.out` |
| 10 | Obras | **Snap 4** + mosaico | enter, `once: true` | 420ms | `power2.out` |
| 11 | Marquee cobertura | `timeScale` modulado por `ScrollTrigger.getVelocity()` clampado (1 → 2.6), retorno com `gsap.to(tl,{timeScale:1,duration:0.6})` | **scroll velocity** | loop 40s base | `none` |
| 12 | CTA final | **Snap 5** + montagem do bloco | enter, `once: true` | 420ms | `power2.out` |
| — | Cards (hover) | `gsap.quickTo(el,'y')` para -3px, tween reverso **sempre** anexado no `pointerleave` | `@media (hover:hover) and (pointer:fine)` | 180ms | `power2.out` |
| — | Botões | Preenchimento entra pelo lado de onde o cursor veio: `--fill-x` gravado no `pointerenter`, `::before` faz `scaleX` com `transform-origin` variável. `:active scale .985` | CSS puro, zero JS por frame | 160ms / 120ms | `--ease-standard` |
| — | Modal | Abertura: backdrop `opacity 0→1` 160ms; painel `scale .96→1`, `y 12→0`, `opacity 0→1` 240ms, `transform-origin` calculado do `getBoundingClientRect()` do botão (**uma leitura, antes de qualquer escrita**). Fechamento **150ms** (~62% da entrada) | click | 240 / 150ms | `power2.out` / `power1.in` |
| — | Submit | Skeleton `repeat: -1` — **o único loop infinito permitido na página**, morto com `.kill()` quando a resposta chega. Botão `disabled` durante o envio | submit | 1.4s | `sine.inOut` |
| — | WhatsApp | **Zero anel de pulso.** Só o lift de -6px acima de 100px de scroll, listener em `requestAnimationFrame` com `{ passive: true }` | scroll | 200ms | `--ease-standard` |

**Tweens acoplados ao scroll, contados: 3** — contador de credibilidade, Dentro da parede, velocidade do marquee. Nada mais.

**`will-change: transform`** posto no `onEnter` e **removido no `onLeave`** de cada trigger que o usa. Nunca espalhado no CSS.

**O pin está morto.** A proposta original sequestrava `+=280%` (≈3,8 viewports) na seção 7 de 14, sem CTA durante o pin e com metade da página pela frente — os três juízes marcaram como o maior ponto de abandono desenhado. O fallback mobile que a própria direção desenhou (stepper vertical) é bom o bastante para ser a **única** versão, e some o item mais caro de scroll num plano free.

### 6.6 `prefers-reduced-motion`

**Desligam:** todos os snaps (linha nasce com `scaleX: 1`, sem pó), o scrub de Dentro da parede (SVG completo e estático, legendado), o contador (números escritos), o marquee (lista estática), o Lenis, todo deslocamento em `y`.

**Permanecem:** fades de opacidade em 200ms, todos os estados de hover/press (feedback funcional, não decoração), as cotas das fotos (que já são estáticas), e a animação de abertura/fechamento do modal reduzida a fade de 160ms.

Nada fica preso em `opacity: 0`. Nenhuma animação bloqueia clique — o CTA é clicável no meio de qualquer reveal, e toda animação é interrompível.

---

## 7. COMPONENTES

### 7.1 Estrutura de pastas

```
src/components/
  layout/
    Header.tsx
    Footer.tsx
    SmoothScroll.tsx          ← institucional
    WhatsAppFloating.tsx      ← institucional (casca)
  ui/
    Button.tsx                ← institucional (mecânica)
    Field.tsx                 ← institucional (geometria do Input)
    SelectField.tsx
    Cota.tsx
    Etiqueta.tsx
    SnapLine.tsx
    SectionHeader.tsx
    PhotoCotada.tsx
    Marquee.tsx
    Accordion.tsx
  forms/
    FormModal.tsx             ← institucional (casca + fluxo)
    FormModalProvider.tsx
    PreQualificationBar.tsx
    FormFields.tsx
    SubmitFeedback.tsx
  sections/
    HeroSection.tsx
    CredibilidadeSection.tsx
    ComparativoSection.tsx
    SistemasSection.tsx
    DentroDaParedeSection.tsx
    ComoTrabalhamosSection.tsx
    ObrasSection.tsx
    FaqSection.tsx
    CoberturaBand.tsx
    CtaFinalSection.tsx
  motion/
    GsapRoot.tsx
    useSnap.ts
    useReveal.ts
    useScrubCounter.ts
  utm/UtmPersist.tsx          ← institucional
  cookies/CookieConsentPopup.tsx ← institucional
  providers/EmotionProvider.tsx  (já existe)
  seo/JsonLd.tsx                 (já existe)
```

### 7.2 Vem do institucional

| Origem (`C:\app\i-fast-sistemas-construtivos`) | Destino | Ajuste obrigatório |
|---|---|---|
| `src/components/layout/SmoothScroll.tsx` | `layout/SmoothScroll.tsx` | Remover comentários; **remover o ticker no cleanup**; trocar a flag async por ref |
| `src/components/ui/Button.tsx` | `ui/Button.tsx` | Manter a mecânica de `::before` com `--btn-fill` (inversão por opacity sob `isolation: isolate`). Trocar `padding: 12px 18px` e `font-size: 18px` por tokens. **Adicionar `id` obrigatório e `origin` na assinatura.** `:focus-visible` próprio em `--color-brand` |
| `src/components/forms/Input.tsx` | `ui/Field.tsx` | Corrigir `width: fit-content` na origem; trocar `--color-background` (não existe) por `--color-bg`; adicionar estado de foco, estado de erro e `id` obrigatório |
| `src/components/forms/ContactConversionFormPopup.tsx` | `forms/FormModal.tsx` | Trazer a **casca visual** (`<dialog>` nativo, `::backdrop`, geometria) e o **fluxo de steps**. Descartar framer-motion/AnimatePresence — as animações viram GSAP. Estado por `FormModalProvider`, não por evento customizado (regras.md) |
| `src/components/layout/WhatsAppButton.tsx` | `layout/WhatsAppFloating.tsx` | Trazer geometria, posição, verde `#128C3E` e o SVG inline. **Apagar as seis animações infinitas.** Manter só o lift de scroll |
| `src/app/(site)/_components/CardServices.tsx` | (só CSS) | Aproveitar o badge circular de 64px com anel e a proporção foto+bloco. **Refazer o markup:** o original é `<div role="article" onClick>` — clicável, não focável, papel ARIA errado |
| `src/utils/attribution.ts` | `src/lib/attribution.ts` | Remover comentários. Manter last-paid-click de 90 dias e todos os click IDs |
| `src/components/utm/UtmPersist.tsx` | `utm/UtmPersist.tsx` | Trocar a dependência do popup do institucional pelo `FormModalProvider` daqui |
| `src/components/cookies/CookieConsentPopup.tsx` | `cookies/` | Manter a chave `cookie_consent_choice` (o módulo de atribuição depende dela). Adaptar visual |

### 7.3 Nasce aqui

- **`SnapLine`** — a assinatura. Recebe `variant="underline" | "seam"`, dispara via `useSnap()`.
- **`Cota`** — `<Cota valor="148" unidade="m²" />`. Numeral Urbanist `tabular-nums` + unidade Manrope caps vermelha (ou `--color-muted-white` quando `onDark`). Um componente para estatística, spec de card e metragem de obra.
- **`Etiqueta`** — o par `RÓTULO · VALOR`. Aceita array de pares. Substitui todo eyebrow da página.
- **`PhotoCotada`** — `next/image` + overlay SVG de cotas com âncoras percentuais. Recebe `cotas: { x, y, valor, unidade, align }[]`.
- **`SelectField`** — os selects da barra e do modal (o institucional não tem select).
- **`PreQualificationBar`** — os 3 campos que não enviam; escreve no `FormModalProvider` e abre o modal.
- **`GsapRoot`** — client component fino: `registerPlugin(ScrollTrigger, SplitText)` uma vez, `matchMedia` global, `refresh()` após `fonts.ready`. **Não** é `dynamic({ssr:false})` para a timeline do hero (ver §6.3).
- **`Marquee`**, **`Accordion`**, **`SectionHeader`**.

### 7.4 O que NÃO portar

`PageTransition.tsx` (overlay de GIF de 1,9s antes do LCP — nunca), o hook `useSectionMotion()` do framer-motion, Sidebar, SearchBar, widget de acessibilidade, ExitIntentPopup, RecentArticles, newsletter, o `data-a11y-theme="dark"` que repinta `--color-brand`, o bloco `<Franchising>` do Footer.

---

## 8. ASSETS

### 8.1 Realidade atual (medida, não estimada)

`public/images/` está **vazia** — só 7 SVGs de marca em `public/brand/`. O banco do institucional tem 278 imagens e: **zero de Brasília**, **zero de piso vinílico**, **zero de revestimento**. A melhor foto de steel frame (`others/cenario-de-steel-frame-fast-sistemas-construtivos.webp`) é stock/IA com eucalipto australiano. A única foto real de canteiro (`others/obra-de-steel-frame.jpg`) é celular, sol de meio-dia, e não é DF.

**Usar a foto do eucalipto australiano como hero é pior que não ter foto:** é uma paisagem que não existe no DF numa página que promete obra no DF.

### 8.2 Bloqueantes (gates de produção)

| Ativo | Onde entra | Enquanto não existe |
|---|---|---|
| **1 foto de ambiente entregue no DF**, luz rasante, cor plena | Hero | A coluna direita do hero recebe a **figura vetorial da parede** (a mesma de Dentro da parede) em escala grande sobre campo cinza. Não mente e é construível hoje |
| **4–6 fotos de obras no DF** com m², prazo, sistema, região | Obras | Bloco de **prova textual verificável** (tabela obra / m² / prazo / sistema / região). Sem foto falsa |
| **1 foto de canteiro organizado** (placas empilhadas, chão varrido, perfis em feixe, EPI) | Comparativo, coluna "montagem" | É a foto que praticamente nenhum concorrente tem e vale mais que dez renders. Interim: recorte de produto |
| **3 depoimentos** com nome completo, tipo de obra e região | Obras | **A seção some.** Depoimento anônimo ou inventado não entra |
| **Logos de clientes corporativos** com autorização | Obras | Faixa some |
| **Números do DF**: obras entregues, m² executados, prazo médio real | H1, Credibilidade, Cotas | H1 cai para a versão sem número. Faixa de credibilidade roda só com os números nacionais (esses estão confirmados: +20 anos, +45 unidades, 1,5 Mi m²/mês, +20.000 pedidos/ano, ABF) |
| **Specs técnicos confirmados**: montante 48/70, espessura da placa, lã 50, dB real por sistema, NBR aplicáveis | Cotas, Etiquetas, Dentro da parede | Rótulos genéricos (ESTRUTURA / ISOLAMENTO / FECHAMENTO). **Spec inventada numa página que vende engenharia é passivo comercial, não licença poética** — é exatamente o número que o comprador corporativo confere |
| **"Resposta no próximo dia útil"** | Microcopy do CTA e tela de sucesso | Só entra se a operação cumprir. É a primeira promessa que vai ser cumprida ou quebrada |

### 8.3 Produzível internamente

- **Figura SVG da parede em 3 camadas** (Dentro da parede + hero interim). Prototipar na semana 1.
- **Furo oval punçoado** em data-URI (traço externo + fio interno).
- **Recortes de produto** já existentes no banco nacional para os cards de sistema: `products/montante-drywall.png`, `guia-drywall.png`, `perfil-de-steel-frame.png`, `placa-de-drywall.png` — já estão sobre branco, já são "processo/frio", e resolvem também piso vinílico e revestimento (que não têm foto nenhuma).
- **Overlay de grão** — o `.noise` a 0.04 já existe em `effects.css`.

### 8.4 Direção de arte para o shoot (quando acontecer)

Luz rasante obrigatória (única coisa que torna drywall fotogênico: revela planicidade, sombra de sanca, nitidez de canto). Macro de junta, canto vivo, encontro de placa. Canteiro organizado. Nada de pessoa sorrindo posada; se houver gente, gente trabalhando de fato, cortada, em movimento. Zero capacete amarelo, zero planta baixa azul, zero aperto de mão.

---

## 9. RISCOS E MITIGAÇÕES

**R1 — O campo cinza lê como wireframe / LP de construtora em Bootstrap.**
É o risco que a própria direção não nomeava e o mais provável de acontecer. Mitigações já embutidas: o cinza não é global (só seções técnicas); **nenhum módulo branco é caixa arredondada centralizada flutuando com sombra difusa** — todo módulo sangra para pelo menos uma borda do container ou encosta rente à margem, e nenhum recebe `--shadow-*`; a página é feita de **massas** (duas faixas escuras, pílula vermelha, blocos brancos), não de hairlines.
*Critério de corte:* se na build o cinza dominar, ele recua para 3 seções.

**R2 — A camada Manrope vira decoração.**
Se o usuário precisar ler uma cota para entender o conteúdo, a hierarquia inverteu. Guardas: Manrope travado em `--text-xs`, nunca carrega informação necessária, e toda etiqueta é par `RÓTULO · VALOR` com valor verificável.

**R3 — O snap vira tique.**
Reduzido de 13 para 5 instâncias. *Critério de corte:* se em teste de usabilidade alguém notar "de novo essa linha", cai para 3 (H1, obras, CTA final).

**R4 — Contraste.** Três armadilhas já resolvidas e uma que fica registrada: galvanizado só em traço; nenhum texto vermelho sobre `#050505`; `--color-chalk` recalibrado. A que fica: `#d01218` com texto branco dá **5,55:1** — passa AA e não atinge os 7:1 que a base de padrões pede para CTA. **Não se repinta a marca para fechar número.** O CTA compra atenção por ser o único preenchimento vermelho da página, o que vale mais que meio ponto de ratio.

**R5 — FOUC de movimento.** Ver §6.3. É o modo de falha mais provável em produção e a mitigação é estrutural, não cosmética.

**R6 — `ScrollTrigger.refresh()` caro.** Instâncias: 5 snaps + 3 scroll-linked + reveals = ~12. Aceitável. Sem a polilinha (morta) o `refresh()` não precisa recalcular geometria medida. O acordeão da FAQ chama `ScrollTrigger.refresh()` no `onComplete`, não a cada frame.

**R7 — Números e specs não confirmados.** Ver §8.2. Regra: **se a operação não confirmar, a seção encolhe em vez de mentir.**

**R8 — Vercel free.** Custo de motion medido antes de fechar escopo: GSAP core ~28,3KB gz + ScrollTrigger ~18,0KB gz + SplitText ~3KB gz ≈ **49KB gz** antes da primeira linha de app. Rodar `ANALYZE=true npm run build` com `@next/bundle-analyzer` antes de subir. Se apertar, o corte é o Lenis (~10KB), depois o marquee.

**R9 — Copy genérica mata a direção.** Proibidos no texto: *soluções que transformam ambientes, excelência, inovação, seu sonho, entre em contato e saiba mais, parceiro na construção*. Todo título é verbo ou afirmação concreta. **Nenhum adjetivo sobrevive se puder virar número.** Nada de linguagem de franquia: "Fast em Brasília", nunca "unidade franqueada".

---

## 10. ORDEM DE IMPLEMENTAÇÃO

### Fase 0 — Higiene do repositório (antes de qualquer componente)

1. **Fontes.** `src/app/layout.tsx` declara DM Sans, Urbanist e Manrope com `weight: ["200".."700"]` e `subsets: ["latin","latin-ext"]`. As três são variable fonts — passar array de weight força o download de instâncias estáticas: 3 famílias × 6 pesos × 2 subsets. **Remover o `weight` inteiro** (serve a variable) e **cortar `latin-ext`** (pt-BR está todo em `latin`). É imposto de LCP que nenhuma das três direções percebeu.
2. **`next.config.ts` não tem bloco `images`.** Breaking change confirmada no Next 16: `images.qualities` passou a ter default `[75]` e qualquer `quality` fora da lista é coagido. Declarar `formats`, `qualities`, `deviceSizes` antes de subir a primeira foto.
3. **Remover `swiper`** do `package.json` e do `optimizePackageImports` — nada neste plano usa carrossel (marquee é GSAP, fileira de obras é `scroll-snap` + `overflow-x`).
4. Adicionar os 8 tokens novos em `theme.css` (2 de cor, 6 de motion/geometria).
5. Script inline síncrono no `<head>` carimbando `data-motion` em `<html>`.

### Fase 1 — Gates de protótipo (30 min cada, decidem a direção)

6. **Teste de perceptibilidade do snap.** Uma página em branco, só a `SnapLine`, em monitor de escritório com brilho a 40%. Se o engrossamento + pó não se lê, a assinatura não existe e o gesto precisa de outro tratamento **antes** de qualquer seção ser construída.
7. **Teste do espelho em cinza.** Mockup estático do hero em escala de cinza. Se desmonta sem o vermelho, o layout é refeito.
8. **Figura SVG da parede em 3 camadas.** Se sair como clip-art de CAD, ela não vai para o hero e Dentro da parede vira bloco textual.

### Fase 2 — O objetivo primeiro

9. `FormModalProvider` + `FormModal` + `FormFields` + `SubmitFeedback` (loading, sucesso, erro abaixo do campo, ícone + texto).
10. `attribution.ts` + `UtmPersist` + `origin` viajando no envio.
11. `WhatsAppFloating` com mensagem pré-preenchida carregando origem e UTM.
12. `Button`, `Field`, `SelectField` com `id` obrigatório na assinatura.

> Ordem deliberada: se o cronograma estourar na metade, o que estiver pronto já converte.

### Fase 3 — Sistema visual

13. `SnapLine`, `Cota`, `Etiqueta`, `SectionHeader`, `PhotoCotada`.
14. `GsapRoot` + `useSnap` / `useReveal` / `useScrubCounter`.
15. `Header` + `Footer`.

### Fase 4 — Seções, em ordem de conversão

16. Hero + `PreQualificationBar` + Credibilidade.
17. Comparativo (quebra-quebra × montagem + um responsável).
18. Sistemas.
19. Obras + depoimentos + logos.
20. FAQ.
21. Como trabalhamos.
22. Dentro da parede.
23. Cobertura + CTA final.

### Fase 5 — Acabamento

24. Passada de motion: contar os tweens scroll-linked em voz alta (o número tem que ser 3), verificar `once: true` em todos os reveals, verificar remoção de `will-change`, matar o skeleton no unmount.
25. `prefers-reduced-motion` testado de verdade, não presumido.
26. Lighthouse + `ANALYZE=true npm run build`. Teste em Android mediano em 4G, não só no desktop.
27. Acessibilidade: foco visível em tudo, foco preso no modal, `Esc`, retorno de foco, alvo ≥44px, rótulo visível em todo campo, contraste conferido nas duas faixas escuras.
28. Políticas (`/politicas/*`) e sitemap.

---

### Resumo das decisões onde os juízes divergiram

| Divergência | Decisão | Critério |
|---|---|---|
| Vencedora: LINHA SECA (2 votos) vs ESTRUTURA APARENTE (1) | **LINHA SECA**, com todas as objeções técnicas do voto minoritário aplicadas como correção | Os defeitos da LINHA SECA são de engenharia (nomeáveis e corrigíveis); os das outras duas são de posicionamento — ESTRUTURA APARENTE aposentava `--color-fg` e `--color-gray-surface` e importava marfim, o que é rebrand de subdomínio, e `briefing.md` exige alinhamento de marca com o institucional |
| Pin: cortar (juiz 2) vs reduzir para 120–150% (juízes 1 e 3) | **Cortar inteiro** | O fallback mobile já desenhado é equivalente em informação, não degradado. Se serve sozinho no mobile, serve sozinho no desktop — e some o item mais caro de scroll num plano free |
| "Um responsável" como seção própria (juiz 2) vs cortar seções (juiz 1) | **Absorvido no Comparativo** | O argumento é adjacente à seção que já existe e não paga uma rolagem sozinho. Contagem de seção é custo de conversão direto |
| Última peça cortada pela borda: adotar (juiz 2) vs desligar no grid de serviços (juiz 1) | **Só no mosaico de obras** | Esconder escopo de serviço come intenção de compra; esconder uma obra do portfólio não |
| Campo cinza global (direção original) vs alternado (juiz 1) | **Alternado por papel narrativo** | Cinza uniforme lê como wireframe e mata desejo; alternado, a inversão vira gramática legível |
| Marcador `01/02/03` em Como trabalhamos | **Duração real no lugar do ordinal** | A ordem já é legível pela posição; o que o comprador precisa saber é quanto tempo leva |