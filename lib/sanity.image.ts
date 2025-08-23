// lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "./sanity.client";

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (src: Image | any) => builder.image(src);
