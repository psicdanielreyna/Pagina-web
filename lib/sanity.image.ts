// lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client";

const builder = imageUrlBuilder(client);
export const urlFor = (source: unknown) => builder.image(source);
