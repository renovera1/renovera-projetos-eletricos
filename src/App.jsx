import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronRight,
  ExternalLink,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { routes, siteConfig } from "./config/site";
import {
  articles,
  caseStudies,
  contactChallenges,
  differentiators,
  methodSteps,
  serviceGroups,
  stats,
  technicalSignals,
  values,
} from "./data/content";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function routeToHref(path) {
  if (path === "/") {
    return `${basePath}/`;
  }
  return `${basePath}${path}`;
}

function normalizePath(pathname) {
  let path = pathname;
  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length);
  }
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  if (path !== "/" && !path.endsWith("/")) {
    path = `${path}/`;
  }
  return routes.some((route) => route.path === path) ? path : "/404/";
}

function setMeta(selector, attribute, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute(attribute, value);
  }
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentRoute = routes.find((route) => route.path === currentPath);

  useEffect(() => {
    const handlePop = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setMobileOpen(false);
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [currentPath]);

  useEffect(() => {
    const route = currentRoute || {
      title: "Página não encontrada | Kairós Engenharia",
      description: "A página solicitada não foi encontrada no site da Kairós Engenharia.",
    };
    document.title = route.title;
    setMeta('meta[name="description"]', "content", route.description);
    setMeta('meta[property="og:title"]', "content", route.title);
    setMeta('meta[property="og:description"]', "content", route.description);
    setMeta('meta[property="og:url"]', "content", `${siteConfig.baseUrl}${currentPath === "/" ? "/" : currentPath}`);
  }, [currentPath, currentRoute]);

  function navigate(path) {
    const href = routeToHref(path);
    window.history.pushState({}, "", href);
    setCurrentPath(path);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const page = useMemo(() => {
    switch (currentPath) {
      case "/":
        return <HomePage navigate={navigate} />;
      case "/servicos/":
        return <ServicesPage navigate={navigate} />;
      case "/a-kairos/":
        return <AboutPage navigate={navigate} />;
      case "/cases/":
        return <CasesPage navigate={navigate} />;
      case "/conteudos/":
        return <ContentPage navigate={navigate} />;
      case "/contato/":
        return <ContactPage />;
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  }, [currentPath]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <ScrollProgress value={scrollProgress} />
      <Header
        currentPath={currentPath}
        mobileOpen={mobileOpen}
        navigate={navigate}
        setMobileOpen={setMobileOpen}
      />
      <main>{page}</main>
      <Footer navigate={navigate} />
      <FloatingActions navigate={navigate} />
    </div>
  );
}

function ScrollProgress({ value }) {
  return (
    <div className="fixed left-0 top-0 z-[70] h-1 w-full bg-transparent" aria-hidden="true">
      <div className="h-full bg-energy-400 transition-[width] duration-150" style={{ width: `${value}%` }} />
    </div>
  );
}

function Header({ currentPath, mobileOpen, navigate, setMobileOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/88 text-white shadow-[0_18px_50px_rgba(0,0,0,.14)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 rounded-md text-left"
          aria-label="Kairós Engenharia - Página inicial"
        >
          <span className="grid h-11 w-11 place-items-center rounded-md border border-energy-300/30 bg-white/8 text-sm font-bold tracking-tight text-white shadow-glow">
            K
          </span>
          <span>
            <strong className="block text-sm tracking-[0.14em] text-white">{siteConfig.legalName}</strong>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Engenharia & Energia
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {routes.map((route) => (
            <NavButton key={route.path} route={route} active={currentPath === route.path} navigate={navigate} />
          ))}
        </nav>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-md bg-energy-400 px-4 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-energy-300 lg:inline-flex"
          onClick={() => navigate("/contato/")}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Falar com consultor
        </button>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-white/5 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen ? (
        <nav id="mobile-menu" className="border-t border-white/10 bg-navy-950 px-5 pb-5 pt-3 lg:hidden" aria-label="Navegação móvel">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {routes.map((route) => (
              <button
                key={route.path}
                type="button"
                onClick={() => navigate(route.path)}
                className={`rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                  currentPath === route.path ? "bg-energy-400 text-navy-950" : "text-slate-200 hover:bg-white/8"
                }`}
              >
                {route.label}
              </button>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function NavButton({ route, active, navigate }) {
  return (
    <button
      type="button"
      onClick={() => navigate(route.path)}
      className={`relative text-sm font-medium transition ${
        active ? "text-white" : "text-slate-300 hover:text-white"
      }`}
    >
      {route.label}
      <span
        className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-energy-400 transition-all ${
          active ? "w-full" : "w-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 pt-32 text-white">
        <div className="absolute inset-0 bg-hero-grid bg-[size:42px_42px] opacity-70" aria-hidden="true" />
        <div className="noise" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-28">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-energy-300/25 bg-white/7 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-energy-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Engenharia, regulação e inteligência energética
            </p>
            <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-normal text-white sm:text-5xl lg:text-6xl">
              Engenharia de Alta Performance, Inteligência de Dados e Soluções Regulatórias para o Mercado de Energia.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Projetos elétricos, conexão à rede, consultoria regulatória e inteligência energética para empresas que precisam tomar decisões técnicas com segurança.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/contato/")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-energy-400 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-energy-300"
              >
                Falar com um Engenheiro Consultor
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/servicos/")}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Conhecer Serviços
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-white/10 bg-white/5 px-4 py-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{stat.label}</dt>
                  <dd className="mt-2 text-sm font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <EnergyConsole />
        </div>
      </section>

      <SectionIntro
        eyebrow="Por que Kairós Engenharia"
        title="Precisão de engenharia para decisões que não podem ser genéricas."
        text="Combinamos engenharia elétrica aplicada, leitura regulatória e automação para reduzir incerteza, retrabalho e riscos de implantação."
      />

      <section className="bg-white pb-24 text-slate-900">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-3 lg:px-8">
          {differentiators.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="reveal">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-600">Método</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              A Kairós atua onde projetos convencionais deixam de ser suficientes.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Nosso trabalho conecta engenharia, regulação e dados para que cada etapa tenha evidência, critério e documentação compatível com o risco técnico.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {methodSteps.map((step, index) => (
              <div key={step.title} className="reveal rounded-md border border-slate-200 bg-white p-6 shadow-crisp">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-energy-600">
                  Etapa {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta navigate={navigate} />
    </>
  );
}

function ServicesPage({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Serviços concebidos para projetos onde o custo do erro é alto."
        text="Da infraestrutura elétrica à estratégia regulatória, a Kairós estrutura análises, projetos e entregáveis para decisões técnicas mais seguras."
      />
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
          {serviceGroups.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>
      <section className="bg-navy-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="reveal">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-300">Inteligência aplicada</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal sm:text-4xl">
              Automação não substitui engenharia. Amplifica precisão, rastreabilidade e velocidade.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Fluxos controlados consolidam faturas, parâmetros, relatórios e dados de homologação sem abrir mão de responsabilidade técnica.
            </p>
          </div>
          <CodePanel />
        </div>
      </section>
      <PageCta navigate={navigate} />
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="A Kairós"
        title="Engenharia elétrica boutique para projetos que pedem método, dados e responsabilidade técnica."
        text="A Kairós Engenharia atua onde decisões de energia exigem precisão, documentação, leitura regulatória e visão executiva."
      />
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="reveal rounded-md bg-navy-950 p-7 text-white shadow-glow">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-300">Posicionamento</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal">
              A Kairós atua onde projetos convencionais deixam de ser suficientes.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Nosso foco é B2B: empresas, operações, investidores, escritórios e equipes técnicas que precisam organizar riscos e decisões em projetos elétricos complexos.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <InfoBlock title="Missão" text="Transformar problemas elétricos e regulatórios complexos em decisões técnicas claras, documentadas e executáveis." />
            <InfoBlock title="Visão" text="Ser referência em engenharia elétrica aplicada ao mercado de energia, conectando dados, regulação e infraestrutura." />
            <InfoBlock title="Diferenciação" text="Atuação consultiva sem promessa comercial simplista: cada recomendação precisa de premissa, evidência e critério." />
            <InfoBlock title="Responsabilidade técnica" text="Entregáveis preparados para implantação, interlocução com distribuidoras, suporte executivo ou apoio jurídico." />
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-600">Valores</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Rigor técnico para separar hipótese, evidência e decisão.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value} className="reveal flex items-start gap-3 rounded-md border border-slate-200 bg-white p-5">
                <Check className="mt-1 h-5 w-5 shrink-0 text-energy-600" aria-hidden="true" />
                <p className="text-sm font-medium leading-7 text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCta navigate={navigate} />
    </>
  );
}

function CasesPage({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="Cases"
        title="Estruturas profissionais para cases técnicos anonimizados."
        text="Os cenários abaixo são modelos de apresentação. Dados reais devem ser publicados apenas com autorização e anonimização adequada."
      />
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
          {caseStudies.map((study) => (
            <CaseCard key={study.title} study={study} />
          ))}
        </div>
      </section>
      <PageCta navigate={navigate} />
    </>
  );
}

function ContentPage({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="Conteúdos"
        title="Artigos técnicos para decisões melhores no mercado de energia."
        text="Posts estáticos iniciais, escritos como modelos editoriais e sem tratar informação regulatória não verificada como fato publicado."
      />
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-3 lg:px-8">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </section>
      <PageCta navigate={navigate} />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Seu projeto precisa de engenharia que trate risco como variável de projeto."
        text="Envie o contexto inicial. A validação local ajuda a organizar os dados antes da integração com um endpoint seguro."
      />
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="reveal">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-600">Dados para análise inicial</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Quanto melhor o contexto, mais objetiva é a primeira leitura técnica.
            </h2>
            <div className="mt-8 grid gap-4">
              {technicalSignals.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-md bg-energy-400/12 text-energy-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                    </div>
                    <span className="text-sm text-slate-500">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function NotFoundPage({ navigate }) {
  return (
    <section className="min-h-[70vh] bg-navy-950 px-5 pb-24 pt-40 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-300">404</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
          Página não encontrada.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-300">
          O endereço solicitado não existe ou foi movido. Volte ao início para navegar pelas áreas principais da Kairós Engenharia.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-energy-400 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-energy-300"
        >
          Voltar ao início
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 px-5 pb-20 pt-36 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-hero-grid bg-[size:42px_42px] opacity-60" aria-hidden="true" />
      <div className="noise" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-300">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-normal sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{text}</p>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <section className="bg-white py-20 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-600">{eyebrow}</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal sm:text-4xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{text}</p>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ item }) {
  const Icon = item.icon;
  return (
    <article className="reveal rounded-md border border-slate-200 bg-white p-7 shadow-crisp">
      <span className="grid h-12 w-12 place-items-center rounded-md bg-energy-400/12 text-energy-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-7 text-xl font-semibold tracking-normal text-slate-950">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{item.tag}</p>
    </article>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <article
      className={`reveal rounded-md border p-7 ${
        service.featured ? "border-navy-800 bg-navy-950 text-white shadow-glow" : "border-slate-200 bg-white text-slate-900 shadow-crisp"
      }`}
    >
      <span
        className={`grid h-12 w-12 place-items-center rounded-md ${
          service.featured ? "bg-energy-300/14 text-energy-300" : "bg-energy-400/12 text-energy-600"
        }`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-7 text-2xl font-semibold tracking-normal">{service.title}</h2>
      <p className={`mt-4 text-sm leading-7 ${service.featured ? "text-slate-300" : "text-slate-600"}`}>{service.summary}</p>
      <ul className={`mt-6 grid gap-3 text-sm leading-6 ${service.featured ? "text-slate-200" : "text-slate-700"}`}>
        {service.items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${service.featured ? "text-energy-300" : "text-energy-600"}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function InfoBlock({ title, text }) {
  return (
    <article className="reveal rounded-md border border-slate-200 bg-white p-6 shadow-crisp">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
    </article>
  );
}

function CaseCard({ study }) {
  return (
    <article className="reveal rounded-md border border-slate-200 bg-white p-7 shadow-crisp">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-energy-600">{study.label}</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-normal text-slate-950">{study.title}</h2>
      <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600">
        <LabeledText label="Contexto" text={study.context} />
        <LabeledText label="Desafio" text={study.challenge} />
        <LabeledText label="Estratégia técnica" text={study.strategy} />
        <LabeledText label="Entregáveis" text={study.deliverables} />
        <LabeledText label="Impacto esperado" text={study.impact} />
      </div>
    </article>
  );
}

function LabeledText({ label, text }) {
  return (
    <p>
      <span className="font-semibold text-slate-950">{label}: </span>
      {text}
    </p>
  );
}

function ArticleCard({ article }) {
  return (
    <article className="reveal flex min-h-[270px] flex-col rounded-md border border-slate-200 bg-white p-7 shadow-crisp">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-energy-400/12 px-3 py-1 text-xs font-bold text-energy-700">{article.category}</span>
        <span className="text-xs font-medium text-slate-500">{article.readTime}</span>
      </div>
      <h2 className="mt-6 text-xl font-semibold tracking-normal text-slate-950">{article.title}</h2>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{article.summary}</p>
      <button
        type="button"
        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-energy-700"
        aria-label={`Abrir artigo: ${article.title}`}
      >
        Ler artigo
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    estado: "",
    concessionaria: "",
    desafio: "",
    mensagem: "",
    lgpd: false,
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: name === "telefone" ? formatPhone(value) : value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setFeedback("");
  }

  function validate() {
    const nextErrors = {};
    if (!form.nome.trim()) nextErrors.nome = "Informe seu nome.";
    if (!form.empresa.trim()) nextErrors.empresa = "Informe a empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) nextErrors.email = "Informe um e-mail válido.";
    if (form.telefone.replace(/\D/g, "").length < 10) nextErrors.telefone = "Informe um telefone brasileiro válido.";
    if (!form.estado.trim()) nextErrors.estado = "Informe o estado.";
    if (!form.desafio) nextErrors.desafio = "Selecione o principal desafio.";
    if (form.mensagem.trim().length < 20) nextErrors.mensagem = "Descreva o contexto com pelo menos 20 caracteres.";
    if (!form.lgpd) nextErrors.lgpd = "É necessário autorizar o contato para enviar sua solicitação.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    if (!validate()) return;

    // Integre aqui um endpoint seguro, como Formspree, HubSpot, Google Apps Script, Supabase ou API própria.
    // Nunca exponha tokens ou chaves privadas no front-end.
    if (!siteConfig.contactEndpoint) {
      setFeedback("Solicitação validada. Configure o endpoint seguro de envio para concluir a integração.");
      return;
    }

    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Erro no endpoint de contato.");
      setFeedback("Solicitação enviada com segurança. A equipe retornará pelo contato informado.");
      setForm({
        nome: "",
        empresa: "",
        email: "",
        telefone: "",
        estado: "",
        concessionaria: "",
        desafio: "",
        mensagem: "",
        lgpd: false,
      });
    } catch {
      setFeedback("Não foi possível concluir o envio. Verifique o endpoint configurado e tente novamente.");
    }
  }

  return (
    <form className="reveal rounded-md border border-slate-200 bg-white p-6 shadow-crisp sm:p-8" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" id="nome" error={errors.nome}>
          <input id="nome" name="nome" value={form.nome} onChange={(event) => updateField("nome", event.target.value)} className={fieldClass(errors.nome)} autoComplete="name" />
        </Field>
        <Field label="Empresa" id="empresa" error={errors.empresa}>
          <input id="empresa" name="empresa" value={form.empresa} onChange={(event) => updateField("empresa", event.target.value)} className={fieldClass(errors.empresa)} autoComplete="organization" />
        </Field>
        <Field label="E-mail corporativo" id="email" error={errors.email}>
          <input id="email" name="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className={fieldClass(errors.email)} autoComplete="email" />
        </Field>
        <Field label="Telefone" id="telefone" error={errors.telefone}>
          <input id="telefone" name="telefone" value={form.telefone} onChange={(event) => updateField("telefone", event.target.value)} className={fieldClass(errors.telefone)} inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" />
        </Field>
        <Field label="Estado" id="estado" error={errors.estado}>
          <input id="estado" name="estado" value={form.estado} onChange={(event) => updateField("estado", event.target.value.toUpperCase().slice(0, 2))} className={fieldClass(errors.estado)} placeholder="UF" maxLength={2} />
        </Field>
        <Field label="Concessionária" id="concessionaria" error={errors.concessionaria}>
          <input id="concessionaria" name="concessionaria" value={form.concessionaria} onChange={(event) => updateField("concessionaria", event.target.value)} className={fieldClass(errors.concessionaria)} />
        </Field>
        <Field label="Principal desafio" id="desafio" error={errors.desafio} className="sm:col-span-2">
          <select id="desafio" name="desafio" value={form.desafio} onChange={(event) => updateField("desafio", event.target.value)} className={fieldClass(errors.desafio)}>
            <option value="">Selecione uma opção</option>
            {contactChallenges.map((challenge) => (
              <option key={challenge} value={challenge}>
                {challenge}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Mensagem" id="mensagem" error={errors.mensagem} className="sm:col-span-2">
          <textarea
            id="mensagem"
            name="mensagem"
            rows={5}
            value={form.mensagem}
            onChange={(event) => updateField("mensagem", event.target.value)}
            className={`${fieldClass(errors.mensagem)} resize-none`}
            placeholder="Ex.: potência, concessionária, prazo, tipo de instalação ou restrição recebida."
          />
        </Field>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-600" htmlFor="lgpd">
          <input
            id="lgpd"
            name="lgpd"
            type="checkbox"
            checked={form.lgpd}
            onChange={(event) => updateField("lgpd", event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-energy-600"
          />
          <span>
            Autorizo o contato da Kairós Engenharia para retorno sobre esta solicitação e declaro ciência sobre o tratamento dos meus dados para essa finalidade.
          </span>
        </label>
        {errors.lgpd ? <p className="mt-2 text-sm font-medium text-red-600">{errors.lgpd}</p> : null}
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 sm:w-auto"
      >
        Enviar solicitação
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {feedback ? (
        <p className="mt-5 rounded-md border border-energy-400/30 bg-energy-400/10 px-4 py-3 text-sm font-medium text-navy-900" role="status">
          {feedback}
        </p>
      ) : null}
    </form>
  );
}

function Field({ label, id, error, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function fieldClass(error) {
  return `w-full rounded-md border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
    error ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-energy-500 focus:ring-4 focus:ring-energy-400/10"
  }`;
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function EnergyConsole() {
  return (
    <div className="reveal relative min-h-[560px] lg:min-h-[640px]">
      <div className="absolute inset-0 rounded-md border border-white/10 bg-white/6 shadow-glow backdrop-blur" />
      <div className="screen-grid absolute inset-5 overflow-hidden rounded-md border border-white/12 bg-[#071a2e] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Kairos.Engine</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Painel de decisão energética</h2>
          </div>
          <span className="rounded-full border border-energy-300/25 bg-energy-300/10 px-3 py-1 text-xs font-semibold text-energy-300">
            Online
          </span>
        </div>
        <div className="mt-8 rounded-md border border-white/10 bg-navy-950/70 p-4">
          <svg viewBox="0 0 520 250" className="h-auto w-full" role="img" aria-label="Gráfico técnico abstrato de geração, consumo e conexão">
            <defs>
              <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#5EEAD4" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
            <path d="M35 202H488" stroke="rgba(226,232,240,.18)" strokeWidth="1" />
            <path d="M35 162H488" stroke="rgba(226,232,240,.12)" strokeWidth="1" />
            <path d="M35 122H488" stroke="rgba(226,232,240,.12)" strokeWidth="1" />
            <path d="M35 82H488" stroke="rgba(226,232,240,.12)" strokeWidth="1" />
            <path
              d="M40 183C72 170 92 104 126 111C160 118 167 172 202 149C236 126 248 78 284 89C319 100 322 153 357 133C392 113 410 63 446 72C468 77 480 94 490 110"
              fill="none"
              stroke="url(#line)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              className="energy-line"
              d="M45 205C90 194 112 172 150 178C205 187 224 217 270 188C319 158 345 160 382 183C428 211 462 183 488 162"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {[126, 284, 446].map((x) => (
              <circle key={x} className="pulse-dot" cx={x} cy={x === 446 ? 72 : x === 284 ? 89 : 111} r="8" fill="#2DD4BF" />
            ))}
          </svg>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {technicalSignals.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-md border border-white/10 bg-white/5 p-4">
                <Icon className="h-5 w-5 text-energy-300" aria-hidden="true" />
                <p className="mt-4 text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Status da conexão</span>
            <span className="font-semibold text-energy-300">Em análise</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full bg-energy-400" />
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            Estratégia técnica modelada para conexão, conformidade e tomada de decisão.
          </p>
        </div>
      </div>
    </div>
  );
}

function CodePanel() {
  return (
    <div className="reveal overflow-hidden rounded-md border border-white/10 bg-[#071a2e] shadow-glow">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <span className="font-mono text-[11px] text-slate-400">kairos.engine / analysis_pipeline.py</span>
        <span className="rounded-full bg-energy-300/10 px-3 py-1 text-xs font-semibold text-energy-300">auditável</span>
      </div>
      <pre className="overflow-x-auto p-5 text-xs leading-6 text-slate-300">
        <code>{`load(invoices, grid_data, access_opinion)
validate(load_curve, protection, demand)
model(export_control, grid_zero, scenarios)
rank(alternatives, risk, implementation_cost)
report(evidence_matrix, technical_route)

# Resultado: decisão técnica rastreável.`}</code>
      </pre>
    </div>
  );
}

function PageCta({ navigate }) {
  return (
    <section className="bg-white px-5 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto overflow-hidden rounded-md bg-navy-950 px-6 py-10 text-white shadow-glow sm:px-10 lg:max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-energy-300">Próximo passo</p>
            <h2 className="mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-normal sm:text-3xl">
              Organize o contexto técnico e reduza incertezas antes de decidir.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/contato/")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-energy-400 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-energy-300 sm:w-auto"
          >
            Falar com a Kairós
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="bg-navy-950 px-5 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <button type="button" onClick={() => navigate("/")} className="flex items-center gap-3 rounded-md text-left">
            <span className="grid h-11 w-11 place-items-center rounded-md border border-energy-300/30 bg-white/8 text-sm font-bold">K</span>
            <span>
              <strong className="block text-sm tracking-[0.14em]">{siteConfig.legalName}</strong>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-500">Engenharia & Energia</span>
            </span>
          </button>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Engenharia elétrica, consultoria técnico-regulatória e inteligência energética para decisões complexas de infraestrutura, conexão e geração.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Navegação</h2>
          <div className="mt-4 grid gap-3">
            {routes.map((route) => (
              <button key={route.path} type="button" onClick={() => navigate(route.path)} className="w-fit text-sm text-slate-400 transition hover:text-white">
                {route.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Contato</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <a className="inline-flex w-fit items-center gap-2 transition hover:text-white" href={`mailto:${siteConfig.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <a className="inline-flex w-fit items-center gap-2 transition hover:text-white" href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kairós Engenharia. Todos os direitos reservados.</p>
        <p>Marca institucional exclusiva Kairós Engenharia.</p>
      </div>
    </footer>
  );
}

function FloatingActions({ navigate }) {
  const whatsappHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
    : "";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-12 w-12 place-items-center rounded-md bg-energy-400 text-navy-950 shadow-glow transition hover:bg-energy-300"
          aria-label="Falar pelo WhatsApp"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/contato/")}
          className="grid h-12 w-12 place-items-center rounded-md bg-energy-400 text-navy-950 shadow-glow transition hover:bg-energy-300"
          aria-label="Abrir contato"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="grid h-12 w-12 place-items-center rounded-md border border-slate-200 bg-white text-navy-950 shadow-crisp transition hover:bg-slate-50"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default App;
