import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Factory,
  FileCheck2,
  Gauge,
  HardHat,
  Landmark,
  Mail,
  MapPin,
  Network,
  Phone,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X
} from "lucide-react";
import LiveEditor from "./LiveEditor";

const WHATSAPP_NUMBER = "5519996514827";
const buildWhatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const baseMessage = "Olá, Renovera. Preciso de apoio em um projeto elétrico e gostaria de validar o escopo técnico com a engenharia. O projeto envolve [entrada de energia / cabine primária / rede interna / aumento de demanda / estudo de proteção].";

const whatsappLink = buildWhatsappUrl(baseMessage);
const floatingWhatsappLink = buildWhatsappUrl("Olá, Renovera. Gostaria de receber uma análise técnica pelo WhatsApp.");
const logoSrc = `${import.meta.env.BASE_URL}logo-renovera.png`;
const ecosystemLinks = [
  ["Consultoria Regulatória", "https://renovera1.github.io/renovera-consultoria-regulatoria/"],
  ["Projetos Elétricos", "https://renovera1.github.io/renovera-projetos-eletricos/"],
  ["Energia Solar", "https://renovera1.github.io/renovera-energia-solar/"],
  ["Eletropostos", "https://renovera1.github.io/renovera-eletroposto/"],
] as const;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.7l-.4-.2-3.9.9.9-3.8-.2-.4a10.2 10.2 0 1 1 9.2 5.2Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.4 8.4 0 0 1-2.5-1.6 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.2-.2-.4-.3-.7-.5Z" />
    </svg>
  );
}

const concessionarias = ["CPFL", "Neoenergia Elektro", "Energisa", "Cemig", "EDP", "Outra"];
const aclOptions = ["Sim", "NÃ£o", "Avaliar Viabilidade"];

const services = [
  {
    icon: RadioTower,
    title: "Projetos de SubestaÃ§Ãµes de Energia",
    description:
      "Dimensionamento, especificaÃ§Ã£o e detalhamento executivo de subestaÃ§Ãµes abrigadas, aÃ©reas, em poste blindado ou em alvenaria, incluindo cabines primÃ¡rias e retrofit de subestaÃ§Ãµes antigas.",
    cta: "Validar subestaÃ§Ã£o"
  },
  {
    icon: Network,
    title: "Projetos de Linhas de DistribuiÃ§Ã£o e Redes de MÃ©dia TensÃ£o",
    description:
      "Redes internas de distribuiÃ§Ã£o para condomÃ­nios industriais, logÃ­sticos e comerciais, com expansÃ£o estruturada e critÃ©rios tÃ©cnicos de continuidade operacional.",
    cta: "Analisar rede interna"
  },
  {
    icon: ShieldCheck,
    title: "Estudos de CoordenaÃ§Ã£o e Seletividade de ProteÃ§Ã£o",
    description:
      "ParametrizaÃ§Ã£o e ajuste de relÃ©s para garantir que, em caso de falha, apenas o disjuntor mais prÃ³ximo isole o defeito, evitando o desligamento de uma planta inteira.",
    cta: "Solicitar estudo de proteÃ§Ã£o"
  },
  {
    icon: FileCheck2,
    title: "Projetos de Entrada de Energia em Alta/MÃ©dia TensÃ£o",
    description:
      "Desenho tÃ©cnico, memorial descritivo e documentaÃ§Ã£o para aprovaÃ§Ã£o de novos padrÃµes de entrada junto a concessionÃ¡rias.",
    cta: "Aprovar entrada de energia"
  },
  {
    icon: Landmark,
    title: "MigraÃ§Ã£o e GestÃ£o no Mercado Livre de Energia (ACL)",
    description:
      "Estudos de viabilidade tÃ©cnica e regulatÃ³ria para consumidores do Grupo A migrarem para o Ambiente de ContrataÃ§Ã£o Livre.",
    cta: "Avaliar ACL"
  }
];

const sectors = [
  {
    icon: Building2,
    title: "CondomÃ­nios Industriais e LogÃ­sticos",
    description: "Redes de distribuiÃ§Ã£o, expansÃ£o elÃ©trica e alta demanda de potÃªncia."
  },
  {
    icon: Factory,
    title: "Plantas Fabris e IndÃºstrias do Grupo A",
    description: "SubestaÃ§Ãµes, proteÃ§Ã£o, seletividade e enquadramento no ACL."
  },
  {
    icon: Gauge,
    title: "Shoppings, Grandes ComÃ©rcios e Hipermercados",
    description: "Entradas de energia de mÃ©dia tensÃ£o, cabines primÃ¡rias e aumento de demanda."
  },
  {
    icon: HardHat,
    title: "Construtoras e Incorporadoras",
    description: "Infraestrutura elÃ©trica desde a fase greenfield atÃ© a energizaÃ§Ã£o."
  }
];

const process = [
  {
    step: "01",
    title: "DiagnÃ³stico tÃ©cnico",
    description: "Levantamento da demanda, tensÃ£o de atendimento, padrÃ£o existente e objetivo do empreendimento."
  },
  {
    step: "02",
    title: "EstratÃ©gia de aprovaÃ§Ã£o",
    description: "DefiniÃ§Ã£o do caminho tÃ©cnico-regulatÃ³rio mais seguro para reduzir exigÃªncias, retrabalho e atrasos."
  },
  {
    step: "03",
    title: "Projeto e documentaÃ§Ã£o",
    description: "ElaboraÃ§Ã£o de desenhos, memorial, estudos de proteÃ§Ã£o e documentos tÃ©cnicos para protocolo."
  },
  {
    step: "04",
    title: "Interface com concessionÃ¡ria",
    description: "Acompanhamento tÃ©cnico das exigÃªncias, respostas e adequaÃ§Ãµes atÃ© a aprovaÃ§Ã£o."
  }
];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [utility, setUtility] = useState("CPFL");
  const [demand, setDemand] = useState("");
  const [acl, setAcl] = useState("Avaliar Viabilidade");

  const parsedDemand = Number(String(demand).replace(",", "."));

  const viability = useMemo(() => {
    if (!demand) {
      return {
        label: "Aguardando dados",
        title: "Informe a demanda para gerar uma leitura tÃ©cnica preliminar."
      };
    }

    if (Number.isNaN(parsedDemand) || parsedDemand <= 0) {
      return {
        label: "Dado invÃ¡lido",
        title: "Informe uma demanda vÃ¡lida em kW para continuar."
      };
    }

    if (parsedDemand >= 500) {
      return {
        label: "Alta complexidade",
        title:
          "Demanda com perfil crÃ­tico. RecomendÃ¡vel anÃ¡lise de subestaÃ§Ã£o, proteÃ§Ã£o, padrÃ£o de entrada, demanda contratada e estratÃ©gia de aprovaÃ§Ã£o."
      };
    }

    if (parsedDemand >= 75) {
      return {
        label: "MÃ©dia tensÃ£o provÃ¡vel",
        title:
          "Projeto com potencial necessidade de adequaÃ§Ã£o em mÃ©dia tensÃ£o, validaÃ§Ã£o de padrÃ£o de entrada e interface tÃ©cnica com a concessionÃ¡ria."
      };
    }

    return {
      label: "PrÃ©-anÃ¡lise elegÃ­vel",
      title:
        "Projeto elegÃ­vel para diagnÃ³stico inicial. A anÃ¡lise deve confirmar tensÃ£o de atendimento, padrÃ£o de entrada e exigÃªncias locais."
    };
  }, [demand, parsedDemand]);

  return (
    <div className="page">
      <header className="site-header">
        <div className="container nav">
          <a href="#inicio" className="brand" aria-label="Renovera">
            <img src={logoSrc} alt="Renovera" />
          </a>

          <nav className="nav-links" aria-label="NavegaÃ§Ã£o principal">
            <a href="#solucoes">SoluÃ§Ãµes</a>
            <a href="#viabilidade">Viabilidade</a>
            <a href="#metodo">MÃ©todo</a>
          </nav>

          <a className="nav-cta" href={whatsappLink} target="_blank" rel="noreferrer">
            Validar meu projeto elétrico
          </a>
        </div>
      </header>

      <main>
        <section className="hero engenharia-hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="pill pill-dark">Renovera Engenharia | Projetos ElÃ©tricos</span>
              <h1>Projeto elÃ©trico aprovado com mÃ©todo e autoridade tÃ©cnica.</h1>
              <p>
                Projetos de baixa, mÃ©dia e alta tensÃ£o, subestaÃ§Ãµes, estudos de proteÃ§Ã£o,
                padrÃµes de entrada e viabilidade para consumidores do Grupo A que
                precisam aprovar infraestrutura.
              </p>

              <div className="hero-actions">
                <a className="btn btn-secondary" href={whatsappLink} target="_blank" rel="noreferrer">
                  Validar meu projeto elétrico
                  <ArrowRight size={18} />
                </a>
                <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                  Falar com a engenharia
                  <Phone size={18} />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="engineering-card">
                <div className="engineering-top">
                  <span>Renovera GridDesk</span>
                  <strong>Em anÃ¡lise</strong>
                </div>

                <div className="substation-diagram">
                  <div className="node node-a">MT</div>
                  <div className="node node-b">SE</div>
                  <div className="node node-c">RELÃ‰</div>
                  <div className="node node-d">CARGA</div>
                  <span className="line line-1" />
                  <span className="line line-2" />
                  <span className="line line-3" />
                </div>

                <div className="engineering-main">
                  <span>DiagnÃ³stico preliminar</span>
                  <strong>Entrada de energia + proteÃ§Ã£o</strong>
                  <p>
                    AnÃ¡lise de demanda, concessionÃ¡ria, padrÃ£o de entrada,
                    seletividade e estratÃ©gia de aprovaÃ§Ã£o.
                  </p>
                </div>

                <div className="engineering-list">
                  <div>
                    <span>Memorial tÃ©cnico</span>
                    <strong>Executivo</strong>
                  </div>
                  <div>
                    <span>Interface</span>
                    <strong>ConcessionÃ¡ria</strong>
                  </div>
                  <div>
                    <span>CritÃ©rio</span>
                    <strong>Seletividade</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            {[
              ["AprovaÃ§Ã£o tÃ©cnica", "DocumentaÃ§Ã£o preparada para reduzir exigÃªncias e retrabalho."],
              ["ConcessionÃ¡rias", "Interface tÃ©cnica com CPFL, Neoenergia, Energisa, Cemig, EDP e outras."],
              ["OperaÃ§Ã£o crÃ­tica", "Projeto pensado para continuidade, seguranÃ§a e expansÃ£o futura."]
            ].map(([title, description]) => (
              <div className="trust-item" key={title}>
                <BadgeCheck size={22} />
                <div>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="solucoes">
          <div className="container">
            <div className="section-head center">
              <span className="pill">SoluÃ§Ãµes tÃ©cnicas</span>
              <h2>Escopo tÃ©cnico para quem precisa aprovar certo.</h2>
            </div>

            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className={`service-card ${index === 4 ? "wide" : ""}`} key={service.title}>
                    <div className="icon-box">
                      <Icon size={26} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button onClick={() => setModalOpen(true)}>
                      {service.cta}
                      <ChevronRight size={17} />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section viability" id="viabilidade">
          <div className="container">
            <div className="section-head center">
              <span className="pill">DiagnÃ³stico tÃ©cnico</span>
              <h2>Descubra se sua infraestrutura estÃ¡ pronta para aprovaÃ§Ã£o.</h2>
              <p>
                Um prÃ©-check tÃ©cnico para captar leads qualificados e transformar
                interesse em conversa comercial com dados mÃ­nimos do projeto.
              </p>
            </div>

            <div className="checker-card">
              <div className="checker-form">
                <label>
                  <span>1. Selecione a concessionÃ¡ria local</span>
                  <select value={utility} onChange={(event) => setUtility(event.target.value)}>
                    {concessionarias.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>2. Demanda contratada ou pretendida em kW</span>
                  <input
                    value={demand}
                    onChange={(event) => setDemand(event.target.value)}
                    placeholder="Ex.: 500"
                    inputMode="decimal"
                  />
                </label>

                <div>
                  <span className="field-title">3. O projeto envolve migraÃ§Ã£o para o Mercado Livre?</span>
                  <div className="radio-grid">
                    {aclOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAcl(option)}
                        className={acl === option ? "active" : ""}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <a className="btn btn-secondary full" href={whatsappLink} target="_blank" rel="noreferrer">
                  Validar meu projeto elétrico
                  <ArrowRight size={18} />
                </a>
              </div>

              <aside className="checker-result">
                <span>PrÃ©-leitura tÃ©cnica</span>
                <DataBox label="ConcessionÃ¡ria" value={utility} />
                <DataBox label="Demanda" value={`${demand || "--"} kW`} />
                <DataBox label="ACL" value={acl} />
                <div className="result-box">
                  <strong>{viability.label}</strong>
                  <p>{viability.title}</p>
                </div>
                <a className="btn btn-outline full" href={whatsappLink} target="_blank" rel="noreferrer">
                  Falar com a engenharia
                  <Sparkles size={18} />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="section soft-section">
          <div className="container split-grid">
            <div className="section-head compact">
              <span className="pill">Clientes corporativos</span>
              <h2>Para operaÃ§Ãµes onde energia Ã© infraestrutura estratÃ©gica.</h2>
              <p>
                Ideal para empresas com alta demanda, expansÃ£o de planta, novas
                entradas de energia, adequaÃ§Ãµes de subestaÃ§Ã£o ou avaliaÃ§Ã£o de ACL.
              </p>
              <a className="btn btn-secondary dark-text" href={whatsappLink} target="_blank" rel="noreferrer">
                Falar com especialista
                <Target size={18} />
              </a>
            </div>

            <div className="sector-grid">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div className="sector-card" key={sector.title}>
                    <Icon size={28} />
                    <h3>{sector.title}</h3>
                    <p>{sector.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="metodo">
          <div className="container">
            <div className="section-head center">
              <span className="pill">MÃ©todo Renovera</span>
              <h2>Da dÃºvida tÃ©cnica atÃ© o protocolo aprovado.</h2>
              <p>
                A estrutura segue a mesma lÃ³gica das landing pages anteriores:
                autoridade no topo, prova tÃ©cnica no meio e CTA forte em todas as etapas.
              </p>
            </div>

            <div className="process-grid">
              {process.map((item) => (
                <div className="process-card" key={item.step}>
                  <strong>{item.step}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-card">
            <span className="pill pill-dark">Engenharia consultiva Renovera</span>
            <h2>Seu projeto precisa nascer pronto para aprovação.</h2>
            <p>Fale com a engenharia da Renovera e valide o melhor caminho técnico antes de protocolar na concessionária.</p>
            <small className="finalMicrocopy">Conte para nossa engenharia qual é a carga, tensão, concessionária e objetivo do projeto.</small>
            <div className="final-actions">
              <a className="btn btn-secondary" href={whatsappLink} target="_blank" rel="noreferrer">
                Validar meu projeto elétrico
                <Workflow size={18} />
              </a>
              <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                Falar com a engenharia
                <Phone size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-grid footer-grid-three">
          <div className="footer-brand footer-panel">
            <img src={logoSrc} alt="Renovera" />
            <p>Engenharia, projetos elétricos e consultoria técnica para empresas que precisam aprovar infraestrutura com segurança e precisão.</p>
          </div>

          <div className="footer-col footer-panel">
            <h4><span className="footer-icon">L</span> ENDEREÇO</h4>
            <p>Rua Visconde do Rio Branco, n.106,</p>
            <p>Centro, São João da Boa Vista - SP,</p>
            <p>CEP: 13870-180</p>
          </div>

          <div className="footer-col footer-panel">
            <h4><span className="footer-icon">C</span> CONTATO</h4>
            <a href="https://wa.me/5519996514827" target="_blank" rel="noreferrer">+55 (19) 99651-4827</a>
            <a href="tel:+551931950160">+55 (19) 3195-0160</a>
            <a href="mailto:contato@renovera.com.br">contato@renovera.com.br</a>
          </div>
        </div>

        <div className="container ecosystem-links">
          {ecosystemLinks.map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noreferrer">{label}</a>
          ))}
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Renovera Energias Renováveis Ltda. Todos os direitos reservados.</span>
        </div>
      </footer>

      <a className="floating-whatsapp" href={floatingWhatsappLink} target="_blank" rel="noreferrer" aria-label="Receber análise pelo WhatsApp">
        <WhatsAppIcon />
      </a>
      <LiveEditor namespace="renovera-projetos-eletricos-consultoria" />

      {modalOpen && (
        <LeadModal
          utility={utility}
          demand={demand}
          acl={acl}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function DataBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="data-box">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function LeadModal({
  utility,
  demand,
  acl,
  onClose
}: {
  utility: string;
  demand: string;
  acl: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    empresa: "",
    email: "",
    cnpj: "",
    telefone: ""
  });

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "OlÃ¡, quero solicitar um diagnÃ³stico tÃ©cnico com a Renovera.",
      "",
      `Empresa: ${form.empresa}`,
      `E-mail: ${form.email}`,
      `CNPJ: ${form.cnpj}`,
      `Telefone: ${form.telefone}`,
      `ConcessionÃ¡ria: ${utility}`,
      `Demanda: ${demand || "--"} kW`,
      `ACL: ${acl}`
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="lead-modal">
        <div className="modal-head">
          <div>
            <span className="pill small">AnÃ¡lise tÃ©cnica Renovera</span>
            <h3>Solicitar diagnÃ³stico de viabilidade</h3>
            <p>
              Envie os dados corporativos para uma primeira leitura tÃ©cnica da
              demanda, concessionÃ¡ria, entrada de energia e escopo regulatÃ³rio.
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <X size={22} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            <span>Empresa</span>
            <input required value={form.empresa} onChange={(event) => updateForm("empresa", event.target.value)} placeholder="Nome da empresa" />
          </label>
          <label>
            <span>E-mail corporativo</span>
            <input required type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} placeholder="engenharia@empresa.com.br" />
          </label>
          <label>
            <span>CNPJ</span>
            <input required value={form.cnpj} onChange={(event) => updateForm("cnpj", event.target.value)} placeholder="00.000.000/0000-00" />
          </label>
          <label>
            <span>Telefone de contato</span>
            <input required value={form.telefone} onChange={(event) => updateForm("telefone", event.target.value)} placeholder="(00) 00000-0000" />
          </label>

          <div className="modal-summary">
            <MiniSummary icon={MapPin} label="ConcessionÃ¡ria" value={utility} />
            <MiniSummary icon={Gauge} label="Demanda" value={`${demand || "--"} kW`} />
            <MiniSummary icon={Landmark} label="ACL" value={acl} />
          </div>

          <button className="btn btn-secondary full" type="submit">
            Enviar e chamar a Renovera no WhatsApp
            <ArrowRight size={18} />
          </button>

          <p className="form-note">
            <Mail size={16} /> O botÃ£o abre o WhatsApp com os dados preenchidos.
          </p>
        </form>
      </div>
    </div>
  );
}

function MiniSummary({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="mini-summary">
      <Icon size={17} />
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

export default App;

