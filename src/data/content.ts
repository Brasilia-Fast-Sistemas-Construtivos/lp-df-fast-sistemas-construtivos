import type { FaqEntry } from "@/types/seo";

export const CONTENT_GATES = {
  prazoMedioDias: null as number | null,
  obrasEntreguesDf: null as number | null,
  metrosExecutadosDf: null as number | null,
  respostaProximoDiaUtil: false,
  specsConfirmadas: false,
} as const;

export const HERO = {
  etiqueta: [
    { rotulo: "FAST", valor: "SISTEMAS CONSTRUTIVOS" },
    { rotulo: "ATENDIMENTO", valor: "DISTRITO FEDERAL" },
  ],
  tituloComPrazo: "Parede pronta, pintada e entregue em {prazo} dias.",
  tituloSemPrazo: "Parede pronta, pintada e entregue. Sem quebra-quebra.",
  palavraMarcada: "entregue",
  subtitulo:
    "Sem quebra-quebra, sem entulho, sem obra parada. A Fast vende o material e executa — um contrato, um responsável.",
  microcopy: "Atendimento em todo o DF e entorno.",
} as const;

export const SOBRE = {
  titulo: "A maior rede de construção a seco do Brasil, atendendo Brasília.",
  descricao:
    "Do aço ao acabamento, a Fast integra material e mão de obra em um só contrato. A estrutura de uma rede nacional, com equipe dedicada ao DF e entorno.",
  imagem: "/sobre/equipe.jpeg",
  imagemAlt: "Equipe da Fast Sistemas Construtivos trabalhando em uma obra de construção a seco",
} as const;

export const ESTATISTICAS = [
  { numero: "+ 1,5 Mi", descricao: "m² de placas distribuídos todo mês" },
  { numero: "+ 20.000", descricao: "pedidos entregues por ano" },
  { numero: "+ 45", descricao: "unidades em todo o Brasil" },
  { numero: "+ 20 anos", descricao: "de história e liderança de mercado" },
] as const;

export const COMPARATIVO = {
  titulo: "Quebra-quebra ou montagem.",
  palavraMarcada: "montagem",
  alvenaria: {
    rotulo: "ALVENARIA · OBRA ÚMIDA",
    itens: [
      "Entulho e poeira em toda a casa",
      "Água, cura e espera",
      "Semanas sem poder usar o cômodo",
      "Prazo que escorrega",
    ],
  },
  aSeco: {
    rotulo: "CONSTRUÇÃO A SECO · FAST",
    itens: [
      "Montagem limpa, sem entulho",
      "Sem água e sem tempo de cura",
      "Cômodo liberado em dias",
      "Prazo fechado em contrato",
    ],
  },
  umResponsavel: {
    titulo: "Um responsável.",
    palavraMarcada: "responsável",
    itens: [
      { rotulo: "MATERIAL", valor: "Direto da Fast, sem atravessador" },
      { rotulo: "MÃO DE OBRA", valor: "Equipe própria especializada" },
      { rotulo: "GARANTIA", valor: "Um contrato, um interlocutor" },
    ],
  },
} as const;

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
    duracao: "DIA 1",
    tempo: "4H",
    titulo: "Visita técnica",
    descricao: "Medição no local, entendimento do uso e das restrições do ambiente.",
  },
  {
    duracao: "DIA 2",
    tempo: "",
    titulo: "Projeto e orçamento fechado",
    descricao: "Escopo, sistema e prazo por escrito. Sem valor que muda no meio da obra.",
  },
  {
    duracao: "EXECUÇÃO",
    tempo: "",
    titulo: "Montagem",
    descricao: "Estrutura, isolamento e fechamento com equipe própria e canteiro organizado.",
  },
  {
    duracao: "EXECUÇÃO",
    tempo: "",
    titulo: "Acabamento",
    descricao: "Tratamento de junta, massa e pintura. A parede sai pronta para uso.",
  },
  {
    duracao: "ENTREGA",
    tempo: "",
    titulo: "Entrega com garantia",
    descricao: "Vistoria final, limpeza e garantia formalizada em contrato.",
  },
] as const;

export const FAQ_LP: FaqEntry[] = [
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

export const REGIOES_OPTIONS = REGIOES_ATENDIDAS.map((regiao) => ({
  value: regiao.toLowerCase().replace(/\s+/g, "-"),
  label: regiao,
}));

export const TIPOS_DE_OBRA = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
  { value: "corporativo", label: "Corporativo" },
  { value: "reforma", label: "Reforma" },
  { value: "construcao-nova", label: "Construção nova" },
] as const;

export const FAIXAS_METRAGEM = [
  { value: "ate-30", label: "Até 30 m²" },
  { value: "30-80", label: "30 a 80 m²" },
  { value: "80-200", label: "80 a 200 m²" },
  { value: "acima-200", label: "Acima de 200 m²" },
  { value: "nao-sei", label: "Ainda não sei" },
] as const;

export const CTA_FINAL = {
  titulo: "Peça o orçamento da sua obra.",
  palavraMarcada: "orçamento",
  subtitulo:
    "Visita técnica no seu endereço, escopo definido e prazo fechado por escrito antes de começar.",
  microcopy: "Sem compromisso. Retornamos pelo canal que você preferir.",
} as const;

export const MARCAS: Array<{ nome: string; arquivo: string }> = [
  { nome: "Saint-Gobain", arquivo: "saint-gobain.png" },
  { nome: "Isover", arquivo: "isover-icon.png" },
  { nome: "Ecophone", arquivo: "ecophone-icon.png" },
  { nome: "Ecofiber", arquivo: "ecofiber-icon.png" },
  { nome: "Nova Metálica", arquivo: "nova-metalica-icon.png" },
  { nome: "Tekbond", arquivo: "tekbond.png" },
  { nome: "Ruffino", arquivo: "ruffino.png" },
];

export const CLIENTES: Array<{ nome: string; arquivo: string }> = [
  { nome: "Maracanã", arquivo: "logo-cliente-maracana.jpg" },
  { nome: "Torra Torra", arquivo: "logo-cliente-torra-torra.jpg" },
];

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
