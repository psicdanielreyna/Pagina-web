import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
{
  name: "Cómo Apagar tu Mente",
  description: "Workbook práctico para calmar el sobrepensamiento.",
  price: 299,
  image: "/como-apagar-tu-mente.png"
},
{
  name: "El arte de creer en ti",
  description: "Hojas de trabajo, scripts y plan de 6 sesiones.",
  price: 349,
  image: "/el arte de creer en ti.png"
}
