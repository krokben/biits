"use client";
import { trpc } from "@/app/_trpc/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const Projects = () => {
  const router = useRouter();

  const { user, error, isLoading } = useUser();
  const { data } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push("/dashboard");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <span>Welcome {user?.name}!</span>
        <span>{data ?? "Loading data..."}</span>
      </>
    );
  }
};

export default Projects;
