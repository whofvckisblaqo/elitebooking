import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/components/SessionProvider";
import Smartsupp from "@/components/Smartsupp";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "EliteBooking — Book World-Class Celebrities",
    template: "%s | EliteBooking",
  },
  description: "The premium platform connecting you with the world's finest celebrities for your events.",
  keywords: ["celebrity booking", "book a celebrity", "celebrity appearances", "hire a celebrity", "EliteBooking"],
  authors: [{ name: "EliteBooking" }],
  creator: "EliteBooking",
  publisher: "EliteBooking",
  metadataBase: new URL("https://elitebookingweb.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elitebookingweb.xyz",
    siteName: "EliteBooking",
    title: "EliteBooking — Book World-Class Celebrities",
    description: "The premium platform connecting you with the world's finest celebrities for your events.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EliteBooking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EliteBooking — Book World-Class Celebrities",
    description: "The premium platform connecting you with the world's finest celebrities for your events.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ overflowX: "hidden" }}>
      <body className={inter.className} style={{ overflowX: "hidden" }}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <Smartsupp />
        </NextAuthProvider>
      </body>
    </html>
  );
}