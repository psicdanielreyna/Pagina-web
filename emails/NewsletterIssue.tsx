// emails/NewsletterIssue.tsx
import * as React from "react";

type Section =
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] }
  | { type: "heading"; text: string };

export interface NewsletterIssueProps {
  subject: string;
  preheader?: string;
  logoUrl?: string;           // /logo.png
  heroUrl?: string;           // imagen opcional arriba
  title: string;              // título grande del número
  intro?: string;             // párrafo introductorio
  sections?: Section[];       // bloques de contenido
  cta?: { label: string; href: string };
  footer?: {
    siteName?: string;
    websiteUrl?: string;
    instagram?: string;
    youtube?: string;
    x?: string;
    unsubscribeUrl?: string;
  };
}

export default function NewsletterIssue({
  subject,
  preheader,
  logoUrl = "/logo.png",
  heroUrl,
  title,
  intro,
  sections = [],
  cta,
  footer = {},
}: NewsletterIssueProps) {
  // Preheader accesible (oculto visualmente en la mayoría de clientes)
  const preheaderText = preheader || "";

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
          background: "#f6f7f9",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          color: "#111827",
          lineHeight: 1.6,
        }}
      >
        {/* Preheader invisible */}
        {preheaderText ? (
          <div
            style={{
              display: "none",
              fontSize: 1,
              color: "#f6f7f9",
              lineHeight: "1px",
              maxHeight: 0,
              maxWidth: 0,
              opacity: 0,
              overflow: "hidden",
            }}
          >
            {preheaderText}
          </div>
        ) : null}

        <table
          role="presentation"
          cellPadding={0}
          cellSpacing={0}
          width="100%"
          style={{ width: "100%" }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "24px 12px" }}>
                <table
                  role="presentation"
                  cellPadding={0}
                  cellSpacing={0}
                  width={640}
                  style={{
                    width: "640px",
                    maxWidth: "100%",
                    background: "#ffffff",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow:
                      "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <tbody>
                    {/* Header */}
                    <tr>
                      <td
                        style={{
                          padding: "20px 24px",
                          borderBottom: "1px solid #f2f2f2",
                        }}
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                        >
                          <tbody>
                            <tr>
                              <td>
                                {logoUrl ? (
                                  <img
                                    src={logoUrl}
                                    width="120"
                                    alt="Daniel Reyna – Psicólogo"
                                    style={{ display: "block" }}
                                  />
                                ) : (
                                  <strong>Daniel Reyna – Psicólogo</strong>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Hero (opcional) */}
                    {heroUrl ? (
                      <tr>
                        <td>
                          <img
                            src={heroUrl}
                            alt=""
                            width="640"
                            style={{
                              width: "100%",
                              display: "block",
                              maxHeight: 360,
                              objectFit: "cover",
                            }}
                          />
                        </td>
                      </tr>
                    ) : null}

                    {/* Título */}
                    <tr>
                      <td style={{ padding: "28px 24px 8px 24px" }}>
                        <h1
                          style={{
                            margin: 0,
                            fontSize: 28,
                            lineHeight: 1.25,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {title}
                        </h1>
                      </td>
                    </tr>

                    {/* Intro */}
                    {intro ? (
                      <tr>
                        <td style={{ padding: "8px 24px 0 24px" }}>
                          <p style={{ margin: 0, fontSize: 16, color: "#374151" }}>
                            {intro}
                          </p>
                        </td>
                      </tr>
                    ) : null}

                    {/* Contenido */}
                    {sections.length ? (
                      <tr>
                        <td style={{ padding: "16px 24px 8px 24px" }}>
                          {sections.map((s, i) => {
                            if (s.type === "heading") {
                              return (
                                <h2
                                  key={i}
                                  style={{
                                    fontSize: 18,
                                    margin: "20px 0 8px 0",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {s.text}
                                </h2>
                              );
                            }
                            if (s.type === "list") {
                              return (
                                <ul
                                  key={i}
                                  style={{
                                    paddingLeft: 18,
                                    margin: "8px 0 12px 0",
                                    color: "#374151",
                                  }}
                                >
                                  {s.items.map((it, j) => (
                                    <li key={j} style={{ marginBottom: 6 }}>
                                      {it}
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            // paragraph
                            return (
                              <p
                                key={i}
                                style={{
                                  margin: "8px 0 12px 0",
                                  color: "#374151",
                                  fontSize: 16,
                                }}
                              >
                                {s.content}
                              </p>
                            );
                          })}
                        </td>
                      </tr>
                    ) : null}

                    {/* CTA */}
                    {cta ? (
                      <tr>
                        <td style={{ padding: "8px 24px 24px 24px" }}>
                          <a
                            href={cta.href}
                            style={{
                              display: "inline-block",
                              background: "#166534",
                              color: "#fff",
                              textDecoration: "none",
                              padding: "10px 16px",
                              borderRadius: 8,
                              fontWeight: 600,
                            }}
                          >
                            {cta.label}
                          </a>
                        </td>
                      </tr>
                    ) : null}

                    {/* Footer */}
                    <tr>
                      <td
                        style={{
                          padding: "18px 24px 22px 24px",
                          borderTop: "1px solid #f2f2f2",
                          background: "#fafafa",
                          fontSize: 13,
                          color: "#6b7280",
                        }}
                      >
                        <div style={{ marginBottom: 6 }}>
                          {footer.siteName || "Daniel Reyna — Psicólogo"}
                        </div>
                        <div style={{ marginBottom: 6 }}>
                          {footer.websiteUrl ? (
                            <a
                              href={footer.websiteUrl}
                              style={{ color: "#065f46", textDecoration: "none" }}
                            >
                              {footer.websiteUrl.replace(/^https?:\/\//, "")}
                            </a>
                          ) : null}
                        </div>
                        <div style={{ marginBottom: 6 }}>
                          {footer.instagram && (
                            <>
                              <a
                                href={footer.instagram}
                                style={{ color: "#374151", textDecoration: "none" }}
                              >
                                Instagram
                              </a>
                              {" · "}
                            </>
                          )}
                          {footer.youtube && (
                            <>
                              <a
                                href={footer.youtube}
                                style={{ color: "#374151", textDecoration: "none" }}
                              >
                                YouTube
                              </a>
                              {" · "}
                            </>
                          )}
                          {footer.x && (
                            <a
                              href={footer.x}
                              style={{ color: "#374151", textDecoration: "none" }}
                            >
                              X
                            </a>
                          )}
                        </div>
                        {footer.unsubscribeUrl ? (
                          <div>
                            <a
                              href={footer.unsubscribeUrl}
                              style={{ color: "#6b7280", textDecoration: "underline" }}
                            >
                              Darse de baja
                            </a>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}