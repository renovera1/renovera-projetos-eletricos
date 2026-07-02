export const siteConfig = {
  name: "Kairós Engenharia",
  legalName: "KAIRÓS ENGENHARIA",
  baseUrl: "https://renovera1.github.io/renovera-projetos-eletricos",
  repositoryUrl: "https://github.com/renovera1/renovera-projetos-eletricos",
  email: "contato@kairosengenharia.com.br",
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  whatsappMessage:
    "Olá, gostaria de falar com um engenheiro consultor da Kairós Engenharia.",
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || "",
};

export const routes = [
  {
    path: "/",
    label: "Início",
    title: "Kairós Engenharia | Engenharia, Regulação e Inteligência Energética",
    description:
      "Engenharia elétrica, conexão à rede, consultoria regulatória e inteligência energética para projetos complexos.",
  },
  {
    path: "/servicos/",
    label: "Serviços",
    title: "Serviços | Kairós Engenharia",
    description:
      "Projetos elétricos, consultoria regulatória, mobilidade elétrica e automação para decisões técnicas seguras.",
  },
  {
    path: "/a-kairos/",
    label: "A Kairós",
    title: "A Kairós | Engenharia baseada em dados",
    description:
      "Conheça o posicionamento, método e valores da Kairós Engenharia para projetos elétricos complexos.",
  },
  {
    path: "/cases/",
    label: "Cases",
    title: "Cases Técnicos | Kairós Engenharia",
    description:
      "Cenários técnicos anonimizados de conexão, eletromobilidade, aumento de carga, backup e pareceres de acesso.",
  },
  {
    path: "/conteudos/",
    label: "Conteúdos",
    title: "Conteúdos Técnicos | Kairós Engenharia",
    description:
      "Artigos-modelo sobre regulação, geração distribuída, engenharia elétrica, eletromobilidade e inteligência energética.",
  },
  {
    path: "/contato/",
    label: "Contato",
    title: "Contato | Kairós Engenharia",
    description:
      "Envie seu desafio técnico para uma avaliação inicial da Kairós Engenharia.",
  },
];
