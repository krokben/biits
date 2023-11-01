"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Projects from "./Projects";

const Dashboard = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return <div>User not found...</div>;
  }

  return (
    <>
      <h1>Welcome {user?.name}!</h1>
      <Projects user={user} />
    </>
  );
};

export default Dashboard;
