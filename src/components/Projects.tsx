"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

const Projects = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return <span>Welcome {user?.name}!</span>;
  }
};

export default Projects;
