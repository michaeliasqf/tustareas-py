"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Check,
  ChevronDown,
  FilePenLine,
  GraduationCap,
  AtSign as Instagram,
  Mail,
  Landmark,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ScrollProgress = dynamic(() => import("./motion-primitives").then((module) => module.ScrollProgress), { ssr: false });
const AnimatedCounter = dynamic(() => import("./motion-primitives").then((module) => module.AnimatedCounter), { ssr: false });
const HeroVideo = dynamic(() => import("./hero-video"), {
  ssr: false,
  loading: () => <div className="hero-video-frame hero-video-loading" aria-hidden="true" />,
});
const HeroFlowCanvas = dynamic(() => import("./hero-flow-canvas"), { ssr: false });

const PHONE = "595993372593";
const EMAIL = "tustareas.py.edu@gmail.com";

const services = [
  {
    id: "tutoria",
    number: "01",
    icon: GraduationCap,
    title: "Tutoría Académica",
    label: "Modalidad asistida",
    description:
      "Aprendé a desarrollar tu trabajo con acompañamiento profesional, reuniones y respuestas durante todo el proceso.",
    bullets: [
      "Orientación metodológica y APA 7",
      "Objetivos, hipótesis y problema de investigación",
      "Marco teórico, metodología e instrumentos",
      "Interpretación de resultados y preparación para la defensa",
    ],
  },
  {
    id: "desarrollo",
    number: "02",
    icon: FilePenLine,
    title: "Desarrollo Académico",
    label: "Completo o por etapas",
    description:
      "Elaboración profesional de trabajos de investigación, tesis, monografías, proyectos y planes de negocio.",
    bullets: [
      "Trabajo completo, capítulo o sección puntual",
      "Continuación o actualización de un trabajo",
      "Proyectos adaptados a universidades paraguayas",
      "Planes de negocio y estudios económico-financieros",
    ],
    featured: true,
  },
  {
    id: "correccion",
    number: "03",
    icon: BookOpenCheck,
    title: "Corrección Académica",
    label: "Tu trabajo, mejorado",
    description:
      "Revisión integral para que tu documento gane claridad, coherencia, rigor académico y una presentación impecable.",
    bullets: [
      "Corrección metodológica, ortográfica y de estilo",
      "Citas, referencias, tablas y figuras en APA",
      "Revisión de similitud y parafraseo académico",
      "Optimización y humanización de textos con IA",
    ],
  },
];

const process = [
  ["01", "Diagnóstico gratuito", "Nos contás qué necesitás y revisamos el alcance sin compromiso."],
  ["02", "Propuesta clara", "Definimos modalidad, etapas, tiempos y entregables antes de empezar."],
  ["03", "Desarrollo y seguimiento", "Avanzamos con comunicación constante y correcciones acordadas."],
  ["04", "Aprobación y defensa", "Te acompañamos hasta la aprobación y preparación de tu defensa."],
];

const faqs = [
  ["¿El diagnóstico tiene costo?", "No. Revisamos tu caso, el estado del trabajo y lo que solicita tu universidad de forma gratuita y sin compromiso."],
  ["¿Puedo contratar solo un capítulo?", "Sí. Podés solicitar el trabajo completo, un capítulo, una sección, una actualización o la continuación de un documento existente."],
  ["¿Trabajan con normas APA 7?", "Sí. Revisamos citas, referencias, tablas, figuras, numeración, encabezados, interlineado y márgenes según APA 7 y los requisitos de tu institución."],
  ["¿Me acompañan hasta la defensa?", "Sí. Damos seguimiento durante el proceso de aprobación, atendemos observaciones y podemos ayudarte con la presentación y la exposición oral."],
];

const paymentOptions = [
  ["/payment-logos/itau.png", "Itaú Paraguay", "Banco", "itau"],
  ["/payment-logos/sudameris.svg", "Sudameris", "Banco", "sudameris"],
  ["/payment-logos/ueno.svg", "ueno bank", "Banco", "ueno"],
  ["/payment-logos/gnb.svg", "GNB Paraguay", "Banco", "gnb"],
  ["/payment-logos/continental.png", "Banco Continental", "Banco", "continental"],
  ["/payment-logos/atlas.jpg", "Banco Atlas", "Banco", "atlas"],
  ["/payment-logos/basa.svg", "Banco Basa", "Banco", "basa"],
  ["/payment-logos/banco-familiar.webp", "Banco Familiar", "Banco", "familiar"],
  ["/payment-logos/tigo-money.png", "Tigo Money", "Billetera", "tigo"],
  ["/payment-logos/personal-pay.svg", "Personal Pay", "Billetera", "personal"],
  ["/payment-logos/mango.svg", "Mango", "Billetera", "mango"],
];

function buildWhatsApp(service: string, name = "") {
  const intro = name ? `Hola, soy ${name}.` : "Hola.";
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`${intro} Quiero solicitar un diagnóstico gratuito para ${service}.`)}`;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [selected, setSelected] = useState("Tutoría Académica");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const consent = localStorage.getItem("tustareas-cookie-consent");
      setCookieOpen(!consent);
      const draft = localStorage.getItem("tustareas-contact-draft");
      if (draft) {
        try {
          const parsed: unknown = JSON.parse(draft);
          if (typeof parsed === "object" && parsed !== null) {
            const saved = parsed as Record<string, unknown>;
            if (typeof saved.name === "string") setName(saved.name.slice(0, 100));
            if (typeof saved.detail === "string") setDetail(saved.detail.slice(0, 2000));
            if (typeof saved.selected === "string" && services.some((service) => service.title === saved.selected)) setSelected(saved.selected);
          }
        } catch {
          localStorage.removeItem("tustareas-contact-draft");
        }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    localStorage.setItem("tustareas-contact-draft", JSON.stringify({ name, detail, selected }));
  }, [name, detail, selected]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".section-heading, .center-heading, .service-card, .detail-intro, .detail-columns > div, .process-grid article, .guarantee, .team-photo, .about-copy, .extras-heading, .extras-grid article, .faq-grid > div, .contact-card, .payments-shell"
    );
    elements.forEach((element) => element.classList.add("reveal-item"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.02, rootMargin: "0px 0px 120px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = useMemo(() => {
    const base = `${name ? `Hola, soy ${name}. ` : "Hola. "}Quiero un diagnóstico gratuito para ${selected}.`;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(detail ? `${base} Mi consulta: ${detail}` : base)}`;
  }, [name, detail, selected]);

  function sendEmail(event: FormEvent) {
    event.preventDefault();
    const subject = `Diagnóstico gratuito — ${selected}`;
    const body = `Nombre: ${name || "Sin indicar"}\nServicio: ${selected}\n\nConsulta:\n${detail || "Quiero recibir más información."}`;
    localStorage.removeItem("tustareas-contact-draft");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function consent(value: "accepted" | "essential") {
    localStorage.setItem("tustareas-cookie-consent", value);
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `tustareas_consent=${value}; max-age=31536000; path=/; SameSite=Lax${secure}`;
    setCookieOpen(false);
  }

  return (
    <main>
      <ScrollProgress />
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Navegación principal">
          <a href="#inicio" className="brand" aria-label="tustareas.py — inicio">
            <Image className="brand-logo" src="/logo-tustareas.png" width={1168} height={414} priority alt="tustareas.py — Tareas, Proyectos, Tesis" />
          </a>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#proceso" onClick={() => setMenuOpen(false)}>Cómo trabajamos</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
            <a href="#preguntas" onClick={() => setMenuOpen(false)}>Preguntas</a>
            <a className="button button-small" href="#contacto" onClick={() => setMenuOpen(false)}>Diagnóstico gratuito</a>
          </div>
          <button className="menu-button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <HeroFlowCanvas />
        <div className="hero-glow" />
        <div className="container hero-grid">
          <div className="hero-intro">
            <div className="eyebrow">Asesoría académica en Paraguay</div>
            <h1>Tu meta académica,<br /><span>bien acompañada.</span></h1>
          </div>
          <div className="hero-body">
            <p>Convertimos la incertidumbre en un plan claro. Te orientamos, desarrollamos o corregimos tu trabajo con rigor, confidencialidad y seguimiento hasta la defensa.</p>
            <div className="hero-actions">
              <a className="button" href="#contacto">Solicitar diagnóstico <ArrowRight size={18} /></a>
              <a className="button button-ghost" href="#servicios">Conocer servicios</a>
            </div>
            <div className="trust-row">
              <div><AnimatedCounter target={150} prefix="+" /><span>Proyectos aprobados</span></div>
              <div><AnimatedCounter target={500} prefix="+" /><span>Clientes acompañados</span></div>
              <div><AnimatedCounter target={100} suffix="%" /><span>Atención confidencial</span></div>
            </div>
          </div>
          <div className="hero-visual photo-visual">
            <HeroVideo />
          </div>
        </div>
      </section>

      <section className="services section" id="servicios">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">SERVICIOS</span><h2>Elegí el apoyo que necesitás</h2></div><p>Cada proceso académico es distinto. Por eso podés contratar una modalidad completa o una etapa puntual.</p></div>
          <div className="service-grid">
            {services.map(({ icon: Icon, ...service }) => (
              <article className={`service-card ${service.featured ? "featured" : ""}`} key={service.id}>
                {service.featured && <span className="popular">MÁS ELEGIDO</span>}
                <div className="service-top"><span className="service-icon"><Icon /></span><span className="service-number">{service.number}</span></div>
                <span className="service-label">{service.label}</span>
                <h3>{service.title}</h3><p>{service.description}</p>
                <ul>{service.bullets.map(bullet => <li key={bullet}><Check size={16} />{bullet}</li>)}</ul>
                <a href={buildWhatsApp(service.title)} target="_blank" rel="noopener noreferrer">Consultar esta modalidad <ArrowRight size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section section">
        <div className="container detail-grid">
          <div className="detail-intro"><span className="section-kicker light">DESARROLLO ACADÉMICO</span><h2>Trabajos con estructura, método y propósito</h2><p>Desarrollamos el documento completo o solo lo que te falta, siguiendo la metodología científica exigida por universidades paraguayas.</p><a href="#contacto" className="text-link">Evaluar mi trabajo <ArrowRight size={17} /></a></div>
          <div className="detail-columns">
            <div><h3>Investigación</h3><p>Tesis, monografías y proyectos</p><ul><li>Introducción y planteamiento</li><li>Marco teórico y metodológico</li><li>Resultados y conclusiones</li><li>Referencias y anexos</li></ul></div>
            <div><h3>Planes de negocio</h3><p>Contexto empresarial paraguayo</p><ul><li>Investigación de mercado</li><li>Plan de marketing</li><li>Estudio técnico</li><li>Estudio económico-financiero</li></ul></div>
          </div>
        </div>
      </section>

      <section className="process section" id="proceso">
        <div className="container">
          <div className="center-heading"><span className="section-kicker">NUESTRA FORMA DE TRABAJAR</span><h2>Un proceso claro, de principio a fin</h2><p>Sabés qué estamos haciendo, por qué y cuál es el próximo paso.</p></div>
          <div className="process-grid">{process.map(([num, title, text]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="guarantee"><div className="guarantee-icon"><ShieldCheck /></div><div><span className="section-kicker light">NUESTRO COMPROMISO</span><h3>No te dejamos a mitad del camino</h3><p>Hacemos seguimiento a las observaciones y acompañamos al alumno durante el proceso de aprobación y defensa de su trabajo, según el alcance contratado.</p></div><a className="button button-white" href="#contacto">Hablar con un asesor</a></div>
        </div>
      </section>

      <section className="about section" id="nosotros">
        <div className="container about-grid">
          <div className="team-photo">
            <Image src="/team-working.jpg" width={1400} height={919} sizes="(max-width: 900px) 100vw, 52vw" alt="Equipo profesional trabajando alrededor de una mesa" />
            <div className="team-badge"><Users /><span><strong>Un equipo multidisciplinario</strong> detrás de cada proyecto</span></div>
          </div>
          <div className="about-copy"><span className="section-kicker">QUIÉNES SOMOS</span><h2>Detrás de cada entrega hay personas que se involucran</h2><p>Somos un equipo de asesoría académica que combina metodología, redacción y atención cercana para ayudar a estudiantes de cualquier lugar a avanzar con seguridad.</p>
            <div className="mission"><div><Target /><span><strong>Misión</strong>Brindar soluciones académicas rigurosas, claras y accesibles que impulsen el aprendizaje y la aprobación.</span></div><div><Sparkles /><span><strong>Visión</strong>Ser una asesoría académica de referencia por nuestra calidad, ética y acompañamiento humano.</span></div></div>
          </div>
        </div>
      </section>

      <section className="extras section">
        <div className="extras-watermark"><Image src="/isotipo-tustareas.png" width={1254} height={1254} alt="" aria-hidden="true" /></div>
        <div className="container">
          <div className="extras-heading"><div><span className="section-kicker">SERVICIOS ESPECÍFICOS</span><h2>Sumá únicamente lo que tu modalidad necesita</h2></div><p>Apoyos puntuales que podés añadir a Tutoría, Desarrollo o Corrección según el estado y las necesidades de tu trabajo.</p></div>
          <div className="extras-grid">
            <article><FilePenLine /><div><h3>Formato y estructura</h3><p>Normas APA, bibliografía, índices automáticos, índice de tablas y figuras.</p></div></article>
            <article><BookOpenCheck /><div><h3>Encuestas y datos</h3><p>Google Forms, codificación, tabulación y organización de respuestas.</p></div></article>
            <article><Target /><div><h3>Análisis estadístico</h3><p>Tablas, gráficos e interpretación clara de resultados para tu investigación.</p></div></article>
            <article><GraduationCap /><div><h3>Defensa y exposición</h3><p>Presentación profesional y preparación personalizada para la exposición oral.</p></div></article>
          </div>
          <a className="button extras-cta" href="#contacto">Consultar servicios específicos <ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="faq section" id="preguntas">
        <div className="container faq-grid"><div><span className="section-kicker">PREGUNTAS FRECUENTES</span><h2>Antes de empezar</h2><p>Si tu duda no está acá, escribinos. El primer diagnóstico es gratuito.</p></div><div className="accordion">{faqs.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>{q}<ChevronDown /></button><div><p>{a}</p></div></div>)}</div></div>
      </section>

      <section className="contact section" id="contacto">
        <div className="container contact-card">
          <div className="contact-copy"><span className="section-kicker light">DIAGNÓSTICO GRATUITO</span><h2>Contanos dónde estás. Te ayudamos a definir el próximo paso.</h2><p>Completá estos datos y elegí cómo querés conversar. Tu borrador queda guardado en este dispositivo por si volvés más tarde.</p><div className="contact-info"><a href={buildWhatsApp("asesoría académica")}><MessageCircle />+595 993 372593</a><a href={`mailto:${EMAIL}`}><Mail />{EMAIL}</a></div></div>
          <form className="contact-form" onSubmit={sendEmail}>
            <label>¿Cómo te llamás?<input name="name" autoComplete="name" maxLength={100} value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" /></label>
            <fieldset><legend>¿Qué servicio te interesa?</legend><div className="service-options">{services.map(s => <button type="button" key={s.title} className={selected === s.title ? "selected" : ""} onClick={() => setSelected(s.title)}>{selected === s.title && <Check size={14} />}{s.title}</button>)}</div></fieldset>
            <label>Contanos brevemente<textarea name="detail" maxLength={2000} value={detail} onChange={e => setDetail(e.target.value)} placeholder="Ej.: Tengo el anteproyecto y necesito revisar la metodología…" rows={4} /></label>
            <div className="form-actions"><a className="button whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => localStorage.removeItem("tustareas-contact-draft")}><MessageCircle size={18} />Enviar por WhatsApp</a><button className="button email" type="submit"><Mail size={18} />Enviar por correo</button></div>
            <small><ShieldCheck size={14} /> Tu información se utiliza únicamente para responder esta consulta.</small>
          </form>
        </div>
      </section>

      <section className="payments section" id="pagos">
        <div className="container payments-shell">
          <div className="payments-intro"><span className="section-kicker light">FORMAS DE PAGO</span><h2>Elegí la opción que te resulte más simple</h2><p>Al confirmar tu propuesta te compartimos los datos exactos del receptor. Verificamos cada pago antes de iniciar la etapa acordada.</p></div>
          <div className="payment-methods">
            <article><Landmark /><span><b>Transferencia bancaria</b>Desde bancos habilitados en Paraguay mediante SIPAP.</span></article>
            <article><WalletCards /><span><b>Billeteras y giros</b>Tigo Money, Personal Pay o Mango, según disponibilidad.</span></article>
            <article><ShieldCheck /><span><b>Confirmación segura</b>Comprobante y validación antes de comenzar.</span></article>
          </div>
          <div className="payment-carousel" aria-label="Bancos y billeteras disponibles">
            <div className="payment-track">
              {[...paymentOptions, ...paymentOptions].map(([logo, paymentName, type, logoClass], index) => <div className={`payment-chip payment-logo-${logoClass}`} key={`${paymentName}-${index}`} aria-hidden={index >= paymentOptions.length}><span><Image src={logo} width={94} height={52} alt="" /></span><div><b>{paymentName}</b><small>{type}</small></div></div>)}
            </div>
          </div>
          <p className="payment-note">La cuenta o billetera disponible y cualquier costo aplicable se confirman en la propuesta. Nunca envíes dinero a datos que no hayan sido compartidos por nuestros canales oficiales.</p>
        </div>
      </section>

      <footer><div className="container footer-grid"><a href="#inicio" className="brand brand-footer"><Image className="brand-logo footer-logo" src="/logo-tustareas-invertido.png" width={718} height={316} alt="tustareas.py — Tareas, Proyectos, Tesis" /></a><p>Asesoría académica profesional para estudiantes de cualquier lugar.</p><div className="socials"><a href="https://www.instagram.com/tustareas.py/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a><a href={buildWhatsApp("asesoría académica")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle /></a><a href={`mailto:${EMAIL}`} aria-label="Correo"><Mail /></a></div></div><div className="container footer-bottom"><span>© 2026 tustareas.py</span><span>Confidencialidad · Compromiso · Rigor académico</span></div></footer>

      {cookieOpen && <div className="cookie-banner" role="dialog" aria-label="Preferencias de privacidad"><div><b>Tu privacidad nos importa</b><p>Guardamos localmente tus preferencias y el borrador del formulario. No instalamos publicidad ni vendemos tus datos.</p></div><div><button onClick={() => consent("essential")}>Solo esenciales</button><button className="button button-small" onClick={() => consent("accepted")}>Aceptar</button></div></div>}
      <a className="float-whatsapp" href={buildWhatsApp("asesoría académica")} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"><MessageCircle /></a>
    </main>
  );
}
