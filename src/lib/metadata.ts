import { Metadata } from "next";

export function constructMetadata({
  title = "ADSTORE - Your One-Stop Shop for Fashion, Electronics, and More",
  description = "Shop the latest fashion trends, electronics, gadgets, home decor, and more at unbeatable prices. Discover high-quality products with fast shipping and excellent customer service at ADSTORE. Start shopping now and enjoy a seamless online shopping experience.",
  image = "/adstore-image.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url: "https://adstore-umber.vercel.app",
      siteName: "ADSTORE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@adityashiyale",
    },
    icons,
  };
}
