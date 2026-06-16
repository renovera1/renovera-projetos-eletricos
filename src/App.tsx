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
const logoSrc = `${import.meta.env.BASE_URL}logo-renovera.png`;

const baseMessage =
  "OlÃƒÂ¡, Renovera. Gostaria de receber uma anÃƒÂ¡lise tÃƒÂ©cnica para projeto elÃƒÂ©trico, subestaÃƒÂ§ÃƒÂ£o, estudo elÃƒÂ©trico ou linha de transmissÃƒÂ£o.";

const whatsappLink = buildWhatsappUrl(baseMessage);
const universalWhatsappLink = buildWhatsappUrl(
  "OlÃƒÂ¡, Renovera. Gostaria de receber uma anÃƒÂ¡lise tÃƒÂ©cnica pelo WhatsApp."
);

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.7l-.4-.2-3.9.9.9-3.8-.2-.4a10.2 10.2 0 1 1 9.2 5.2Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.4 8.4 0 0 1-2.5-1.6 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.2-.2-.4-.3-.7-.5Z" />
    </svg>
  );
}

const concessionarias = ["CPFL", "Neoenergia Elektro", "Energisa", "Cemig", "EDP", "Outra"];
const aclOptions = ["Sim", "NÃƒÂ£o", "Avaliar Viabilidade"];

const services = [
  {
    icon: Factory,
    title: "Projetos ElÃƒÂ©tricos Industriais",
    description:
      "Projetos bÃƒÂ¡sicos e executivos para instalaÃƒÂ§ÃƒÂµes industriais, contemplando subestaÃƒÂ§ÃƒÂ£o abaixadora, iluminaÃƒÂ§ÃƒÂ£o, aterramento, SPDA, alimentaÃƒÂ§ÃƒÂ£o de forÃƒÂ§a, diagramas de painÃƒÂ©is, controle, comando e automaÃƒÂ§ÃƒÂ£o industrial.",
    cta: "Planejar projeto industrial"
  },
  {
    icon: Building2,
    title: "Projetos ElÃƒÂ©tricos Comerciais",
    description:
      "Projetos bÃƒÂ¡sicos e executivos para empreendimentos comerciais, incluindo subestaÃƒÂ§ÃƒÂ£o abaixadora, iluminaÃƒÂ§ÃƒÂ£o, aterramento, SPDA, alimentaÃƒÂ§ÃƒÂ£o de forÃƒÂ§a e diagramas de painÃƒÂ©is.",
    cta: "Planejar projeto comercial"
  },
  {
    icon: RadioTower,
    title: "SubestaÃƒÂ§ÃƒÂµes de Energia",
    description:
      "Projetos bÃƒÂ¡sicos e executivos de subestaÃƒÂ§ÃƒÂµes de energia, incluindo projeto eletromecÃƒÂ¢nico, projeto elÃƒÂ©trico, SPCS e apoio tÃƒÂ©cnico como engenharia do proprietÃƒÂ¡rio, anÃƒÂ¡lise de projetos e fiscalizaÃƒÂ§ÃƒÂ£o de obras.",
    cta: "Validar subestaÃƒÂ§ÃƒÂ£o"
  },
  {
    icon: ShieldCheck,
    title: "Estudos ElÃƒÂ©tricos",
    description:
      "Estudos tÃƒÂ©cnicos para anÃƒÂ¡lise e seguranÃƒÂ§a do sistema elÃƒÂ©trico, incluindo estudo de curto-circuito, coordenaÃƒÂ§ÃƒÂ£o e seletividade, ATPV, energia incidente, arc-flash e campo eletromagnÃƒÂ©tico.",
    cta: "Solicitar estudo elÃƒÂ©trico"
  },
  {
    icon: Network,
    title: "Linhas de TransmissÃƒÂ£o",
    description:
      "Projetos bÃƒÂ¡sicos e executivos de linhas de transmissÃƒÂ£o, contemplando projeto eletromecÃƒÂ¢nico e apoio tÃƒÂ©cnico como engenharia do proprietÃƒÂ¡rio, anÃƒÂ¡lise de projetos e fiscalizaÃƒÂ§ÃƒÂ£o de obras.",
    cta: "Analisar linha de transmissÃƒÂ£o"
  },
  {
    icon: FileCheck2,
    title: "Linhas de TransmissÃƒÂ£o SubterrÃƒÂ¢nea",
    description:
      "Projetos bÃƒÂ¡sicos e executivos de linhas de transmissÃƒÂ£o subterrÃƒÂ¢nea, com apoio tÃƒÂ©cnico para engenharia do proprietÃƒÂ¡rio, anÃƒÂ¡lise de projetos e fiscalizaÃƒÂ§ÃƒÂ£o de obras.",
    cta: "Avaliar linha subterrÃƒÂ¢nea"
  }
];

const sectors = [
  {
    icon: Building2,
    title: "CondomÃƒÂ­nios Industriais e LogÃƒÂ­sticos",
    description: "Redes de distribuiÃƒÂ§ÃƒÂ£o, expansÃƒÂ£o elÃƒÂ©trica e alta demanda de potÃƒÂªncia."
  },
  {
    icon: Factory,
    title: "Plantas Fabris e IndÃƒÂºstrias do Grupo A",
    description: "SubestaÃƒÂ§ÃƒÂµes, proteÃƒÂ§ÃƒÂ£o, seletividade e enquadramento no ACL."
  },
  {
    icon: Gauge,
    title: "Shoppings, Grandes ComÃƒÂ©rcios e Hipermercados",
    description: "Entradas de energia de mÃƒÂ©dia tensÃƒÂ£o, cabines primÃƒÂ¡rias e aumento de demanda."
  },
  {
    icon: HardHat,
    title: "Construtoras e Incorporadoras",
    description: "Infraestrutura elÃƒÂ©trica desde a fase greenfield atÃƒÂ© a energizaÃƒÂ§ÃƒÂ£o."
  }
];

const process = [
  {
    step: "01",
    title: "DiagnÃƒÂ³stico tÃƒÂ©cnico",
    description: "Levantamento da demanda, tensÃƒÂ£o de atendimento, padrÃƒÂ£o existente e objetivo do empreendimento."
  },
  {
    step: "02",
    title: "EstratÃƒÂ©gia de aprovaÃƒÂ§ÃƒÂ£o",
    description: "DefiniÃƒÂ§ÃƒÂ£o do caminho tÃƒÂ©cnico-regulatÃƒÂ³rio mais seguro para reduzir exigÃƒÂªncias, retrabalho e atrasos."
  },
  {
    step: "03",
    title: "Projeto e documentaÃƒÂ§ÃƒÂ£o",
    description: "ElaboraÃƒÂ§ÃƒÂ£o de desenhos, memorial, estudos de proteÃƒÂ§ÃƒÂ£o e documentos tÃƒÂ©cnicos para protocolo."
  },
  {
    step: "04",
    title: "Interface com concessionÃƒÂ¡ria",
    description: "Acompanhamento tÃƒÂ©cnico das exigÃƒÂªncias, respostas e adequaÃƒÂ§ÃƒÂµes atÃƒÂ© a aprovaÃƒÂ§ÃƒÂ£o."
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
        title: "Informe a demanda para gerar uma leitura tÃƒÂ©cnica preliminar."
      };
    }

    if (Number.isNaN(parsedDemand) || parsedDemand <= 0) {
      return {
        label: "Dado invÃƒÂ¡lido",
        title: "Informe uma demanda vÃƒÂ¡lida em kW para continuar."
      };
    }

    if (parsedDemand >= 500) {
      return {
        label: "Alta complexidade",
        title:
          "Demanda com perfil crÃƒÂ­tico. RecomendÃƒÂ¡vel anÃƒÂ¡lise de subestaÃƒÂ§ÃƒÂ£o, proteÃƒÂ§ÃƒÂ£o, padrÃƒÂ£o de entrada, demanda contratada e estratÃƒÂ©gia de aprovaÃƒÂ§ÃƒÂ£o."
      };
    }

    if (parsedDemand >= 75) {
      return {
        label: "MÃƒÂ©dia tensÃƒÂ£o provÃƒÂ¡vel",
        title:
          "Projeto com potencial necessidade de adequaÃƒÂ§ÃƒÂ£o em mÃƒÂ©dia tensÃƒÂ£o, validaÃƒÂ§ÃƒÂ£o de padrÃƒÂ£o de entrada e interface tÃƒÂ©cnica com a concessionÃƒÂ¡ria."
      };
    }

    return {
      label: "PrÃƒÂ©-anÃƒÂ¡lise elegÃƒÂ­vel",
      title:
        "Projeto elegÃƒÂ­vel para diagnÃƒÂ³stico inicial. A anÃƒÂ¡lise deve confirmar tensÃƒÂ£o de atendimento, padrÃƒÂ£o de entrada e exigÃƒÂªncias locais."
    };
  }, [demand, parsedDemand]);

  return (
    <div className="page">
      <header className="site-header">
        <div className="container nav">
          <a href="#inicio" className="brand" aria-label="Renovera">
            <img src={logoSrc} alt="Renovera" />
          </a>

          <nav className="nav-links" aria-label="NavegaÃƒÂ§ÃƒÂ£o principal">
            <a href="#solucoes">SoluÃƒÂ§ÃƒÂµes</a>
            <a href="#viabilidade">Viabilidade</a>
            <a href="#metodo">MÃƒÂ©todo</a>
          </nav>

          <button className="nav-cta" onClick={() => setModalOpen(true)}>
            Solicitar anÃƒÂ¡lise
          </button>
        </div>
      </header>

      <main>
        <section className="hero engenharia-hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="pill pill-dark">Renovera Engenharia | Projetos ElÃƒÂ©tricos</span>
              <h1>Projeto elÃƒÂ©trico aprovado com mÃƒÂ©todo e autoridade tÃƒÂ©cnica.</h1>
              <p>
                Projetos de baixa, mÃƒÂ©dia e alta tensÃƒÂ£o, subestaÃƒÂ§ÃƒÂµes, estudos de proteÃƒÂ§ÃƒÂ£o,
                padrÃƒÂµes de entrada e viabilidade para consumidores do Grupo A que
                precisam aprovar infraestrutura.
              </p>

              <div className="hero-actions">
                <button className="btn btn-secondary" onClick={() => setModalOpen(true)}>
                  Quero destravar minha aprovaÃƒÂ§ÃƒÂ£o
                  <ArrowRight size={18} />
                </button>
                <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                  Falar com engenheiro
                  <Phone size={18} />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="engineering-card">
                <div className="engineering-top">
                  <span>Renovera GridDesk</span>
                  <strong>Em anÃƒÂ¡lise</strong>
                </div>

                <div className="substation-diagram">
                  <div className="node node-a">MT</div>
                  <div className="node node-b">SE</div>
                  <div className="node node-c">RELÃƒâ€°</div>
                  <div className="node node-d">CARGA</div>
                  <span className="line line-1" />
                  <span className="line line-2" />
                  <span className="line line-3" />
                </div>

                <div className="engineering-main">
                  <span>DiagnÃƒÂ³stico preliminar</span>
                  <strong>Entrada de energia + proteÃƒÂ§ÃƒÂ£o</strong>
                  <p>
                    AnÃƒÂ¡lise de demanda, concessionÃƒÂ¡ria, padrÃƒÂ£o de entrada,
                    seletividade e estratÃƒÂ©gia de aprovaÃƒÂ§ÃƒÂ£o.
                  </p>
                </div>

                <div className="engineering-list">
                  <div>
                    <span>Memorial tÃƒÂ©cnico</span>
                    <strong>Executivo</strong>
                  </div>
                  <div>
                    <span>Interface</span>
                    <strong>ConcessionÃƒÂ¡ria</strong>
                  </div>
                  <div>
                    <span>CritÃƒÂ©rio</span>
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
              ["AprovaÃƒÂ§ÃƒÂ£o tÃƒÂ©cnica", "DocumentaÃƒÂ§ÃƒÂ£o preparada para reduzir exigÃƒÂªncias e retrabalho."],
              ["ConcessionÃƒÂ¡rias", "Interface tÃƒÂ©cnica com CPFL, Neoenergia, Energisa, Cemig, EDP e outras."],
              ["OperaÃƒÂ§ÃƒÂ£o crÃƒÂ­tica", "Projeto pensado para continuidade, seguranÃƒÂ§a e expansÃƒÂ£o futura."]
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
              <span className="pill">SoluÃƒÂ§ÃƒÂµes tÃƒÂ©cnicas</span>
              <h2>Escopo tÃƒÂ©cnico para quem precisa aprovar certo.</h2>
            </div>

            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-card" key={service.title}>
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
              <span className="pill">DiagnÃƒÂ³stico tÃƒÂ©cnico</span>
              <h2>Descubra se sua infraestrutura estÃƒÂ¡ pronta para aprovaÃƒÂ§ÃƒÂ£o.</h2>
              <p>
                Um prÃƒÂ©-check tÃƒÂ©cnico para captar leads qualificados e transformar
                interesse em conversa comercial com dados mÃƒÂ­nimos do projeto.
              </p>
            </div>

            <div className="checker-card">
              <div className="checker-form">
                <label>
                  <span>1. Selecione a concessionÃƒÂ¡ria local</span>
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
                  <span className="field-title">3. O projeto envolve migraÃƒÂ§ÃƒÂ£o para o Mercado Livre?</span>
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

                <button className="btn btn-secondary full" onClick={() => setModalOpen(true)}>
                  Receber diagnÃƒÂ³stico tÃƒÂ©cnico preliminar
                  <ArrowRight size={18} />
                </button>
              </div>

              <aside className="checker-result">
                <span>PrÃƒÂ©-leitura tÃƒÂ©cnica</span>
                <DataBox label="ConcessionÃƒÂ¡ria" value={utility} />
                <DataBox label="Demanda" value={`${demand || "--"} kW`} />
                <DataBox label="ACL" value={acl} />
                <div className="result-box">
                  <strong>{viability.label}</strong>
                  <p>{viability.title}</p>
                </div>
                <button className="btn btn-outline full" onClick={() => setModalOpen(true)}>
                  Solicitar validaÃƒÂ§ÃƒÂ£o completa
                  <Sparkles size={18} />
                </button>
              </aside>
            </div>
          </div>
        </section>

        <section className="section soft-section">
          <div className="container split-grid">
            <div className="section-head compact">
              <span className="pill">Clientes corporativos</span>
              <h2>Para operaÃƒÂ§ÃƒÂµes onde energia ÃƒÂ© infraestrutura estratÃƒÂ©gica.</h2>
              <p>
                Ideal para empresas com alta demanda, expansÃƒÂ£o de planta, novas
                entradas de energia, adequaÃƒÂ§ÃƒÂµes de subestaÃƒÂ§ÃƒÂ£o ou avaliaÃƒÂ§ÃƒÂ£o de ACL.
              </p>
              <button className="btn btn-secondary dark-text" onClick={() => setModalOpen(true)}>
                Quero uma leitura tÃƒÂ©cnica do meu caso
                <Target size={18} />
              </button>
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
              <span className="pill">MÃƒÂ©todo Renovera</span>
              <h2>Da dÃƒÂºvida tÃƒÂ©cnica atÃƒÂ© o protocolo aprovado.</h2>
              <p>
                A estrutura segue a mesma lÃƒÂ³gica das landing pages anteriores:
                autoridade no topo, prova tÃƒÂ©cnica no meio e CTA forte em todas as etapas.
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
            <span className="pill pill-dark">AprovaÃƒÂ§ÃƒÂ£o com rigor tÃƒÂ©cnico</span>
            <h2>Evite reprovaÃƒÂ§ÃƒÂµes, exigÃƒÂªncias sucessivas e atrasos na entrada de operaÃƒÂ§ÃƒÂ£o.</h2>
            <p>
              Antes de protocolar ou investir em adequaÃƒÂ§ÃƒÂµes, fale com quem entende
              de projeto, proteÃƒÂ§ÃƒÂ£o, concessionÃƒÂ¡ria e regulaÃƒÂ§ÃƒÂ£o.
            </p>
            <div className="final-actions">
              <button className="btn btn-secondary" onClick={() => setModalOpen(true)}>
                Quero aprovar minha infraestrutura
                <Workflow size={18} />
              </button>
              <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                Chamar no WhatsApp tÃƒÂ©cnico
                <Phone size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logoSrc} alt="Renovera" />
            <p>Engenharia, projetos elÃƒÂ©tricos e consultoria tÃƒÂ©cnica para empresas que precisam aprovar infraestrutura com seguranÃƒÂ§a e precisÃƒÂ£o.</p>
          </div>

          <div className="footer-col">
            <h4>Menu</h4>
            <a href="#solucoes">SoluÃ§Ãµes</a>
            <a href="#viabilidade">Viabilidade</a>
            <a href="#metodo">MÃ©todo</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <p>R. Visc. de Rio Branco, 106</p>
            <p>SÃ£o JoÃ£o da Boa Vista - SP</p>
            <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp tÃ©cnico</a>
          </div>

          <div className="footer-col">
            <h4>Escopo tÃ©cnico</h4>
            <p>Projetos elÃ©tricos, subestaÃ§Ãµes, proteÃ§Ã£o, entrada de energia, concessionÃ¡rias e ACL.</p>
          </div>

        </div>
        <div className="container footer-bottom">
          <span>Ã‚Â© {new Date().getFullYear()} Renovera Energias RenovÃƒÂ¡veis Ltda. Todos os direitos reservados.</span>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Falar com a Renovera">
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
      "OlÃƒÂ¡, quero solicitar um diagnÃƒÂ³stico tÃƒÂ©cnico com a Renovera.",
      "",
      `Empresa: ${form.empresa}`,
      `E-mail: ${form.email}`,
      `CNPJ: ${form.cnpj}`,
      `Telefone: ${form.telefone}`,
      `ConcessionÃƒÂ¡ria: ${utility}`,
      `Demanda: ${demand || "--"} kW`,
      `ACL: ${acl}`
    ].join("\n");

    window.open(buildWhatsappUrl(message), "_blank", "noreferrer");
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="lead-modal">
        <div className="modal-head">
          <div>
            <span className="pill small">AnÃƒÂ¡lise tÃƒÂ©cnica Renovera</span>
            <h3>Solicitar diagnÃƒÂ³stico de viabilidade</h3>
            <p>
              Envie os dados corporativos para uma primeira leitura tÃƒÂ©cnica da
              demanda, concessionÃƒÂ¡ria, entrada de energia e escopo regulatÃƒÂ³rio.
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
            <MiniSummary icon={MapPin} label="ConcessionÃƒÂ¡ria" value={utility} />
            <MiniSummary icon={Gauge} label="Demanda" value={`${demand || "--"} kW`} />
            <MiniSummary icon={Landmark} label="ACL" value={acl} />
          </div>

          <button className="btn btn-secondary full" type="submit">
            Enviar e chamar a Renovera no WhatsApp
            <ArrowRight size={18} />
          </button>

          <p className="form-note">
            <Mail size={16} /> O botÃƒÂ£o abre o WhatsApp com os dados preenchidos.
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
