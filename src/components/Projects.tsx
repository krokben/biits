import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "@auth0/nextjs-auth0/client";

const Projects = ({ user }: { user: UserProfile }) => {
  const { data, isLoading, error } = trpc.user.getUser.useQuery({ user });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <span>{data?.email}</span>
      <h2>Projects</h2>
    </>
  );
};

export default Projects;
