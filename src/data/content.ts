import type { FaqEntry } from "@/types/seo";

export const CONTENT_GATES = {
  prazoMedioDias: null as number | null,
  obrasEntreguesDf: null as number | null,
  metrosExecutadosDf: null as number | null,
  respostaProximoDiaUtil: false,
  specsConfirmadas: false,
} as const;

export const HERO = {
  badge: "Drywall e steel frame · Brasília e DF",
  titulo: "Faça sua obra com a Fast Brasília, do projeto à conclusão.",
  subtitulo:
    "Especificação, quantitativo e material em cada fase da obra. Com execução, se você quiser.",
  microcopy: "Atendimento em todo o DF e entorno.",
} as const;

export const OBRA_COMPLETA = {
  titulo: "Do projeto à conclusão, sem trocar de fornecedor.",
  descricao:
    "A Fast especifica o sistema com você, fecha o quantitativo e entrega o material de cada fase. A execução fica com você ou com a nossa equipe.",
  fases: [
    {
      slug: "projeto",
      nome: "Projeto",
      descricao:
        "Especificação do sistema e lista de material fechada a partir da sua planta.",
    },
    {
      slug: "estrutura",
      nome: "Estrutura",
      descricao: "Perfil, montante e guia para levantar a estrutura e erguer as paredes.",
    },
    {
      slug: "fechamento",
      nome: "Fechamento",
      descricao: "Placa, parafuso e isolamento térmico e acústico para fechar os vãos.",
    },
    {
      slug: "acabamento",
      nome: "Acabamento",
      descricao: "Massa, fita, cantoneira, forro e piso para a obra sair pronta para usar.",
    },
    {
      slug: "conclusao",
      nome: "Conclusão",
      descricao: "Reposição do que faltar até o último metro, sem a obra parar esperando.",
    },
  ],
} as const;

export const STEEL_CONECTA_SECAO = {
  eyebrow: "Execução de obra · Grupo Fast",
  titulo: "A Fast fornece o material. A Steel Conecta constrói.",
  descricao:
    "Mesma estrutura, mesmo material, com equipe própria para tocar a obra do início ao fim. A Steel Conecta tem o suporte do Grupo Fast para operar com o padrão da maior rede de construção a seco do Brasil, com foco total na execução.",
  cartaoLegenda: "Marca de execução do Grupo Fast",
  microcopy: "Atendimento em todo o DF e entorno, mesma equipe da Fast.",
  diferenciais: [
    {
      slug: "equipe-propria",
      icone: "equipe",
      titulo: "Equipe própria de execução",
      descricao:
        "Steel frame e drywall montados por equipe certificada da própria Steel Conecta, sem intermediação.",
    },
    {
      slug: "material-sem-repasse",
      icone: "material",
      titulo: "Mesmo material, sem repasse",
      descricao:
        "O material sai direto do estoque Fast para a obra, o mesmo da loja, sem terceirização.",
    },
    {
      slug: "escopo-em-contrato",
      icone: "contrato",
      titulo: "Escopo e prazo fechados em contrato",
      descricao:
        "Do projeto à entrega, com um único responsável pela execução do início ao fim.",
    },
  ],
} as const;

export const OBRAS_EXECUCAO = {
  eyebrow: "Execução: Steel Conecta",
  titulo: "Essas obras foram executadas pela Steel Conecta, com material Fast.",
} as const;

export const PRODUTOS = [
  { nome: "Placa de drywall", arquivo: "placa-de-drywall.png" },
  { nome: "Montante de drywall", arquivo: "montante-drywall.png" },
  { nome: "Guia de drywall", arquivo: "guia-drywall.png" },
  { nome: "Perfil de steel frame", arquivo: "perfil-de-steel-frame.png" },
  { nome: "Montante de steel frame", arquivo: "montante-steel-frame.png" },
  { nome: "Placa Glasroc", arquivo: "placa-glasroc.png" },
  { nome: "Lã de vidro", arquivo: "la-de-vidro.png" },
  { nome: "Lã de rocha", arquivo: "la-de-rocha.png" },
  { nome: "Forro de PVC", arquivo: "forro-de-pvc.png" },
  { nome: "Forro mineral", arquivo: "forro-mineral.png" },
  { nome: "Massa para drywall", arquivo: "massa-de-drywall.png" },
  { nome: "Fita telada", arquivo: "fita-telada.png" },
  { nome: "Banda acústica", arquivo: "banda-acustica.png" },
  { nome: "Cantoneira perfurada", arquivo: "cantoneira-perfurada.png" },
  { nome: "Placa OSB", arquivo: "placa-osb.png" },
  { nome: "Placa RF", arquivo: "placa-rf.png" },
] as const;

export const SOBRE = {
  titulo: "A maior rede de construção a seco do Brasil, atendendo Brasília.",
  descricao:
    "Material e mão de obra em um só contrato, com a força de uma rede nacional e equipe dedicada ao DF.",
  imagem: "/sobre/equipe.jpeg",
  imagemAlt: "Equipe da Fast Sistemas Construtivos trabalhando em uma obra de construção a seco",
} as const;

export const ESTATISTICAS = [
  { numero: "+ 1,5 Mi", descricao: "m² de placas distribuídos todo mês" },
  { numero: "+ 20.000", descricao: "pedidos entregues por ano" },
  { numero: "+ 45", descricao: "unidades em todo o Brasil" },
  { numero: "+ 20 anos", descricao: "de história e liderança de mercado" },
] as const;

export const SISTEMAS = [
  {
    slug: "drywall",
    problema: "Precisa dividir um ambiente sem virar obra.",
    nome: "Drywall",
    descricao:
      "Parede nova erguida, acabada e pintada sem quebrar nada do que já existe.",
    etiqueta: [{ rotulo: "SISTEMA", valor: "PAREDE A SECO" }],
  },
  {
    slug: "steel-frame",
    problema: "Quer construir do zero com prazo que se cumpre.",
    nome: "Steel Frame",
    descricao:
      "Estrutura metálica leve, montada em obra limpa, com desempenho térmico e acústico superior à alvenaria.",
    etiqueta: [{ rotulo: "SISTEMA", valor: "ESTRUTURA LEVE" }],
  },
  {
    slug: "forro",
    problema: "O teto precisa esconder instalação e ganhar acabamento.",
    nome: "Forro",
    descricao:
      "Drywall, PVC, mineral e removível. Passagem de instalação resolvida com acabamento liso.",
    etiqueta: [{ rotulo: "SISTEMA", valor: "FORRO" }],
  },
  {
    slug: "divisoria",
    problema: "O layout do escritório muda e a parede não pode atrapalhar.",
    nome: "Divisória",
    descricao:
      "Ambientes corporativos reconfiguráveis, montados e remontados sem quebra-quebra.",
    etiqueta: [{ rotulo: "SISTEMA", valor: "DIVISÓRIA" }],
  },
  {
    slug: "piso-vinilico",
    problema: "Quer trocar o piso sem parar a operação.",
    nome: "Piso Vinílico",
    descricao:
      "Régua e manta instaladas sobre o contrapiso existente, com liberação rápida do ambiente.",
    etiqueta: [{ rotulo: "SISTEMA", valor: "PISO" }],
  },
  {
    slug: "revestimento",
    problema: "A fachada ou a parede precisa de acabamento que dure.",
    nome: "Revestimento",
    descricao:
      "Revestimento interno e de fachada que protege a edificação e valoriza o acabamento.",
    etiqueta: [{ rotulo: "SISTEMA", valor: "REVESTIMENTO" }],
  },
] as const;

export const ETAPAS = [
  {
    passo: "01",
    titulo: "Conte o que você precisa",
    descricao: "Envie a lista de materiais ou descreva o projeto. A equipe calcula com você.",
  },
  {
    passo: "02",
    titulo: "Receba o orçamento",
    descricao: "Preço, disponibilidade e condições de entrega para a sua região.",
  },
  {
    passo: "03",
    titulo: "Receba o material",
    descricao: "Entrega combinada no orçamento, em todo o DF e entorno.",
  },
  {
    passo: "04",
    titulo: "Instalação, se você quiser",
    descricao: "A mesma equipe instala, com tudo em um só contrato.",
  },
] as const;

export const FAQ_LP: FaqEntry[] = [
  {
    question: "Posso comprar só o material, sem a instalação?",
    answer:
      "Pode. A Fast vende placas, perfis, forros, pisos, isolamento e acessórios avulsos, na quantidade do seu projeto. Se quiser, a equipe também executa, mas a compra do material não obriga a contratação da obra.",
  },
  {
    question: "Vocês acompanham a obra do início ao fim?",
    answer:
      "Sim, como fornecedor. A gente especifica o sistema com você, fecha o quantitativo antes de a obra começar e entrega o material de cada fase, incluindo a reposição do que faltar até a conclusão. Se você quiser, a nossa equipe também executa.",
  },
  {
    question: "Vocês entregam em Brasília e no entorno?",
    answer:
      "Sim, atendemos todo o Distrito Federal e o entorno. Informe sua região no orçamento e retornamos com o prazo e as condições de entrega para o seu endereço.",
  },
  {
    question: "A parede de drywall aguenta TV e armário?",
    answer:
      "Aguenta. O ponto de fixação é definido no projeto e reforçado na estrutura antes do fechamento, para suportar a carga prevista. Diga na visita técnica o que vai ser pendurado e onde.",
  },
  {
    question: "Vai sujar minha casa?",
    answer:
      "Não como uma obra de alvenaria. Construção a seco não usa água nem argamassa: não há entulho úmido, poeira de quebra nem tempo de cura. O canteiro é montado, usado e limpo no mesmo dia.",
  },
  {
    question: "Abafa o som do vizinho?",
    answer:
      "Sim, e o desempenho depende do sistema escolhido. A composição de placa, montante e lã é definida conforme o isolamento que você precisa. Na visita técnica indicamos qual sistema atende o seu caso.",
  },
  {
    question: "Sai mais caro que alvenaria?",
    answer:
      "O material custa mais por metro, mas o custo total costuma fechar abaixo: a obra é mais rápida, não há quebra nem reparo do que foi quebrado, não há entulho para retirar e o ambiente volta a ser usado antes. O orçamento fechado mostra o comparativo.",
  },
  {
    question: "Qual a garantia?",
    answer:
      "Material e execução ficam sob o mesmo contrato, com um único responsável. A garantia é formalizada na entrega, junto da vistoria final.",
  },
  {
    question: "Quanto tempo leva?",
    answer:
      "Depende da metragem e do sistema, e o prazo é fechado no orçamento antes de começar. Peça a visita técnica para receber o prazo do seu projeto por escrito.",
  },
];

export const REGIOES_ATENDIDAS = [
  "Plano Piloto",
  "Asa Sul",
  "Asa Norte",
  "Sudoeste",
  "Noroeste",
  "Lago Sul",
  "Lago Norte",
  "Jardim Botânico",
  "Águas Claras",
  "Vicente Pires",
  "Taguatinga",
  "Guará",
  "Park Way",
  "Sobradinho",
  "Ceilândia",
  "Samambaia",
  "Gama",
  "Santa Maria",
  "São Sebastião",
  "Riacho Fundo",
  "Recanto das Emas",
  "Núcleo Bandeirante",
  "Candangolândia",
  "Cruzeiro",
  "Planaltina",
  "Brazlândia",
  "Paranoá",
  "Itapoã",
  "Arniqueira",
  "Entorno do DF",
] as const;

export const REGIAO_FORA_DO_DF = "Entorno do DF";

export const PREFIXO_ENTORNO = "Entorno";

export const CIDADE_PADRAO = "Brasília";

export const ESTADO_PADRAO = "Distrito Federal";

export const ESTADO_FORA_DO_DF = "Goiás";

export const INTERESSE_MATERIAL = "material";

export const INTERESSE_MAO_DE_OBRA = "mao_obra";

export const INTERESSE_AMBOS = "ambos";

export const ATENDIMENTO_FAST = "Fast Sistemas Construtivos";

export const ATENDIMENTO_STEEL_CONECTA = "Steel Conecta";

export const VALOR_NAO_INFORMADO = "Não informado";

export const OPCOES_INTERESSE = [
  {
    value: INTERESSE_MATERIAL,
    label: "Só material",
    descricao: "Você compra e cuida da instalação por conta própria.",
    icone: "material",
    atendimento: ATENDIMENTO_FAST,
  },
  {
    value: INTERESSE_MAO_DE_OBRA,
    label: "Só mão de obra",
    descricao: "Você já tem ou compra à parte o material e quer só a execução.",
    icone: "equipe",
    atendimento: ATENDIMENTO_STEEL_CONECTA,
  },
  {
    value: INTERESSE_AMBOS,
    label: "Material + mão de obra",
    descricao: "A Fast fornece o material e a Steel Conecta executa, do início ao fim.",
    icone: "contrato",
    atendimento: ATENDIMENTO_STEEL_CONECTA,
  },
] as const;

export const ATENDIMENTO_POR_INTERESSE: Record<string, string> = Object.fromEntries(
  OPCOES_INTERESSE.map((opcao) => [opcao.value, opcao.atendimento])
);

export const LABEL_POR_INTERESSE: Record<string, string> = Object.fromEntries(
  OPCOES_INTERESSE.map((opcao) => [opcao.value, opcao.label])
);

export const ETAPAS_DA_OBRA = [
  { value: "Planejamento", label: "Planejamento" },
  { value: "Início da execução", label: "Início da execução" },
  { value: "Final da obra", label: "Final da obra" },
] as const;

export const SISTEMAS_EM_USO = [
  { value: "Drywall", label: "Drywall" },
  { value: "Steel Frame", label: "Steel Frame" },
  { value: "Drywall + Steel Frame", label: "Drywall + Steel Frame" },
] as const;

export const TIPOS_DE_OBRA = [
  { value: "Construção Residencial", label: "Construção residencial" },
  { value: "Construção Comercial", label: "Construção comercial" },
  { value: "Reforma ou Ampliação", label: "Reforma ou ampliação" },
] as const;

export const TIPO_OBRA_POR_SISTEMA: Record<string, string> = {
  drywall: "Reforma ou Ampliação",
  "steel-frame": "Construção Residencial",
  divisoria: "Construção Comercial",
  "piso-vinilico": "Construção Comercial",
};

export const RESPOSTAS_SIM_NAO = [
  { value: "Sim", label: "Sim" },
  { value: "Não", label: "Não" },
] as const;

export const LIMITE_DESCRICAO = 2000;

export const LIMITE_REGIAO = 80;

export const LIMITE_METRAGEM = 60;

export const CTA_FINAL = {
  titulo: "Peça seu orçamento: material ou obra completa.",
  subtitulo: "Envie sua lista de materiais ou agende a visita técnica. Retornamos com preço e prazo.",
  microcopy: "Sem compromisso. Retornamos pelo canal que você preferir.",
} as const;

export const MARCAS: Array<{ nome: string; arquivo: string }> = [
  { nome: "Saint-Gobain", arquivo: "saint-gobain.png" },
  { nome: "Isover", arquivo: "isover-icon.png" },
  { nome: "Ecophone", arquivo: "ecophone-icon.png" },
  { nome: "Nova Metálica", arquivo: "nova-metalica-icon.png" },
  { nome: "Tekbond", arquivo: "tekbond.png" },
  { nome: "Ruffino", arquivo: "ruffino.png" },
];

export const CLIENTES: Array<{ nome: string; arquivo: string }> = [];

export const OBRAS_GALERIA = [
  {
    imagem: "/obras/residencial.webp",
    titulo: "Residência em steel frame",
    tipo: "Residencial",
    sistema: "Steel Frame",
  },
  {
    imagem: "/obras/comercial.webp",
    titulo: "Fachada comercial",
    tipo: "Comercial",
    sistema: "Steel Frame",
  },
  {
    imagem: "/obras/interior.webp",
    titulo: "Interior com parede de drywall",
    tipo: "Residencial",
    sistema: "Drywall",
  },
  {
    imagem: "/obras/corporativo.webp",
    titulo: "Ambiente corporativo com forro acústico",
    tipo: "Corporativo",
    sistema: "Forro acústico",
  },
  {
    imagem: "/obras/casa.webp",
    titulo: "Casa em steel frame",
    tipo: "Residencial",
    sistema: "Steel Frame",
  },
] as const;

export const DEPOIMENTOS: Array<{
  nome: string;
  tipoObra: string;
  regiao: string;
  texto: string;
}> = [];

export const OBRAS: Array<{
  titulo: string;
  tipo: string;
  metragem: string;
  prazo: string;
  sistema: string;
  regiao: string;
  imagem?: string;
}> = [];

export const LOGOS_CORPORATIVOS: Array<{ nome: string; arquivo: string }> = [];
