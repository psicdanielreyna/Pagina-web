"use client";

import { useState } from "react";

export default function Newsletter() {
  return (
    <form
      name="newsletter"
      method="POST"
      action="/gracias"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="space-y-4"
    >
      {/* Requisito de Netlify Forms */}
      <input type="hidden" name="form-name" value="newsletter" />
      {/* Honeypot (anti-bots) */}
      <p className="hidden">
        <label>
          No llenar: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="email" className="sr-only">Correo</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="w-full rounded-full border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-600/40"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-emerald-700 text-white px-5 py-3 font-medium hover:bg-emerald-800"
      >
        Quiero recibirlo
      </button>

      <p className="text-xs text-slate-500">
        Tus datos se guardan en Netlify Forms. Podrás darte de baja cuando quieras.
      </p>
    </form>
  );
}
