import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
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
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
