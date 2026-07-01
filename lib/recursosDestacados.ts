// lib/recursosDestacados.ts
export type Recurso = {
  titulo: string;
  descripcion: string;
  precio: number;
  moneda: string;
  imagen: string;
  enlace: string; // ruta interna hacia la tienda
};

export const recursosDestacados: Recurso[] = [
  {
    titulo: "Cómo Apagar tu Mente",
    descripcion:
      "Deja de revivir la misma conversación a las 3am. Técnicas concretas para que tu mente por fin te deje descansar.",
    precio: 249,
    moneda: "MXN",
    imagen: "/manuales/apagar-mente.png",
    enlace: "/tienda/apagar-mente",
  },
  {
    titulo: "El Arte de Creer en Ti",
    descripcion:
      "Deja de pedir permiso para ser tú. Un método paso a paso para confiar en tus decisiones sin necesitar la aprobación de nadie.",
    precio: 249,
    moneda: "MXN",
    imagen: "/manuales/el-arte-de-creer-en-ti.png",
    enlace: "/tienda/el-arte-de-creer-en-ti",
  },
];