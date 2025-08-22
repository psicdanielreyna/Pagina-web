// lib/resend.ts
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Falta RESEND_API_KEY en variables de entorno.");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
