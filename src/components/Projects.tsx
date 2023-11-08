"use client";
import { trpc } from "@/app/_trpc/client";
import useSortProjects, { sortProjects } from "@/hooks/useSortProjects";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { useMemo } from "react";
import ProjectSorting from "./ProjectSorting";

const Projects = ({ user }: { user: UserProfile }) => {
  const { direction, by, handleDirectionClick, handleByClick } =
    useSortProjects();
  const { data, isLoading, error } = trpc.user.getUser.useQuery({ user });

  const projects = useMemo(
    () => (
      <ul>
        {(data?.projects ?? [])
          .sort(sortProjects(by, direction))
          .map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
      </ul>
    ),
    [data?.projects, by, direction]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <span>{data?.email}</span>
      <h2>Projects</h2>
      <ProjectSorting
        direction={direction}
        by={by}
        handleDirectionClick={handleDirectionClick}
        handleByClick={handleByClick}
      />
      {projects}
    </>
  );
};

export default Projects;
