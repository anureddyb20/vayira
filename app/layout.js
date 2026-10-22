import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

export const metadata = {
  metadataBase: new URL("https://vayira.com"),
  title: "VAYIRA — A Royal Indian Silk House | Timeless Handwoven Heirlooms",
  description: "Where India's timeless silk traditions meet personal expression. Discover authentic Kanjeevaram, Banarasi, and Mysore pure silk sarees, bespoke atelier customisation, and AI virtual try-on.",
  keywords: ["VAYIRA", "Royal Indian Silk", "Kanjeevaram Silk Saree", "Banarasi Saree", "Mysore Silk", "Pure Zari Silk", "Custom Saree Atelier", "AI Saree Try-On"],
  openGraph: {
    title: "VAYIRA — A Royal Indian Silk House",
    description: "Some traditions are not worn. They are inherited. Explore exquisite Indian handwoven silk sarees.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/hero-saree.jpg", width: 1200, height: 630, alt: "VAYIRA Royal Indian Silk Saree" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
