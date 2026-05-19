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
  title: "EliteBooking — Book World-Class Celebrities",
  description:
    "The premium platform connecting you with the world's finest talent for your events.",
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