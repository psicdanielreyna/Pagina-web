import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client";

const builder = imageUrlBuilder(client);

// Devuelve un builder; en el uso SIEMPRE termina con .url()
export function urlFor(source: unknown) {
  // si source viene vacío, devolvemos un builder “vacío” para no romper
  // (igual en el JSX ponemos placeholder)
  // @ts-ignore
  return builder.image(source || {});
}
