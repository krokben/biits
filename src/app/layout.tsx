import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="light">
      <UserProvider>
        <body className="min-h-screen font-sans antialiased grainy">
          <Navbar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
