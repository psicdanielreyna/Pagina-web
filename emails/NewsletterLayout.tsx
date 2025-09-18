// emails/NewsletterLayout.tsx
import {
  Html, Head, Preview, Body, Container, Section, Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

type Props = {
  preview?: string;
  children: React.ReactNode;
};

export default function NewsletterLayout({ preview, children }: Props) {
  return (
    <Html lang="es">
      <Head />
      {preview ? <Preview>{preview}</Preview> : null}
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: {
                  bg: "#fff8f0",
                  card: "#ffffff",
                  text: "#0f172a",
                  muted: "#475569",
                  primary: "#246b3d",
                  pill: "#0f172a",
                },
              },
            },
          },
        }}
      >
        <Body className="m-0 bg-brand-bg px-0 py-6">
          {/* outer container */}
          <Container className="mx-auto w-full max-w-[600px]">
            {/* header */}
            <Section className="text-center">
              <a href="https://danielreyna.com" target="_blank" rel="noreferrer">
                <Img
                  src="https://danielreyna.com/logo.png"
                  alt="Daniel Reyna – Psicólogo"
                  width={140}
                  className="mx-auto my-6"
                />
              </a>
            </Section>

            {/* card */}
            <Section className="rounded-lg bg-brand-card p-24 px-6 shadow-sm">
              {children}
            </Section>

            {/* footer */}
            <Section className="px-6 text-center text-[12px] leading-5 text-brand-muted">
              <p className="mt-6">
                Recibes este correo porque te suscribiste en{" "}
                <a href="https://danielreyna.com" className="text-brand-primary underline">
                  danielreyna.com
                </a>.
              </p>
              <p>
                <a href="{{unsubscribe_url}}" className="text-brand-primary underline">
                  Cancelar suscripción
                </a>{" "}
                ·{" "}
                <a href="mailto:danielreyna@danielreyna.com" className="text-brand-primary underline">
                  Contacto
                </a>
              </p>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}