import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      biits
      {user && "logged in"}
    </main>
  );
}
