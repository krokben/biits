import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "@auth0/nextjs-auth0/client";

const Projects = ({ user }: { user: UserProfile }) => {
  const { data } = trpc.user.getUser.useQuery({ user });

  return (
    <>
      <span>{data?.email}</span>
      <h2>Projects</h2>
    </>
  );
};

export default Projects;
