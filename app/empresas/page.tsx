"use client";

import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/psic-danielreyna/espacios-disponibles";
const EMAIL = "empresas@danielreyna.com";

export default function EmpresasPage() {
  return (
    <main className="empresas-root">

      {/* ── NAV ── */}
      <nav className="empresas-nav">
        <Link href="/" className="empresas-nav-logo">
          <span>daniel</span>reyna.com
        </Link>
        <div className="empresas-nav-links">
          <a href="#metodologia">Metodología</a>
          <a href="#planes">Planes</a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="empresas-nav-cta"
          >
            Agendar llamada
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="empresas-hero">
        <div className="empresas-hero-copy">
          <p className="empresas-eyebrow">Consultoría organizacional · Monterrey, NL</p>
          <h1 className="empresas-h1">
            Tu empresa tiene un problema.<br />
            <em>RAÍZ tiene la metodología.</em>
          </h1>
          <p className="empresas-hero-sub">
            Diagnóstico real, intervención basada en evidencia y acompañamiento
            continuo. No charlas motivacionales — resultados medibles en
            rotación, clima laboral y cumplimiento NOM-035.
          </p>
          <div className="empresas-hero-actions">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="empresas-btn-primary"
            >
              Agendar diagnóstico gratuito
            </a>
            <a href="#planes" className="empresas-btn-ghost">
              Ver planes
            </a>
          </div>
        </div>

        <div className="empresas-hero-stats">
          <div className="empresas-stat">
            <span className="empresas-stat-num">NOM-035</span>
            <span className="empresas-stat-label">
              Cumplimiento normativo incluido en todos los planes
            </span>
          </div>
          <hr className="empresas-stat-divider" />
          <div className="empresas-stat">
            <span className="empresas-stat-num">4 fases</span>
            <span className="empresas-stat-label">
              Metodología estructurada, no intervenciones aisladas
            </span>
          </div>
          <hr className="empresas-stat-divider" />
          <div className="empresas-stat">
            <span className="empresas-stat-num">Retainer</span>
            <span className="empresas-stat-label">
              Aliado estratégico continuo, no consultor de visita única
            </span>
          </div>
          <hr className="empresas-stat-divider" />
          <div className="empresas-stat">
            <span className="empresas-stat-num">Cédula 14822054</span>
            <span className="empresas-stat-label">
              Psicólogo clínico licenciado — criterio clínico + metodología
            </span>
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA RAÍZ ── */}
      <section className="empresas-method" id="metodologia">
        <div className="empresas-method-step">
          <span className="empresas-step-letter">R — Reconocimiento</span>
          <span className="empresas-step-name">Diagnóstico</span>
          <span className="empresas-step-desc">
            Entrevistas, instrumentos NOM-035 y mapeo de riesgo psicosocial por área.
          </span>
        </div>
        <div className="empresas-method-step">
          <span className="empresas-step-letter">A — Análisis</span>
          <span className="empresas-step-name">Causas raíz</span>
          <span className="empresas-step-desc">
            Reporte ejecutivo con semáforo de riesgo y prioridades de intervención.
          </span>
        </div>
        <div className="empresas-method-step">
          <span className="empresas-step-letter">I — Intervención</span>
          <span className="empresas-step-name">Acción</span>
          <span className="empresas-step-desc">
            Talleres, sesiones grupales e intervención en rotación de personal.
          </span>
        </div>
        <div className="empresas-method-step last">
          <span className="empresas-step-letter">Z — Zona de cambio</span>
          <span className="empresas-step-name">Seguimiento</span>
          <span className="empresas-step-desc">
            Retainer mensual. Métricas reales. Presencia continua.
          </span>
        </div>
      </section>

      {/* ── PLANES ── */}
      <section className="empresas-tiers" id="planes">
        <p className="empresas-section-label">Planes</p>
        <div className="empresas-tiers-grid">

          {/* Diagnóstico */}
          <div className="empresas-tier-card">
            <div>
              <p className="empresas-tier-name">Diagnóstico RAÍZ</p>
              <p className="empresas-tier-target">Entrada · proyecto único</p>
              <p className="empresas-tier-price">Pago único · precio según empresa</p>
            </div>
            <hr className="empresas-tier-divider" />
            <ul className="empresas-tier-items">
              <li><CheckIcon />Entrevista con dirección / RRHH</li>
              <li><CheckIcon />Instrumentos NOM-035 y clima organizacional</li>
              <li><CheckIcon />Reporte ejecutivo con semáforo de riesgo</li>
              <li><CheckIcon />Sesión de presentación de resultados</li>
              <li><CheckIcon />Propuesta de intervención priorizada</li>
            </ul>
          </div>

          {/* Esencial */}
          <div className="empresas-tier-card">
            <div>
              <p className="empresas-tier-name">Membresía Esencial</p>
              <p className="empresas-tier-target">PyMEs · 10–80 colaboradores</p>
              <p className="empresas-tier-price">$12,000–$18,000 MXN / mes</p>
            </div>
            <hr className="empresas-tier-divider" />
            <ul className="empresas-tier-items">
              <li><CheckIcon />1 taller mensual in-company (3 hrs)</li>
              <li><CheckIcon />Seguimiento de indicadores clave</li>
              <li><CheckIcon />Sesión mensual con dirección / RRHH</li>
              <li><CheckIcon />Módulo de intervención en rotación</li>
              <li><CheckIcon />Reporte semestral de avance</li>
            </ul>
          </div>

          {/* Integral */}
          <div className="empresas-tier-card featured">
            <div>
              <span className="empresas-tier-badge">Más completo</span>
              <p className="empresas-tier-name">Membresía Integral</p>
              <p className="empresas-tier-target">Empresas medianas · 80–300 col.</p>
              <p className="empresas-tier-price">$22,000–$35,000 MXN / mes</p>
            </div>
            <hr className="empresas-tier-divider" />
            <ul className="empresas-tier-items">
              <li><CheckIcon />Todo lo de Esencial</li>
              <li><CheckIcon />Sesiones grupales con empleados (2/mes)</li>
              <li><CheckIcon />2 talleres o conferencias mensuales</li>
              <li><CheckIcon />Reporte trimestral con métricas de impacto</li>
              <li><CheckIcon />Asesoría en cumplimiento NOM-035</li>
              <li><CheckIcon />Diagnóstico RAÍZ incluido en mes 1</li>
            </ul>
          </div>

          {/* Aliado */}
          <div className="empresas-tier-card">
            <div>
              <span className="empresas-tier-badge premium">Premium</span>
              <p className="empresas-tier-name">Aliado Estratégico</p>
              <p className="empresas-tier-target">Corporativos · 300+ colaboradores</p>
              <p className="empresas-tier-price">Cotización a medida</p>
            </div>
            <hr className="empresas-tier-divider" />
            <ul className="empresas-tier-items">
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
      <div className="empresas-disclaimer">
        <InfoIcon />
        <p>
          Los tiempos de impacto varían según el tamaño de la organización, la
          complejidad del problema identificado en el diagnóstico y el nivel de
          apertura de la dirección al proceso. Lo que sí es constante: metodología
          clara, entregables concretos y acompañamiento en cada etapa.
        </p>
      </div>

      {/* ── CTA FINAL ── */}
      <section className="empresas-cta">
        <h2 className="empresas-cta-h2">¿Listo para una conversación real?</h2>
        <p className="empresas-cta-sub">
          30 minutos para entender el contexto de tu empresa — sin venta, sin
          compromiso.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="empresas-btn-primary large"
        >
          Agendar llamada gratuita
        </a>
        <p className="empresas-cta-footer">
          O escríbenos a{" "}
          <a href={`mailto:${EMAIL}`} className="empresas-email-link">
            {EMAIL}
          </a>
        </p>
      </section>

      {/* ── ESTILOS ── */}
      <style>{`
        /* ── Tokens de color ── */
        .empresas-root {
          --teal:       #0F6E56;
          --teal-mid:   #1D9E75;
          --teal-light: #E1F5EE;
          --teal-text:  #085041;
          --teal-dark:  #04342C;

          background: var(--bg, #ffffff);
          color: var(--fg, #1a1a1a);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .empresas-root {
            --bg: #0e1210;
            --fg: #e8ede9;
            --border-c: rgba(255,255,255,0.09);
            --card-bg: #151c18;
            --muted: #8a9e92;
            --stat-bg: #131a16;
          }
        }
        @media (prefers-color-scheme: light) {
          .empresas-root {
            --bg: #ffffff;
            --fg: #1a1a1a;
            --border-c: rgba(0,0,0,0.08);
            --card-bg: #f8faf9;
            --muted: #6b7c74;
            --stat-bg: #f2f7f4;
          }
        }

        /* ── NAV ── */
        .empresas-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 40px;
          border-bottom: 1px solid var(--border-c);
          position: sticky;
          top: 0;
          background: var(--bg);
          z-index: 50;
        }
        .empresas-nav-logo {
          font-size: 15px;
          font-weight: 600;
          color: var(--fg);
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .empresas-nav-logo span {
          color: var(--teal);
        }
        .empresas-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .empresas-nav-links a {
          font-size: 14px;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .empresas-nav-links a:hover {
          color: var(--fg);
        }
        .empresas-nav-cta {
          background: var(--teal) !important;
          color: #fff !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          padding: 9px 20px !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          transition: background 0.15s !important;
        }
        .empresas-nav-cta:hover {
          background: var(--teal-mid) !important;
          color: #fff !important;
        }

        /* ── HERO ── */
        .empresas-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
          padding: 72px 40px 64px;
          border-bottom: 1px solid var(--border-c);
        }
        .empresas-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 18px;
        }
        .empresas-h1 {
          font-size: 36px;
          font-weight: 600;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: var(--fg);
          margin-bottom: 18px;
        }
        .empresas-h1 em {
          font-style: normal;
          color: var(--teal);
        }
        .empresas-hero-sub {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .empresas-hero-actions {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }
        .empresas-btn-primary {
          display: inline-block;
          background: var(--teal);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .empresas-btn-primary:hover {
          background: var(--teal-mid);
        }
        .empresas-btn-primary.large {
          font-size: 15px;
          padding: 14px 32px;
        }
        .empresas-btn-ghost {
          font-size: 14px;
          color: var(--muted);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .empresas-btn-ghost:hover {
          color: var(--fg);
        }

        /* Stats box */
        .empresas-hero-stats {
          background: var(--stat-bg);
          border: 1px solid var(--border-c);
          border-radius: 14px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .empresas-stat {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .empresas-stat-num {
          font-size: 22px;
          font-weight: 600;
          color: var(--teal);
          letter-spacing: -0.02em;
        }
        .empresas-stat-label {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.45;
        }
        .empresas-stat-divider {
          border: none;
          border-top: 1px solid var(--border-c);
          margin: 0;
        }

        /* ── METODOLOGÍA STRIP ── */
        .empresas-method {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-c);
        }
        .empresas-method-step {
          padding: 28px 24px;
          border-right: 1px solid var(--border-c);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .empresas-method-step.last {
          border-right: none;
        }
        .empresas-step-letter {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--teal);
        }
        .empresas-step-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--fg);
        }
        .empresas-step-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.55;
        }

        /* ── PLANES ── */
        .empresas-tiers {
          padding: 56px 40px;
          border-bottom: 1px solid var(--border-c);
        }
        .empresas-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 28px;
        }
        .empresas-tiers-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }
        .empresas-tier-card {
          background: var(--card-bg);
          border: 1px solid var(--border-c);
          border-radius: 14px;
          padding: 22px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .empresas-tier-card.featured {
          border: 2px solid var(--teal-mid);
        }
        .empresas-tier-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 6px;
          background: var(--teal-light);
          color: var(--teal-text);
          margin-bottom: 6px;
        }
        .empresas-tier-badge.premium {
          background: #f0eefe;
          color: #3C3489;
        }
        @media (prefers-color-scheme: dark) {
          .empresas-tier-badge {
            background: rgba(15, 110, 86, 0.25);
            color: #5DCAA5;
          }
          .empresas-tier-badge.premium {
            background: rgba(83, 74, 183, 0.25);
            color: #AFA9EC;
          }
        }
        .empresas-tier-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--fg);
          margin: 0;
        }
        .empresas-tier-target {
          font-size: 11px;
          color: var(--muted);
          margin: 3px 0 6px;
        }
        .empresas-tier-price {
          font-size: 13px;
          font-weight: 600;
          color: var(--teal);
          margin: 0;
        }
        .empresas-tier-divider {
          border: none;
          border-top: 1px solid var(--border-c);
          margin: 0;
        }
        .empresas-tier-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .empresas-tier-items li {
          font-size: 12px;
          color: var(--muted);
          display: flex;
          gap: 7px;
          align-items: flex-start;
          line-height: 1.45;
        }
        .empresas-tier-items li svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--teal-mid);
        }

        /* ── DISCLAIMER ── */
        .empresas-disclaimer {
          padding: 20px 40px;
          background: var(--stat-bg);
          border-bottom: 1px solid var(--border-c);
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .empresas-disclaimer svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--muted);
        }
        .empresas-disclaimer p {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ── CTA FINAL ── */
        .empresas-cta {
          padding: 80px 40px;
          text-align: center;
        }
        .empresas-cta-h2 {
          font-size: 28px;
          font-weight: 600;
          color: var(--fg);
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .empresas-cta-sub {
          font-size: 15px;
          color: var(--muted);
          margin-bottom: 32px;
        }
        .empresas-cta-footer {
          font-size: 13px;
          color: var(--muted);
          margin-top: 16px;
        }
        .empresas-email-link {
          color: var(--teal);
          text-decoration: none;
        }
        .empresas-email-link:hover {
          text-decoration: underline;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .empresas-hero {
            grid-template-columns: 1fr;
            padding: 48px 24px;
            gap: 36px;
          }
          .empresas-method {
            grid-template-columns: repeat(2, 1fr);
          }
          .empresas-method-step {
            border-right: 1px solid var(--border-c);
            border-bottom: 1px solid var(--border-c);
          }
          .empresas-method-step.last {
            border-right: none;
          }
          .empresas-tiers-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .empresas-nav {
            padding: 14px 24px;
          }
          .empresas-tiers {
            padding: 40px 24px;
          }
          .empresas-cta {
            padding: 56px 24px;
          }
          .empresas-disclaimer {
            padding: 20px 24px;
          }
        }
        @media (max-width: 560px) {
          .empresas-h1 { font-size: 26px; }
          .empresas-method { grid-template-columns: 1fr; }
          .empresas-method-step { border-right: none; }
          .empresas-tiers-grid { grid-template-columns: 1fr; }
          .empresas-nav-links a:not(.empresas-nav-cta) { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
    </main>
  );
}

/* ── Íconos inline ── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.5L5.5 9.5L10.5 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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