import {
  BarChart3,
  BatteryCharging,
  Bolt,
  BrainCircuit,
  Building2,
  CircuitBoard,
  ClipboardCheck,
  Cpu,
  FileSearch,
  Gauge,
  Network,
  ShieldCheck,
} from "lucide-react";

export const differentiators = [
  {
    icon: BrainCircuit,
    title: "Engenharia data-driven",
    text: "Automação com Python, VBA e integrações controladas para consolidar dados, acelerar relatórios e apoiar decisões com rastreabilidade técnica.",
    tag: "Dados aplicados à decisão",
  },
  {
    icon: ShieldCheck,
    title: "Expertise regulatória",
    text: "Análise técnica de pareceres, enquadramento normativo e estruturação de evidências para processos de conexão complexos.",
    tag: "Regulação com fundamento técnico",
  },
  {
    icon: CircuitBoard,
    title: "Projetos de alta complexidade",
    text: "Strings, média tensão, proteção, subestações de consumidor, aumento de carga e infraestrutura para novos mercados de energia.",
    tag: "Do estudo à implantação",
  },
];

export const serviceGroups = [
  {
    icon: Bolt,
    title: "Engenharia e Projetos Elétricos",
    summary:
      "Projetos elétricos e fotovoltaicos estruturados para ambientes comerciais, industriais e institucionais.",
    items: [
      "Projetos fotovoltaicos, micro e minigeração",
      "Dimensionamento de strings e diagramas unifilares",
      "Proteção elétrica, memoriais e ART",
      "Subestações de consumidor e projetos de média tensão",
      "Estudos de demanda, aumento de carga e infraestrutura industrial",
      "Geradores, QTA e sistemas de backup para cargas críticas",
    ],
  },
  {
    icon: FileSearch,
    title: "Consultoria Regulatória Avançada",
    summary:
      "Atuação técnico-regulatória fundamentada para reduzir incertezas, organizar evidências e estruturar estratégias de conexão.",
    items: [
      "Auditoria de pareceres de acesso",
      "Estudos de inversão de fluxo e análise técnica de restrições",
      "Estratégia de conexão e homologação de projetos complexos",
      "Subsídios técnicos para ouvidorias, ANEEL e escritórios jurídicos",
      "Grid zero, controle de exportação e alternativas de conexão",
      "Documentação técnica sem promessa de aprovação pela distribuidora",
    ],
    featured: true,
  },
  {
    icon: BatteryCharging,
    title: "Mobilidade Elétrica e Novos Mercados",
    summary:
      "Estudos e projetos para eletropostos, hubs de recarga e integração entre rede, solar, bateria e carregadores.",
    items: [
      "Viabilidade para eletropostos e hubs de recarga rápida",
      "Dimensionamento de infraestrutura e ampliação de carga",
      "Integração solar, bateria, rede e carregadores",
      "Frotas corporativas, rodovias, varejo e condomínios",
      "Aplicações para postos, hospitais e operações críticas",
    ],
  },
  {
    icon: BarChart3,
    title: "Inteligência Energética e Automação",
    summary:
      "Ferramentas próprias para análise de faturas, relatórios, homologações, dashboards e performance energética.",
    items: [
      "Python, VBA e planilhas inteligentes",
      "Análise de faturas e organização de dados técnicos",
      "Automação de relatórios e gestão de homologações",
      "Dashboards executivos e técnicos",
      "Monitoramento e análise de performance",
    ],
  },
];

export const methodSteps = [
  {
    title: "Diagnóstico técnico",
    text: "Leitura de contexto, documentos, premissas de carga, rede, conexão e restrições declaradas.",
  },
  {
    title: "Modelagem de evidências",
    text: "Organização dos dados técnicos, simulações, alternativas e lacunas regulatórias relevantes.",
  },
  {
    title: "Estratégia de atuação",
    text: "Definição de rota técnica, entregáveis, prioridades e argumentos proporcionais ao risco do projeto.",
  },
  {
    title: "Entrega rastreável",
    text: "Memoriais, relatórios, painéis e documentação para tomada de decisão, implantação ou interlocução técnica.",
  },
];

export const values = [
  "Rigor técnico antes de promessa comercial",
  "Responsabilidade profissional e documental",
  "Clareza para decisões executivas",
  "Engenharia baseada em dados verificáveis",
  "Atuação B2B para projetos que exigem método",
  "Transparência sobre limites técnicos e regulatórios",
];

export const caseStudies = [
  {
    label: "Caso técnico anonimizado",
    title: "Restrição de conexão em projeto fotovoltaico",
    context:
      "Empreendimento de geração distribuída recebeu restrições técnicas que alteravam a viabilidade de implantação.",
    challenge:
      "Separar limitações reais de rede, premissas insuficientes e exigências que demandavam melhor fundamentação técnica.",
    strategy:
      "Auditoria documental, leitura de parecer, reconstrução de premissas elétricas e matriz de alternativas de conexão.",
    deliverables:
      "Relatório técnico, mapa de evidências, perguntas estruturadas e cenários de decisão.",
    impact:
      "Menor incerteza para a decisão de investimento e rota técnica mais clara para interlocução com a distribuidora.",
  },
  {
    label: "Cenário de referência",
    title: "Viabilidade de hub de recarga rápida",
    context:
      "Operação avalia implantação de recarga rápida em ponto com demanda futura elevada e restrições de infraestrutura.",
    challenge:
      "Dimensionar carga, fases de implantação, reforços e integração com geração, bateria e rede.",
    strategy:
      "Curva de demanda, análise de simultaneidade, alternativas de alimentação e plano técnico por fases.",
    deliverables:
      "Estudo de viabilidade, premissas de ampliação, matriz de riscos e arquitetura preliminar.",
    impact:
      "Base técnica para priorizar investimento, negociar infraestrutura e reduzir retrabalho de projeto.",
  },
  {
    label: "Caso ilustrativo",
    title: "Aumento de carga e infraestrutura elétrica",
    context:
      "Empresa em expansão precisava adequar entrada de energia, cargas internas e proteção para nova operação.",
    challenge:
      "Compatibilizar demanda atual, crescimento previsto, normas de concessionária e continuidade operacional.",
    strategy:
      "Levantamento de cargas, análise de demanda, alternativas de entrada e coordenação de proteção.",
    deliverables:
      "Projeto elétrico, memorial, lista de adequações e plano de implantação.",
    impact:
      "Projeto mais previsível, com critérios claros para contratação, aprovação técnica e execução.",
  },
  {
    label: "Caso técnico anonimizado",
    title: "Gerador para carga crítica",
    context:
      "Operação com cargas críticas precisava de backup compatível com seletividade, transferência e prioridade de circuitos.",
    challenge:
      "Evitar subdimensionamento, falhas de QTA e indisponibilidade de cargas essenciais.",
    strategy:
      "Classificação de cargas, estudo de partida, arquitetura de transferência e critérios de proteção.",
    deliverables:
      "Memorial técnico, diagrama unifilar, especificação de gerador e matriz de operação.",
    impact:
      "Maior confiabilidade para cargas prioritárias e critérios objetivos para aquisição e implantação.",
  },
  {
    label: "Cenário de referência",
    title: "Auditoria de parecer de acesso",
    context:
      "Cliente precisava entender tecnicamente exigências recebidas e organizar uma resposta consistente.",
    challenge:
      "Traduzir exigências, identificar pontos verificáveis e estruturar argumentos sem extrapolar limites regulatórios.",
    strategy:
      "Revisão de documentos, cruzamento com normas aplicáveis e elaboração de roteiro técnico-administrativo.",
    deliverables:
      "Parecer independente, quadro de evidências, lista de pendências e plano de próximos passos.",
    impact:
      "Interlocução mais objetiva e documentação preparada para decisões internas, ouvidoria ou apoio jurídico.",
  },
];

export const articles = [
  {
    category: "Regulação",
    title: "Como organizar evidências técnicas em uma restrição de conexão",
    summary:
      "Um roteiro de documentação, hipóteses e perguntas úteis para reduzir ruído em análises técnico-regulatórias.",
    readTime: "6 min",
  },
  {
    category: "Geração Distribuída",
    title: "O que revisar antes de reprojetar uma usina fotovoltaica",
    summary:
      "Pontos de atenção em strings, proteção, entrada de energia e premissas de exportação.",
    readTime: "7 min",
  },
  {
    category: "Engenharia Elétrica",
    title: "Aumento de carga: sinais de que o estudo precisa vir antes da obra",
    summary:
      "Critérios técnicos para evitar compras prematuras, retrabalho de infraestrutura e gargalos de operação.",
    readTime: "5 min",
  },
  {
    category: "Eletromobilidade",
    title: "Hubs de recarga rápida exigem mais que escolha de carregadores",
    summary:
      "Demanda, simultaneidade, rede, proteção e estratégia de fases em projetos de recarga veicular.",
    readTime: "8 min",
  },
  {
    category: "Inteligência Energética",
    title: "Dashboards energéticos úteis começam por dados confiáveis",
    summary:
      "Como padronizar faturas, medições e indicadores antes de automatizar relatórios.",
    readTime: "4 min",
  },
  {
    category: "Regulação",
    title: "Parecer técnico independente: quando ele ajuda a decisão executiva",
    summary:
      "Diferença entre promessa de aprovação e análise estruturada de risco, evidências e alternativas.",
    readTime: "6 min",
  },
];

export const stats = [
  { label: "Foco", value: "B2B" },
  { label: "Base", value: "Dados" },
  { label: "Risco", value: "Mapeado" },
  { label: "Entrega", value: "Técnica" },
];

export const contactChallenges = [
  "Restrição de Concessionária",
  "Projeto Fotovoltaico Complexo",
  "Subestação ou Média Tensão",
  "Aumento de Carga",
  "Gerador / Backup",
  "Hub de Recarga VE",
  "Análise de Fatura",
  "Outro",
];

export const technicalSignals = [
  { icon: Network, label: "Conexão", value: "Estratégia" },
  { icon: Gauge, label: "Demanda", value: "Modelagem" },
  { icon: ClipboardCheck, label: "Parecer", value: "Auditoria" },
  { icon: Cpu, label: "Dados", value: "Automação" },
  { icon: Building2, label: "Operação", value: "B2B" },
];
