// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://danielreyna.com"),
  title: { default: "Daniel Reyna", template: "%s | Daniel Reyna" },
  // ...
};