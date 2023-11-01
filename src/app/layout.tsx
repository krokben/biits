import { UserProvider } from "@auth0/nextjs-auth0/client";
import TRPCProvider from "./_trpc/TRPCProvider";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="light">
      <UserProvider>
        <TRPCProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </TRPCProvider>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
