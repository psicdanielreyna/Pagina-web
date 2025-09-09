/* public/admin/custom.js */
(function () {
  // Componente para centrar contenido con Tailwind
  CMS.registerEditorComponent({
    id: "center",
    label: "Centrar",
    fields: [
      {
        name: "text",
        label: "Contenido",
        widget: "markdown",
        default: "Texto centrado…",
      },
    ],
    // Detecta <div class="text-center"> … </div> en el markdown
    pattern: /^<div class="text-center">([\s\S]*?)<\/div>$/m,
    fromBlock: (match) => ({ text: (match && match[1]) ? match[1].trim() : "" }),
    toBlock: ({ text }) => `<div class="text-center">\n${text || ""}\n</div>`,
    toPreview: ({ text }) =>
      `<div style="text-align:center; padding:8px 0; font-style:inherit;">${text || ""}</div>`,
  });

  // (Opcional) puedes registrar otros: derecha/izquierda, etc.
  // Repite con class="text-right" / "text-left" si lo necesitas.
})();
