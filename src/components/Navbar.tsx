"use client";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200">
        <Link href="/" className="flex z-40 font-semibold">
          <span>biits</span>
        </Link>

        <div className="hidden items-center space-x-4 sm:flex">
          {!user ? (
            <>
              <a href="/login">Login</a>
            </>
          ) : (
            <>
              <a href="/logout">Logout</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
