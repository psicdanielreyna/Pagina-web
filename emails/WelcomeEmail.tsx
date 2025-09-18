import * as React from "react";

type SocialLinks = {
  instagram?: string;
  youtube?: string;
  x?: string;
  website?: string;
};

export interface WelcomeEmailProps {
  // textos
  subject: string;
  preheader?: string;
  greetingName?: string; // opcional: “Daniel” -> “¡Hola, Daniel!”
  title?: string;        // por defecto: “¡Bienvenido!”
  subtitle?: string;     // bajada corta
  intro?: string;        // párrafo principal
  cta?: { label: string; href: string };

  // imágenes (usar urls absolutas)
  logoUrl: string;       // ej. https://danielreyna.com/logo-newsletter.png
  heroUrl?: string;      // ej. https://danielreyna.com/welcome-hero.jpg

  // pie
  brand?: string;        // “Daniel Reyna — Psicólogo”
  socials?: SocialLinks;
  unsubscribeUrl?: string;
}

export default function WelcomeEmail({
  subject,
  preheader = "¡Qué gusto tenerte aquí! Te cuento cómo aprovechar mejor el contenido.",
  greetingName,
  title = "¡Bienvenido!",
  subtitle = "Gracias por unirte. Te enviaré ideas claras y herramientas prácticas.",
  intro = "Cada semana recibirás un email breve con recursos de Terapia Cognitivo-Conductual fáciles de aplicar. Empieza hoy con tu primer recurso y, cuando quieras, responde a este correo: leo todo.",
  cta = { label: "Explorar recursos", href: "https://danielreyna.com/blog" },
  logoUrl,
  heroUrl,
  brand = "Daniel Reyna — Psicólogo",
  socials,
  unsubscribeUrl,
}: WelcomeEmailProps) {
  const hi = greetingName ? `¡Hola, ${greetingName}!` : "¡Hola!";

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{subject}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#0f172a", // slate-900 (oscuro elegante)
          fontFamily:
            "system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
          color: "#e5e7eb",
          lineHeight: 1.6,
        }}
      >
        {/* preheader oculto */}
        <div
          style={{
            display: "none",
            fontSize: 1,
            lineHeight: "1px",
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
            overflow: "hidden",
            color: "#0f172a",
          }}
        >
          {preheader}
        </div>

        <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "24px 12px" }}>
                {/* Card */}
                <table
                  role="presentation"
                  width={640}
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    width: "640px",
                    maxWidth: "100%",
                    background: "#0b1220", // un toque más oscuro para la tarjeta
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow:
                      "0 1px 2px rgba(0,0,0,.4), 0 10px 36px rgba(0,0,0,.35)",
                  }}
                >
                  <tbody>
                    {/* Header con logo */}
                    <tr>
                      <td
                        style={{
                          padding: "20px 24px",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
                        }}
                      >
                        <img
                          src={logoUrl}
                          alt={brand}
                          width="120"
                          style={{ display: "block" }}
                        />
                      </td>
                    </tr>

                    {/* Hero */}
                    {heroUrl && (
                      <tr>
                        <td>
                          <img
                            src={heroUrl}
                            alt=""
                            width="640"
                            style={{
                              width: "100%",
                              display: "block",
                              maxHeight: 340,
                              objectFit: "cover",
                            }}
                          />
                        </td>
                      </tr>
                    )}

                    {/* Texto principal */}
                    <tr>
                      <td style={{ padding: "28px 24px 10px 24px" }}>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#9ca3af",
                            marginBottom: 6,
                          }}
                        >
                          {hi}
                        </div>
                        <h1
                          style={{
                            margin: "0 0 6px 0",
                            fontSize: 28,
                            lineHeight: 1.25,
                            letterSpacing: "-0.01em",
                            color: "#ffffff",
                          }}
                        >
                          {title}
                        </h1>
                        <p
                          style={{
                            margin: "0 0 14px 0",
                            fontSize: 16,
                            color: "#cbd5e1",
                          }}
                        >
                          {subtitle}
                        </p>
                        <p style={{ margin: "0 0 18px 0", color: "#cbd5e1" }}>
                          {intro}
                        </p>

                        {/* bullets de beneficios */}
                        <ul
                          style={{
                            margin: "0 0 18px 18px",
                            padding: 0,
                            color: "#cbd5e1",
                          }}
                        >
                          <li>Recursos prácticos y aplicables.</li>
                          <li>Ideas breves y accionables.</li>
                          <li>Enfoque TCC claro y amable.</li>
                        </ul>

                        {/* CTA */}
                        <a
                          href={cta.href}
                          style={{
                            display: "inline-block",
                            background: "#166534",
                            color: "#fff",
                            textDecoration: "none",
                            padding: "12px 18px",
                            borderRadius: 10,
                            fontWeight: 700,
                          }}
                        >
                          {cta.label}
                        </a>

                        {/* Notita */}
                        <p
                          style={{
                            margin: "18px 0 0 0",
                            fontSize: 13,
                            color: "#94a3b8",
                          }}
                        >
                          PD: Si en algún momento ya no deseas recibir correos,
                          puedes darte de baja al final del email sin problema.
                        </p>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td
                        style={{
                          padding: "18px 24px 22px 24px",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                          background:
                            "linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
                          fontSize: 13,
                          color: "#94a3b8",
                        }}
                      >
                        <div style={{ marginBottom: 6 }}>{brand}</div>

                        {/* links */}
                        <div style={{ marginBottom: 8 }}>
                          {socials?.website && (
                            <>
                              <a
                                href={socials.website}
                                style={{
                                  color: "#a7f3d0",
                                  textDecoration: "none",
                                }}
                              >
                                Web
                              </a>{" "}
                              ·{" "}
                            </>
                          )}
                          {socials?.instagram && (
                            <>
                              <a
                                href={socials.instagram}
                                style={{
                                  color: "#cbd5e1",
                                  textDecoration: "none",
                                }}
                              >
                                Instagram
                              </a>{" "}
                              ·{" "}
                            </>
                          )}
                          {socials?.youtube && (
                            <>
                              <a
                                href={socials.youtube}
                                style={{
                                  color: "#cbd5e1",
                                  textDecoration: "none",
                                }}
                              >
                                YouTube
                              </a>{" "}
                              ·{" "}
                            </>
                          )}
                          {socials?.x && (
                            <a
                              href={socials.x}
                              style={{
                                color: "#cbd5e1",
                                textDecoration: "none",
                              }}
                            >
                              X
                            </a>
                          )}
                        </div>

                        {unsubscribeUrl && (
                          <div>
                            <a
                              href={unsubscribeUrl}
                              style={{ color: "#94a3b8", textDecoration: "underline" }}
                            >
                              Darse de baja
                            </a>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* /Card */}
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}