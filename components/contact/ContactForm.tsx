"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construimos mailto con asunto + cuerpo
    const subject = encodeURIComponent("Consulta desde el sitio web");
    const body = encodeURIComponent(
      `Hola Daniel,

Nombre: ${name}
Correo: ${email}

Mensaje:
${msg}

— Enviado desde danielreyna.com/contacto`
    );

    window.location.href = `mailto:danielreyna@danielreyna.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nombre</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Correo</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
          placeholder="tunombre@correo.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Mensaje</label>
        <textarea
          required
          rows={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full resize-y rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Cuéntame brevemente en qué te puedo ayudar…"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Enviar mensaje
        </button>
        <span className="text-xs text-gray-500">
          Se abrirá tu app de correo para enviar.
        </span>
      </div>
    </form>
  );
}