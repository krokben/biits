import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="light">
      <Providers>
        <body className="min-h-screen font-sans antialiased grainy">
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
