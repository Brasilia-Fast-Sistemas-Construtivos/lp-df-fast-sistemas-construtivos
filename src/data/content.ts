import type { FaqEntry } from "@/types/seo";

export const CONTENT_GATES = {
  prazoMedioDias: null as number | null,
  obrasEntreguesDf: null as number | null,
  metrosExecutadosDf: null as number | null,
  respostaProximoDiaUtil: false,
  specsConfirmadas: false,
} as const;

export const HERO = {
  titulo: "Todo o material da construção a seco, em um só lugar.",
  subtitulo:
    "Placas, perfis, forros, pisos e isolamento com preço de rede nacional e pronta entrega em Brasília. E, se você precisar, a gente também instala.",
  microcopy: "Atendimento em todo o DF e entorno.",
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
    descricao:
      "Envie a lista de materiais ou descreva o projeto pelo formulário ou WhatsApp. Não precisa saber quantidade: a equipe calcula com você.",
  },
  {
    passo: "02",
    titulo: "Receba o orçamento",
    descricao:
      "Retornamos com preço, disponibilidade e as condições de entrega para a sua região do DF.",
  },
  {
    passo: "03",
    titulo: "Receba o material",
    descricao:
      "A entrega é combinada no orçamento, para todo o Distrito Federal e entorno.",
  },
  {
    passo: "04",
    titulo: "Instalação, se você quiser",
    descricao:
      "A mesma equipe que vende o material executa a obra — material e mão de obra em um só contrato.",
  },
] as const;

export const FAQ_LP: FaqEntry[] = [
  {
    question: "Posso comprar só o material, sem a instalação?",
    answer:
      "Pode. A Fast vende placas, perfis, forros, pisos, isolamento e acessórios avulsos, na quantidade do seu projeto. Se quiser, a equipe também executa — mas a compra do material não obriga a contratação da obra.",
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

export const REGIOES_OPTIONS = REGIOES_ATENDIDAS.map((regiao) => ({
  value: regiao.toLowerCase().replace(/\s+/g, "-"),
  label: regiao,
}));

export const TIPOS_DE_OBRA = [
  { value: "compra-de-material", label: "Compra de material" },
  { value: "residencial", label: "Obra residencial" },
  { value: "comercial", label: "Obra comercial" },
  { value: "corporativo", label: "Obra corporativa" },
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
  titulo: "Peça seu orçamento: material ou obra completa.",
  subtitulo:
    "Envie a lista de materiais do seu projeto ou agende a visita técnica. Retornamos com preço, prazo e condições de entrega.",
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
