// lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./sanity.client";

const builder = imageUrlBuilder(client);

/**
 * Construye URLs de imágenes de Sanity.
 * Úsalo SOLO cuando el valor provenga de Sanity (image object o asset ref).
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
