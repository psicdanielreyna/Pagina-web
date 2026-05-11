import "./ansiedad.css";
import { SubscribeForm } from "@/app/newsletter/subscribe-form";

export const metadata = {
  title: "5 señales de ansiedad que estás ignorando — Guía gratuita",
  description:
    "Descarga gratis y descubre cómo la ansiedad se disfraza de cansancio, irritabilidad o falta de concentración. Por Daniel Reyna, psicólogo.",
  openGraph: {
    title: "5 señales de ansiedad que estás ignorando",
    description: "Guía gratuita de Daniel Reyna, psicólogo.",
    url: "https://danielreyna.com/ansiedad",
    images: [{ url: "https://danielreyna.com/og-ansiedad.jpg", width: 1200, height: 630 }],
  },
};

const signals = [
  "Por qué te cansas aunque no hayas hecho nada físico",
  "La señal en tu cuerpo que casi nadie asocia con ansiedad",
  "Cómo distinguir preocupación normal de ansiedad crónica",
  "Qué pasa en tu sistema nervioso cuando estás 'en alerta'",
  "Cuándo es momento de buscar acompañamiento profesional",
];

export default function AnsiedadPage() {
  return (
    <div className="lp-root">
      <div className="lp-bg" />

      <div className="lp-inner">
        <p className="lp-eyebrow">Guía gratuita</p>

        <h1 className="lp-headline">
          5 señales de ansiedad que <em>estás ignorando</em>
        </h1>

        <p className="lp-sub">
          Descubre cómo la ansiedad se disfraza de cansancio, irritabilidad
          o falta de concentración — y qué hacer al respecto.
        </p>

        <div className="lp-signals">
          <p className="lp-signals-label">Lo que vas a aprender</p>
          {signals.map((s, i) => (
            <div className="lp-signal" key={i}>
              <span className="lp-signal-dot" />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="lp-form-wrapper">
          <SubscribeForm />
        </div>

        <p className="lp-disclaimer">
          Sin spam. Solo contenido útil sobre salud mental.<br />
          Puedes darte de baja cuando quieras.
        </p>
      </div>

      <footer className="lp-footer">
        <a href="/privacidad">Privacidad</a> · <a href="/">danielreyna.com</a>
      </footer>
    </div>
  );
}