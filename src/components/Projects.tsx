"use client";
import { trpc } from "@/app/_trpc/client";
import useSortProjects, { sortProjects } from "@/hooks/useSortProjects";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { useMemo } from "react";

const Projects = ({ user }: { user: UserProfile }) => {
  const {
    by,
    direction,
    handleDirectionClick,
    handleBySubmit,
    handleByChange,
  } = useSortProjects();
  const { data, isLoading, error } = trpc.user.getUser.useQuery({ user });

  const projects = useMemo(
    () => (data?.projects ?? []).sort(sortProjects(by, direction)),
    [data?.projects, by, direction]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <span>{data?.email}</span>
      <h2>Projects</h2>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleBySubmit}
      >
        <button onClick={handleDirectionClick}>{direction}</button>
        <div>
          <input
            id="name"
            name="by"
            type="radio"
            value="name"
            onChange={handleByChange}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            id="id"
            name="by"
            type="radio"
            value="id"
            onChange={handleByChange}
          />
          <label htmlFor="id">ID</label>
        </div>
      </form>
      <ul>
        {projects.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default Projects;
