import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VOTA",
  description: "Making polling easy with VOTA",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
