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
  "Olá, Renovera. Gostaria de receber uma análise técnica para projeto elétrico, subestação, estudo elétrico ou linha de transmissão.";

const whatsappLink = buildWhatsappUrl(baseMessage);
const universalWhatsappLink = buildWhatsappUrl(
  "Olá, Renovera. Gostaria de receber uma análise técnica pelo WhatsApp."
);

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.7l-.4-.2-3.9.9.9-3.8-.2-.4a10.2 10.2 0 1 1 9.2 5.2Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.4 8.4 0 0 1-2.5-1.6 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.2-.2-.4-.3-.7-.5Z" />
    </svg>
  );
}

const concessionarias = ["CPFL", "Neoenergia Elektro", "Energisa", "Cemig", "EDP", "Outra"];
const aclOptions = ["Sim", "Não", "Avaliar Viabilidade"];

const services = [
  {
    icon: Factory,
    title: "Projetos Elétricos Industriais",
    description:
      "Projetos básicos e executivos para instalações industriais, contemplando subestação abaixadora, iluminação, aterramento, SPDA, alimentação de força, diagramas de painéis, controle, comando e automação industrial.",
    cta: "Planejar projeto industrial"
  },
  {
    icon: Building2,
    title: "Projetos Elétricos Comerciais",
    description:
      "Projetos básicos e executivos para empreendimentos comerciais, incluindo subestação abaixadora, iluminação, aterramento, SPDA, alimentação de força e diagramas de painéis.",
    cta: "Planejar projeto comercial"
  },
  {
    icon: RadioTower,
    title: "Subestações de Energia",
    description:
      "Projetos básicos e executivos de subestações de energia, incluindo projeto eletromecânico, projeto elétrico, SPCS e apoio técnico como engenharia do proprietário, análise de projetos e fiscalização de obras.",
    cta: "Validar subestação"
  },
  {
    icon: ShieldCheck,
    title: "Estudos Elétricos",
    description:
      "Estudos técnicos para análise e segurança do sistema elétrico, incluindo estudo de curto-circuito, coordenação e seletividade, ATPV, energia incidente, arc-flash e campo eletromagnético.",
    cta: "Solicitar estudo elétrico"
  },
  {
    icon: Network,
    title: "Linhas de Transmissão",
    description:
      "Projetos básicos e executivos de linhas de transmissão, contemplando projeto eletromecânico e apoio técnico como engenharia do proprietário, análise de projetos e fiscalização de obras.",
    cta: "Analisar linha de transmissão"
  },
  {
    icon: FileCheck2,
    title: "Linhas de Transmissão Subterrânea",
    description:
      "Projetos básicos e executivos de linhas de transmissão subterrânea, com apoio técnico para engenharia do proprietário, análise de projetos e fiscalização de obras.",
    cta: "Avaliar linha subterrânea"
  }
];

const sectors = [
  {
    icon: Building2,
    title: "Condomínios Industriais e Logísticos",
    description: "Redes de distribuição, expansão elétrica e alta demanda de potência."
  },
  {
    icon: Factory,
    title: "Plantas Fabris e Indústrias do Grupo A",
    description: "Subestações, proteção, seletividade e enquadramento no ACL."
  },
  {
    icon: Gauge,
    title: "Shoppings, Grandes Comércios e Hipermercados",
    description: "Entradas de energia de média tensão, cabines primárias e aumento de demanda."
  },
  {
    icon: HardHat,
    title: "Construtoras e Incorporadoras",
    description: "Infraestrutura elétrica desde a fase greenfield até a energização."
  }
];

const process = [
  {
    step: "01",
    title: "Diagnóstico técnico",
    description: "Levantamento da demanda, tensão de atendimento, padrão existente e objetivo do empreendimento."
  },
  {
    step: "02",
    title: "Estratégia de aprovação",
    description: "Definição do caminho técnico-regulatório mais seguro para reduzir exigências, retrabalho e atrasos."
  },
  {
    step: "03",
    title: "Projeto e documentação",
    description: "Elaboração de desenhos, memorial, estudos de proteção e documentos técnicos para protocolo."
  },
  {
    step: "04",
    title: "Interface com concessionária",
    description: "Acompanhamento técnico das exigências, respostas e adequações até a aprovação."
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
        title: "Informe a demanda para gerar uma leitura técnica preliminar."
      };
    }

    if (Number.isNaN(parsedDemand) || parsedDemand <= 0) {
      return {
        label: "Dado inválido",
        title: "Informe uma demanda válida em kW para continuar."
      };
    }

    if (parsedDemand >= 500) {
      return {
        label: "Alta complexidade",
        title:
          "Demanda com perfil crítico. Recomendável análise de subestação, proteção, padrão de entrada, demanda contratada e estratégia de aprovação."
      };
    }

    if (parsedDemand >= 75) {
      return {
        label: "Média tensão provável",
        title:
          "Projeto com potencial necessidade de adequação em média tensão, validação de padrão de entrada e interface técnica com a concessionária."
      };
    }

    return {
      label: "Pré-análise elegível",
      title:
        "Projeto elegível para diagnóstico inicial. A análise deve confirmar tensão de atendimento, padrão de entrada e exigências locais."
    };
  }, [demand, parsedDemand]);

  return (
    <div className="page">
      <header className="site-header">
        <div className="container nav">
          <a href="#inicio" className="brand" aria-label="Renovera">
            <img src={logoSrc} alt="Renovera" />
          </a>

          <nav className="nav-links" aria-label="Navegação principal">
            <a href="#solucoes">Soluções</a>
            <a href="#viabilidade">Viabilidade</a>
            <a href="#metodo">Método</a>
          </nav>

          <button className="nav-cta" onClick={() => setModalOpen(true)}>
            Solicitar análise
          </button>
        </div>
      </header>

      <main>
        <section className="hero engenharia-hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="pill pill-dark">Renovera Engenharia | Projetos Elétricos</span>
              <h1>Projeto elétrico aprovado com método e autoridade técnica.</h1>
              <p>
                Projetos de baixa, média e alta tensão, subestações, estudos de proteção,
                padrões de entrada e viabilidade para consumidores do Grupo A que
                precisam aprovar infraestrutura.
              </p>

              <div className="hero-actions">
                <button className="btn btn-secondary" onClick={() => setModalOpen(true)}>
                  Quero destravar minha aprovação
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
                  <strong>Em análise</strong>
                </div>

                <div className="substation-diagram">
                  <div className="node node-a">MT</div>
                  <div className="node node-b">SE</div>
                  <div className="node node-c">RELÉ</div>
                  <div className="node node-d">CARGA</div>
                  <span className="line line-1" />
                  <span className="line line-2" />
                  <span className="line line-3" />
                </div>

                <div className="engineering-main">
                  <span>Diagnóstico preliminar</span>
                  <strong>Entrada de energia + proteção</strong>
                  <p>
                    Análise de demanda, concessionária, padrão de entrada,
                    seletividade e estratégia de aprovação.
                  </p>
                </div>

                <div className="engineering-list">
                  <div>
                    <span>Memorial técnico</span>
                    <strong>Executivo</strong>
                  </div>
                  <div>
                    <span>Interface</span>
                    <strong>Concessionária</strong>
                  </div>
                  <div>
                    <span>Critério</span>
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
              ["Aprovação técnica", "Documentação preparada para reduzir exigências e retrabalho."],
              ["Concessionárias", "Interface técnica com CPFL, Neoenergia, Energisa, Cemig, EDP e outras."],
              ["Operação crítica", "Projeto pensado para continuidade, segurança e expansão futura."]
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
              <span className="pill">Soluções técnicas</span>
              <h2>Escopo técnico para quem precisa aprovar certo.</h2>
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
              <span className="pill">Diagnóstico técnico</span>
              <h2>Descubra se sua infraestrutura está pronta para aprovação.</h2>
              <p>
                Um pré-check técnico para captar leads qualificados e transformar
                interesse em conversa comercial com dados mínimos do projeto.
              </p>
            </div>

            <div className="checker-card">
              <div className="checker-form">
                <label>
                  <span>1. Selecione a concessionária local</span>
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
                  <span className="field-title">3. O projeto envolve migração para o Mercado Livre?</span>
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
                  Receber diagnóstico técnico preliminar
                  <ArrowRight size={18} />
                </button>
              </div>

              <aside className="checker-result">
                <span>Pré-leitura técnica</span>
                <DataBox label="Concessionária" value={utility} />
                <DataBox label="Demanda" value={`${demand || "--"} kW`} />
                <DataBox label="ACL" value={acl} />
                <div className="result-box">
                  <strong>{viability.label}</strong>
                  <p>{viability.title}</p>
                </div>
                <button className="btn btn-outline full" onClick={() => setModalOpen(true)}>
                  Solicitar validação completa
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
              <h2>Para operações onde energia é infraestrutura estratégica.</h2>
              <p>
                Ideal para empresas com alta demanda, expansão de planta, novas
                entradas de energia, adequações de subestação ou avaliação de ACL.
              </p>
              <button className="btn btn-secondary dark-text" onClick={() => setModalOpen(true)}>
                Quero uma leitura técnica do meu caso
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
              <span className="pill">Método Renovera</span>
              <h2>Da dúvida técnica até o protocolo aprovado.</h2>
              <p>
                A estrutura segue a mesma lógica das landing pages anteriores:
                autoridade no topo, prova técnica no meio e CTA forte em todas as etapas.
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
            <span className="pill pill-dark">Aprovação com rigor técnico</span>
            <h2>Evite reprovações, exigências sucessivas e atrasos na entrada de operação.</h2>
            <p>
              Antes de protocolar ou investir em adequações, fale com quem entende
              de projeto, proteção, concessionária e regulação.
            </p>
            <div className="final-actions">
              <button className="btn btn-secondary" onClick={() => setModalOpen(true)}>
                Quero aprovar minha infraestrutura
                <Workflow size={18} />
              </button>
              <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                Chamar no WhatsApp técnico
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
            <p>Engenharia, projetos elétricos e consultoria técnica para empresas que precisam aprovar infraestrutura com segurança e precisão.</p>
          </div>

          <div className="footer-col footer-grid-three">
            <div className="footer-panel">
              <h4><span className="footer-icon">01</span>ENDEREÇO</h4>
              <p>Rua Visconde do Rio Branco, n.106, Centro, São João da Boa Vista - SP, CEP: 13870-180</p>
            </div>
            <div className="footer-panel">
              <h4><span className="footer-icon">02</span>TELEFONES</h4>
              <a href="https://wa.me/5519996514827" target="_blank" rel="noreferrer">+55 (19) 99651-4827</a>
              <a href="tel:+551931950160">+55 (19) 3195-0160</a>
            </div>
            <div className="footer-panel">
              <h4><span className="footer-icon">03</span>E-MAIL</h4>
              <a href="mailto:contato@renovera.com.br">contato@renovera.com.br</a>
              <p>Projetos industriais, comerciais, subestações, estudos elétricos e linhas de transmissão.</p>
            </div>
          </div>
        </div>
        <div className="container ecosystem-links">
          <a href="https://renovera1.github.io/renovera-consultoria-regulatoria/" target="_blank" rel="noreferrer">Consultoria Regulatória</a>
          <a href="https://renovera1.github.io/renovera-projetos-eletricos/" target="_blank" rel="noreferrer">Projetos Elétricos</a>
          <a href="https://renovera1.github.io/renovera-energia-solar/" target="_blank" rel="noreferrer">Energia Solar</a>
          <a href="https://renovera1.github.io/renovera-eletroposto/" target="_blank" rel="noreferrer">Eletropostos</a>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Renovera Energias Renováveis Ltda. Todos os direitos reservados.</span>
        </div>
      </footer>

      <a className="floating-whatsapp" href={universalWhatsappLink} target="_blank" rel="noreferrer" aria-label="Receber análise pelo WhatsApp">
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
      "Olá, quero solicitar um diagnóstico técnico com a Renovera.",
      "",
      `Empresa: ${form.empresa}`,
      `E-mail: ${form.email}`,
      `CNPJ: ${form.cnpj}`,
      `Telefone: ${form.telefone}`,
      `Concessionária: ${utility}`,
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
            <span className="pill small">Análise técnica Renovera</span>
            <h3>Solicitar diagnóstico de viabilidade</h3>
            <p>
              Envie os dados corporativos para uma primeira leitura técnica da
              demanda, concessionária, entrada de energia e escopo regulatório.
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
            <MiniSummary icon={MapPin} label="Concessionária" value={utility} />
            <MiniSummary icon={Gauge} label="Demanda" value={`${demand || "--"} kW`} />
            <MiniSummary icon={Landmark} label="ACL" value={acl} />
          </div>

          <button className="btn btn-secondary full" type="submit">
            Enviar e chamar a Renovera no WhatsApp
            <ArrowRight size={18} />
          </button>

          <p className="form-note">
            <Mail size={16} /> O botão abre o WhatsApp com os dados preenchidos.
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
