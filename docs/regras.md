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
