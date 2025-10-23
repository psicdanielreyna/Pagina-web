// app/opiniones/nueva/page.tsx
export const metadata = {
  title: "Enviar opinión | Daniel Reyna",
  description: "Comparte tu experiencia con la terapia o los ebooks.",
  robots: { index: false },
};

export default function NuevaOpinionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Enviar opinión</h1>
      <p className="mt-2 text-slate-700">
        Gracias por compartir tu experiencia. Publicaremos solo iniciales y el texto, tras una breve revisión.
      </p>

      {/* Netlify Forms */}
      <form
        name="opiniones"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/opiniones/gracias"
        className="mt-8 space-y-5"
      >
        {/* Necesario para Netlify Forms */}
        <input type="hidden" name="form-name" value="opiniones" />
        {/* Honeypot */}
        <input type="text" name="bot-field" className="hidden" aria-hidden="true" />

        <div>
          <label className="block text-sm font-medium">Iniciales (ej. A. C.)</label>
          <input name="initials" required
                 className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select name="type" required className="mt-1 w-full rounded-md border px-3 py-2">
            <option value="therapy">Terapia</option>
            <option value="ebook">Ebook</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Si elegiste Ebook, ¿cuál?</label>
          <select name="ebookSlug" className="mt-1 w-full rounded-md border px-3 py-2">
            <option value="">—</option>
            <option value="como-apagar-la-mente">Cómo Apagar la Mente</option>
            <option value="el-arte-de-creer-en-ti">El Arte de Creer en Ti</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Calificación</label>
          <select name="rating" required className="mt-1 w-full rounded-md border px-3 py-2">
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Tu opinión</label>
          <textarea name="text" required rows={5}
                    className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>

        <div className="flex items-start gap-2">
          <input id="consent" name="consent" type="checkbox" required className="mt-1" />
          <label htmlFor="consent" className="text-sm text-slate-700">
            Autorizo publicar mi opinión con mis iniciales. Puedo solicitar su eliminación cuando quiera.
          </label>
        </div>

        {/* reCAPTCHA opcional: habilitar en Netlify → Forms */}
        {/* <div data-netlify-recaptcha="true"></div> */}

        <button type="submit"
                className="rounded-md bg-emerald-700 px-5 py-2.5 text-white font-medium hover:bg-emerald-800">
          Enviar
        </button>
      </form>
    </main>
  );
}