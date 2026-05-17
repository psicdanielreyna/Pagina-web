import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Daniel Reyna – Psicólogo",
  description: "Aviso de privacidad y política de datos de Daniel Reyna, Psicólogo.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: false },
};

export default function LegalPage() {
  return (
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <div className="px-6 py-12" style={{ borderBottom: "0.5px solid var(--border)" }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>
            Legal
          </p>
          <h1 className="text-3xl font-medium tracking-tight" style={{ color: "var(--text-primary)" }}>
            Aviso de privacidad
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            Última actualización: mayo 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div
          className="rounded-2xl p-8 prose prose-sm max-w-none"
          style={{
            border: "0.5px solid var(--border)",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          }}
        >
          <h2>Responsable del tratamiento</h2>
          <p>Daniel Osvaldo González Reyna, Psicólogo. Correo de contacto: <a href="mailto:danielreyna@danielreyna.com" style={{ color: "var(--accent-text)" }}>danielreyna@danielreyna.com</a></p>

          <h2>Datos que recopilamos</h2>
          <p>Recopilamos los siguientes datos personales:</p>
          <ul>
            <li>Nombre y correo electrónico al suscribirte al newsletter</li>
            <li>Correo electrónico al realizar una compra</li>
            <li>Información de pago procesada por Stripe (no almacenamos datos de tarjetas)</li>
          </ul>

          <h2>Finalidad del tratamiento</h2>
          <ul>
            <li>Envío del newsletter semanal y recursos descargables</li>
            <li>Entrega de productos digitales adquiridos</li>
            <li>Comunicación relacionada con servicios de psicología</li>
          </ul>

          <h2>Base legal</h2>
          <p>El tratamiento se basa en tu consentimiento expreso al suscribirte o realizar una compra, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.</p>

          <h2>Compartición de datos</h2>
          <p>No vendemos ni compartimos tus datos con terceros, excepto con los proveedores necesarios para operar el sitio:</p>
          <ul>
            <li><strong>Resend</strong> — envío de correos electrónicos</li>
            <li><strong>Stripe</strong> — procesamiento de pagos</li>
            <li><strong>Netlify</strong> — hosting del sitio web</li>
          </ul>

          <h2>Tus derechos (ARCO)</h2>
          <p>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos. Para ejercer estos derechos, escríbeme a <a href="mailto:danielreyna@danielreyna.com" style={{ color: "var(--accent-text)" }}>danielreyna@danielreyna.com</a>.</p>

          <h2>Baja del newsletter</h2>
          <p>Puedes darte de baja en cualquier momento usando el enlace al final de cada correo o visitando <a href="/unsubscribe" style={{ color: "var(--accent-text)" }}>/unsubscribe</a>.</p>

          <h2>Cookies</h2>
          <p>Este sitio utiliza cookies técnicas necesarias para su funcionamiento y cookies de analítica anónima para mejorar la experiencia. No usamos cookies publicitarias.</p>

          <h2>Contacto</h2>
          <p>Para cualquier duda sobre privacidad: <a href="mailto:danielreyna@danielreyna.com" style={{ color: "var(--accent-text)" }}>danielreyna@danielreyna.com</a></p>
        </div>
      </div>
    </main>
  );
}