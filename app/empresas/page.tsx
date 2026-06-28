"use client";

import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/psic-danielreyna/espacios-disponibles";
const EMAIL = "empresas@danielreyna.com";

export default function EmpresasPage() {
  return (
    <main className="ep-root">

      {/* ── NAV ── */}
      <nav className="ep-nav">
        <Link href="/" className="ep-logo">
          Daniel Reyna
          <span className="ep-logo-sep"> · </span>
          <span className="ep-logo-tag">Empresas</span>
        </Link>
        <div className="ep-nav-links">
          <a href="#metodologia">Metodología</a>
          <a href="#planes">Planes</a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="ep-nav-cta">
            Agendar llamada
          </a>
        </div>
      </nav>

      {/* ── HERO CENTRADO ── */}
      <section className="ep-hero">
        <p className="ep-eyebrow">Psicología organizacional · Monterrey, NL</p>
        <h1 className="ep-h1">
          Problemas de clima, rotación y NOM-035<br />
          <em>resueltos con metodología.</em>
        </h1>
        <p className="ep-hero-sub">
          Soy Daniel Reyna, psicólogo clínico con enfoque organizacional. Trabajo con
          empresas que quieren resultados reales — no talleres de motivación que no
          cambian nada.
        </p>
        <div className="ep-hero-actions">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="ep-btn-primary">
            Agendar llamada gratuita
          </a>
          <a href="#metodologia" className="ep-btn-secondary">
            Ver metodología RAÍZ
          </a>
        </div>
      </section>

      {/* ── PROOF BAR ── */}
      <div className="ep-proof-bar">
        <div className="ep-proof-item">
          <span className="ep-proof-num">NOM-035</span>
          <span className="ep-proof-label">Cumplimiento normativo en todos los planes</span>
        </div>
        <div className="ep-proof-item">
          <span className="ep-proof-num">4 fases</span>
          <span className="ep-proof-label">Metodología estructurada con entregables claros</span>
        </div>
        <div className="ep-proof-item">
          <span className="ep-proof-num">Retainer</span>
          <span className="ep-proof-label">Aliado estratégico, no consultor de visita</span>
        </div>
        <div className="ep-proof-item last">
          <span className="ep-proof-num">Cédula</span>
          <span className="ep-proof-label">Profesional licenciado — 14822054</span>
        </div>
      </div>

      {/* ── METODOLOGÍA ── */}
      <section className="ep-method" id="metodologia">
        <p className="ep-section-label">Metodología RAÍZ</p>
        <div className="ep-method-table">

          <div className="ep-method-row">
            <span className="ep-method-letter">R — Reconocimiento</span>
            <span className="ep-method-name">Diagnóstico de entrada</span>
            <span className="ep-method-desc">
              Entrevistas con dirección, aplicación de instrumentos y mapeo de riesgo
              psicosocial por área. Entregable: reporte ejecutivo con semáforo de riesgo.
            </span>
          </div>

          <div className="ep-method-row">
            <span className="ep-method-letter">A — Análisis</span>
            <span className="ep-method-name">Causas raíz</span>
            <span className="ep-method-desc">
              Identificación de las 3 causas principales con evidencia. Distinción entre
              burnout, liderazgo tóxico y cultura de queja — porque cada una tiene una
              intervención distinta.
            </span>
          </div>

          <div className="ep-method-row">
            <span className="ep-method-letter">I — Intervención</span>
            <span className="ep-method-name">Acción basada en datos</span>
            <span className="ep-method-desc">
              Talleres, sesiones grupales, intervención en rotación y formación de líderes.
              Todo diseñado a partir del diagnóstico, no de plantillas genéricas.
            </span>
          </div>

          <div className="ep-method-row last">
            <span className="ep-method-letter">Z — Zona de cambio</span>
            <span className="ep-method-name">Seguimiento continuo</span>
            <span className="ep-method-desc">
              Retainer mensual con métricas de impacto reales. Presencia constante como
              aliado estratégico — no desaparezco después de la primera intervención.
            </span>
          </div>

        </div>
      </section>

      {/* ── PLANES ── */}
      <section className="ep-tiers" id="planes">
        <p className="ep-section-label">Planes</p>
        <div className="ep-tiers-grid">

          <div className="ep-card">
            <p className="ep-card-name">Diagnóstico RAÍZ</p>
            <p className="ep-card-target">Entrada · proyecto único</p>
            <p className="ep-card-price">Pago único · precio según empresa</p>
            <hr className="ep-card-divider" />
            <ul className="ep-card-items">
              <li><CheckIcon />Instrumentos NOM-035 y clima organizacional</li>
              <li><CheckIcon />Reporte ejecutivo con semáforo de riesgo</li>
              <li><CheckIcon />Sesión de presentación con dirección</li>
              <li><CheckIcon />Propuesta de intervención priorizada</li>
            </ul>
          </div>

          <div className="ep-card">
            <p className="ep-card-name">Membresía Esencial</p>
            <p className="ep-card-target">PyMEs · 10–80 colaboradores</p>
            <p className="ep-card-price">$12,000–$18,000 MXN / mes</p>
            <hr className="ep-card-divider" />
            <ul className="ep-card-items">
              <li><CheckIcon />1 taller mensual in-company (3 hrs)</li>
              <li><CheckIcon />Seguimiento de indicadores clave</li>
              <li><CheckIcon />Sesión mensual con dirección / RRHH</li>
              <li><CheckIcon />Módulo de intervención en rotación</li>
              <li><CheckIcon />Reporte semestral de avance</li>
            </ul>
          </div>

          <div className="ep-card featured">
            <span className="ep-badge">Más completo</span>
            <p className="ep-card-name">Membresía Integral</p>
            <p className="ep-card-target">Empresas medianas · 80–300 col.</p>
            <p className="ep-card-price">$22,000–$35,000 MXN / mes</p>
            <hr className="ep-card-divider" />
            <ul className="ep-card-items">
              <li><CheckIcon />Todo lo de Esencial</li>
              <li><CheckIcon />Sesiones grupales con empleados (2/mes)</li>
              <li><CheckIcon />2 talleres o conferencias mensuales</li>
              <li><CheckIcon />Reporte trimestral con métricas de impacto</li>
              <li><CheckIcon />Diagnóstico RAÍZ incluido en mes 1</li>
            </ul>
          </div>

          <div className="ep-card">
            <span className="ep-badge premium">Premium</span>
            <p className="ep-card-name">Aliado Estratégico</p>
            <p className="ep-card-target">Corporativos · 300+ colaboradores</p>
            <p className="ep-card-price">Cotización a medida</p>
            <hr className="ep-card-divider" />
            <ul className="ep-card-items">
              <li><CheckIcon />Todo lo de Integral</li>
              <li><CheckIcon />Presencia semanal en instalaciones</li>
              <li><CheckIcon />Formación de líderes (programa estructurado)</li>
              <li><CheckIcon />Sesiones grupales ilimitadas</li>
              <li><CheckIcon />Panel de métricas en tiempo real</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="ep-disclaimer">
        <InfoIcon />
        <p>
          Los tiempos de impacto varían según el tamaño de la organización y la
          complejidad del problema. Lo que sí garantizo: metodología estructurada,
          entregables concretos y acompañamiento en cada etapa del proceso.
        </p>
      </div>

      {/* ── CTA FINAL ── */}
      <section className="ep-cta">
        <h2 className="ep-cta-h2">¿Listo para una conversación real?</h2>
        <p className="ep-cta-sub">30 minutos para entender tu empresa. Sin venta, sin compromiso.</p>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="ep-btn-primary large">
          Agendar llamada gratuita
        </a>
        <p className="ep-cta-note">
          O escríbenos a{" "}
          <a href={`mailto:${EMAIL}`} className="ep-email-link">{EMAIL}</a>
        </p>
      </section>

      {/* ── ESTILOS ── */}
      <style>{`
        .ep-root {
          --teal:      #0F6E56;
          --teal-mid:  #1D9E75;
          --teal-lt:   #E1F5EE;
          --teal-txt:  #085041;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }
        @media (prefers-color-scheme: light) {
          .ep-root {
            --bg:       #ffffff;
            --fg:       #1a1a1a;
            --border-c: rgba(0,0,0,0.08);
            --card-bg:  #f8faf9;
            --muted:    #6b7c74;
            --proof-bg: #f2f7f4;
          }
        }
        @media (prefers-color-scheme: dark) {
          .ep-root {
            --bg:       #0e1210;
            --fg:       #e8ede9;
            --border-c: rgba(255,255,255,0.09);
            --card-bg:  #151c18;
            --muted:    #8a9e92;
            --proof-bg: #131a16;
          }
        }
        .ep-root { background: var(--bg); color: var(--fg); }

        /* NAV */
        .ep-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 40px; border-bottom: 1px solid var(--border-c);
          position: sticky; top: 0; background: var(--bg); z-index: 50;
        }
        .ep-logo {
          font-size: 15px; font-weight: 600; color: var(--fg);
          text-decoration: none; letter-spacing: -0.01em;
          display: flex; align-items: baseline;
        }
        .ep-logo-sep { color: var(--muted); font-weight: 400; margin: 0 4px; }
        .ep-logo-tag { color: var(--teal); font-weight: 500; font-size: 13px; }
        .ep-nav-links { display: flex; align-items: center; gap: 28px; }
        .ep-nav-links a {
          font-size: 14px; color: var(--muted);
          text-decoration: none; transition: color 0.15s;
        }
        .ep-nav-links a:hover { color: var(--fg); }
        .ep-nav-cta {
          background: var(--teal) !important; color: #fff !important;
          font-size: 13px !important; font-weight: 500 !important;
          padding: 9px 20px !important; border-radius: 8px !important;
          text-decoration: none !important; transition: background 0.15s !important;
        }
        .ep-nav-cta:hover { background: var(--teal-mid) !important; color: #fff !important; }

        /* HERO */
        .ep-hero {
          padding: 80px 40px 64px; text-align: center;
          border-bottom: 1px solid var(--border-c);
        }
        .ep-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 0.09em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 20px;
        }
        .ep-h1 {
          font-size: 38px; font-weight: 600; line-height: 1.18;
          letter-spacing: -0.025em; color: var(--fg);
          margin-bottom: 20px; max-width: 640px; margin-left: auto; margin-right: auto;
        }
        .ep-h1 em { font-style: normal; color: var(--teal); }
        .ep-hero-sub {
          font-size: 16px; color: var(--muted); line-height: 1.7;
          max-width: 540px; margin: 0 auto 36px;
        }
        .ep-hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .ep-btn-primary {
          display: inline-block; background: var(--teal); color: #fff;
          font-size: 14px; font-weight: 500; padding: 12px 26px;
          border-radius: 8px; text-decoration: none; transition: background 0.15s;
          white-space: nowrap;
        }
        .ep-btn-primary:hover { background: var(--teal-mid); }
        .ep-btn-primary.large { font-size: 15px; padding: 14px 34px; }
        .ep-btn-secondary {
          display: inline-block; font-size: 14px; color: var(--muted);
          border: 1px solid var(--border-c); border-radius: 8px;
          padding: 12px 22px; text-decoration: none; transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .ep-btn-secondary:hover { color: var(--fg); border-color: var(--muted); }

        /* PROOF BAR */
        .ep-proof-bar {
          display: grid; grid-template-columns: repeat(4, minmax(0,1fr));
          border-bottom: 1px solid var(--border-c);
          background: var(--proof-bg);
        }
        .ep-proof-item {
          padding: 28px 24px; border-right: 1px solid var(--border-c);
          display: flex; flex-direction: column; gap: 6px;
          text-align: center;
        }
        .ep-proof-item.last { border-right: none; }
        .ep-proof-num {
          font-size: 20px; font-weight: 600; color: var(--teal);
          letter-spacing: -0.02em;
        }
        .ep-proof-label { font-size: 12px; color: var(--muted); line-height: 1.45; }

        /* METODOLOGÍA */
        .ep-method {
          padding: 56px 40px; border-bottom: 1px solid var(--border-c);
        }
        .ep-section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.09em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 28px;
        }
        .ep-method-table { display: flex; flex-direction: column; }
        .ep-method-row {
          display: grid; grid-template-columns: 160px 1fr 2fr;
          gap: 28px; padding: 22px 0;
          border-bottom: 1px solid var(--border-c);
          align-items: start;
        }
        .ep-method-row.last { border-bottom: none; }
        .ep-method-letter {
          font-size: 10px; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; color: var(--teal); padding-top: 3px;
        }
        .ep-method-name { font-size: 15px; font-weight: 600; color: var(--fg); }
        .ep-method-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

        /* PLANES */
        .ep-tiers { padding: 56px 40px; border-bottom: 1px solid var(--border-c); }
        .ep-tiers-grid {
          display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px;
        }
        .ep-card {
          background: var(--card-bg); border: 1px solid var(--border-c);
          border-radius: 14px; padding: 24px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .ep-card.featured { border: 2px solid var(--teal-mid); }
        .ep-badge {
          display: inline-block; font-size: 10px; font-weight: 600;
          padding: 3px 10px; border-radius: 6px;
          background: var(--teal-lt); color: var(--teal-txt);
          width: fit-content; margin-bottom: 4px;
        }
        .ep-badge.premium { background: #f0eefe; color: #3C3489; }
        @media (prefers-color-scheme: dark) {
          .ep-badge { background: rgba(15,110,86,0.25); color: #5DCAA5; }
          .ep-badge.premium { background: rgba(83,74,183,0.25); color: #AFA9EC; }
        }
        .ep-card-name { font-size: 16px; font-weight: 600; color: var(--fg); margin: 0; }
        .ep-card-target { font-size: 12px; color: var(--muted); margin: 2px 0 4px; }
        .ep-card-price { font-size: 13px; font-weight: 600; color: var(--teal); margin: 0; }
        .ep-card-divider { border: none; border-top: 1px solid var(--border-c); margin: 4px 0; }
        .ep-card-items {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .ep-card-items li {
          font-size: 13px; color: var(--muted);
          display: flex; gap: 8px; align-items: flex-start; line-height: 1.45;
        }
        .ep-card-items li svg { flex-shrink: 0; margin-top: 2px; color: var(--teal-mid); }

        /* DISCLAIMER */
        .ep-disclaimer {
          padding: 20px 40px; background: var(--proof-bg);
          border-bottom: 1px solid var(--border-c);
          display: flex; gap: 12px; align-items: flex-start;
        }
        .ep-disclaimer svg { flex-shrink: 0; margin-top: 3px; color: var(--muted); }
        .ep-disclaimer p { font-size: 13px; color: var(--muted); line-height: 1.6; }

        /* CTA */
        .ep-cta { padding: 88px 40px; text-align: center; }
        .ep-cta-h2 {
          font-size: 30px; font-weight: 600; color: var(--fg);
          letter-spacing: -0.02em; margin-bottom: 12px;
        }
        .ep-cta-sub { font-size: 15px; color: var(--muted); margin-bottom: 32px; }
        .ep-cta-note { font-size: 13px; color: var(--muted); margin-top: 16px; }
        .ep-email-link { color: var(--teal); text-decoration: none; }
        .ep-email-link:hover { text-decoration: underline; }

        /* RESPONSIVE */
        @media (max-width: 860px) {
          .ep-hero { padding: 56px 24px 48px; }
          .ep-h1 { font-size: 28px; }
          .ep-proof-bar { grid-template-columns: repeat(2, 1fr); }
          .ep-proof-item.last { border-right: 1px solid var(--border-c); }
          .ep-proof-item:nth-child(2) { border-right: none; }
          .ep-proof-item:nth-child(3) { border-top: 1px solid var(--border-c); }
          .ep-proof-item:nth-child(4) { border-top: 1px solid var(--border-c); border-right: none; }
          .ep-method { padding: 40px 24px; }
          .ep-method-row { grid-template-columns: 1fr; gap: 6px; }
          .ep-tiers { padding: 40px 24px; }
          .ep-tiers-grid { grid-template-columns: 1fr; }
          .ep-disclaimer { padding: 20px 24px; }
          .ep-cta { padding: 56px 24px; }
          .ep-nav { padding: 14px 24px; }
          .ep-nav-links a:not(.ep-nav-cta) { display: none; }
        }
        @media (max-width: 480px) {
          .ep-h1 { font-size: 24px; }
          .ep-proof-bar { grid-template-columns: 1fr; }
          .ep-proof-item,
          .ep-proof-item.last { border-right: none; border-top: none; border-bottom: 1px solid var(--border-c); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2.5 6.5L5.5 9.5L10.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}