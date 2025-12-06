import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import StructuredData from "@/components/StructuredData";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jerrysglamstore.com'),
  title: {
    default: "Jerry Glam Store - Premium Press-On Nails & Fashion Accessories",
    template: "%s | Jerry Glam Store",
  },
  description: "Shop premium press-on nails, bags, watches, jewelry, and fashion accessories. Instant glam with easy-to-apply, reusable press-on nails. Free shipping on orders over ₹99.",
  keywords: [
    "press-on nails",
    "press on nails India",
    "fashion accessories",
    "artificial nails",
    "nail art",
    "reusable nails",
    "glam accessories",
    "Jerry Glam Store",
    "online jewelry store",
    "fashion bags",
    "watches",
    "earrings",
    "necklaces",
    "rings",
  ],
  authors: [{ name: "Jerry Glam Store" }],
  creator: "Jerry Glam Store",
  publisher: "Jerry Glam Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jerrysglamstore.com",
    siteName: "Jerry Glam Store",
    title: "Jerry Glam Store - Premium Press-On Nails & Fashion Accessories",
    description: "Shop premium press-on nails, bags, watches, jewelry, and fashion accessories. Instant glam with easy-to-apply, reusable press-on nails.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Jerry Glam Store Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerry Glam Store - Premium Press-On Nails & Fashion Accessories",
    description: "Shop premium press-on nails, bags, watches, jewelry, and fashion accessories. Instant glam with easy-to-apply, reusable press-on nails.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here after registering
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
