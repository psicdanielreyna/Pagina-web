import type { Metadata } from "next";
import { Suspense } from "react";
import Analytics from "@/app/analytics";
import TrackCTAs from "@/components/TrackCTAs";

export const metadata: Metadata = {
  title: "Consultoría organizacional para empresas | Daniel Reyna",
  description:
    "Diagnóstico real, intervención basada en evidencia y acompañamiento continuo. Metodología RAÍZ para empresas en Monterrey. NOM-035, clima laboral y rotación de personal.",
  openGraph: {
    type: "website",
    url: "https://danielreyna.com/empresas",
    siteName: "Daniel Reyna – Psicólogo",
    title: "Consultoría organizacional para empresas | Daniel Reyna",
    description:
      "Metodología RAÍZ: diagnóstico, intervención y seguimiento continuo para empresas en Monterrey.",
    images: [
      {
        url: "/og/empresas.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Reyna – Consultoría organizacional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultoría organizacional para empresas | Daniel Reyna",
    images: ["/og/empresas.jpg"],
  },
};

export default function EmpresasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <Analytics />
        <TrackCTAs />
      </Suspense>
    </>
  );
}