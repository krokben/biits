import { Metadata } from "next";

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetadata({
  title = "biits",
  description = "biits is for making beats.",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    themeColor: "#fff",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
