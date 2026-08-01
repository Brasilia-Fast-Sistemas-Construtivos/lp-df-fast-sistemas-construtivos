# Regras e padrões do projeto

## Posicionamento

O site vende a **Fast**, não uma franqueada. Brasília é o recorte de atendimento — a identidade é a marca nacional.

Vale para copy, títulos, metadata, alt de imagem e schema:

| Usar | Evitar |
| --- | --- |
| Fast Sistemas Construtivos | Franquia Fast Brasília |
| Fast em Brasília / atendimento no DF | Unidade franqueada do DF |
| Nossa equipe em Brasília | Somos uma franquia |

O logo e a identidade são os oficiais da marca, sem variação regional, selo de unidade ou assinatura própria.

## Domínio

`df.fastsistemasconstrutivos.com.br` — subdomínio do institucional.

Como o institucional (`www`) cobre os mesmos produtos em âmbito nacional, o conteúdo daqui precisa ser **local de verdade** (Brasília, DF, entorno) para não canibalizar o domínio principal em busca orgânica. Não duplicar texto do institucional.

## Arquitetura de conversão

A LP inteira existe para uma coisa: **preencher o formulário**. Toda decisão de layout, copy e componente é julgada por isso.

### Todo botão abre o modal

Não existe CTA que leve para outra página, faça scroll para uma seção de contato ou tenha comportamento próprio. Todo botão de ação do site abre o **mesmo modal de formulário**.

Consequências para o código:

- O modal é um componente único e global, montado uma vez no shell — não uma cópia por seção
- Estado de abertura controlado por contexto (`FormModalProvider`), não por prop drilling
- Cada gatilho informa sua origem, para rastrear qual seção converte:

```tsx
<Button id="hero-btn-orcamento" origin="hero" />
<Button id="servicos-btn-drywall" origin="servicos-drywall" />
```

- A origem vai junto no envio do formulário, como campo oculto
- O modal precisa de: foco preso dentro dele, fechar com `Esc`, retorno do foco ao gatilho, e scroll do body travado enquanto aberto

### Botão flutuante de WhatsApp

Pop-up fixo no canto inferior direito, com a logo do WhatsApp, presente em toda a LP.

- Posição fixa, canto inferior direito, acima do conteúdo mas abaixo do modal na ordem de camadas (`--z-sticky` para o botão, `--z-modal` para o modal)
- Abre conversa com **mensagem pré-definida**, deixando claro que é um contato vindo do site
- Número e texto vêm de `src/data/site.ts` — nunca escritos direto no componente
- Não pode cobrir campo de formulário nem o CTA principal no mobile
- Alvo mínimo de 44×44px
- Precisa de rótulo acessível: o ícone sozinho não comunica para leitor de tela

O WhatsApp é o canal secundário. Ele reforça, não substitui o formulário — que continua sendo o objetivo primário.

## Código

### Sem comentários

Nenhum comentário em nenhum arquivo de código — TSX, TS, CSS. O código precisa se explicar pelos nomes. Documentação vive em `docs/`.

### Nomenclatura

Variáveis, props e funções com nomes explícitos e autoexplicativos. Nada de abreviação obscura ou nome genérico (`data`, `item`, `handle`).

### IDs obrigatórios

Todo botão e todo campo de formulário recebe um `id` de identificação claro. Isso vale para rastreio de conversão, analytics e testes.

Padrão: `contexto-elemento-acao`

```
id="hero-btn-orcamento"
id="contato-form-nome"
id="contato-form-telefone"
id="footer-btn-whatsapp"
```

Como todo botão abre o mesmo modal, o `id` é o que permite saber **de onde** veio a conversão. Sem ele, todos os leads chegam indistinguíveis.

### Componentização

Padronizar e componentizar sempre que houver repetição. Cada componente resolve uma responsabilidade.

### Sem hardcode

Proibido valor hardcoded em cor, espaçamento, raio, fonte, duração ou z-index. Tudo vem dos tokens em `src/styles/tokens/theme.css`.

```
color: var(--color-brand);
padding: var(--space-5);
border-radius: var(--radius-md);
```

Dados de contato, URLs e textos recorrentes ficam centralizados em `src/data/`.

### Segurança

- Nenhuma chave, token ou credencial no repositório
- Variáveis sensíveis apenas em env — `NEXT_PUBLIC_` só para o que é realmente público
- Links externos com `rel="noopener noreferrer"`
- Validar entrada de formulário no client e no server

## Estilização

Emotion com styled. O padrão é **aninhado**, com `&  >` para descendentes diretos.

```
const Section = styled.section`
  .div1 {
    display: flex;

    & > .div2 {
      flex: 1;
    }

    & > .div3 {
      flex: 2;
    }
  }
`;
```

### Media queries inline

A media query fica na própria regra que ela altera, nunca agrupada em bloco separado no fim do arquivo.

Correto:

```
.hero {
  padding: var(--space-9);

  @media (max-width: 768px) {
    padding: var(--space-6);
  }

  & > .hero-title {
    font-size: var(--text-4xl);

    @media (max-width: 768px) {
      font-size: var(--text-2xl);
    }
  }
}
```

Errado:

```
.hero { padding: var(--space-9); }
.hero-title { font-size: var(--text-4xl); }

@media (max-width: 768px) {
  .hero { padding: var(--space-6); }
  .hero-title { font-size: var(--text-2xl); }
}
```

### Consistência visual

Manter o máximo de consistência de design e estilo sem fugir da ideia que a marca transmite. Foco no principal — não decorar por decorar.

## Copy

Nunca usar travessão (—) em nenhum texto do site. Separar ideias com vírgula, dois-pontos ou ponto final.

## Pilares

1. **Otimização**
2. **Velocidade**
3. **Qualidade**

Toda decisão técnica passa por esses três filtros.

## Infraestrutura

| Camada | Serviço |
| --- | --- |
| Versionamento | GitHub |
| Hospedagem | Vercel — plano free |

Como o plano é free, atenção a: tamanho de bundle, uso de imagem otimizada, e evitar dependência pesada sem necessidade real.
