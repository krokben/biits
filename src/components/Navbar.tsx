import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200">
        <Link href="/" className="flex z-40 font-semibold">
          <span>biits</span>
        </Link>

        <div className="hidden items-center space-x-4 sm:flex">
          {!user ? (
            <>
              <LoginLink>Login</LoginLink>
              <RegisterLink>Sign up</RegisterLink>
            </>
          ) : (
            <>
              <LogoutLink>Logout</LogoutLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
