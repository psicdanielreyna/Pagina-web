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
      "Workbook práctico para calmar el sobrepensamiento con técnicas simples y efectivas.",
    precio: 249,
    moneda: "MXN",
    imagen: "/manuales/apagar-mente.png",
    enlace: "/tienda/apagar-mente",
  },
  {
    titulo: "El Arte de Creer en Ti",
    descripcion:
      "Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.",
    precio: 249,
    moneda: "MXN",
    imagen: "/manuales/el-arte-de-creer-en-ti.png",
    enlace: "/tienda/el-arte-de-creer-en-ti",
  },
];