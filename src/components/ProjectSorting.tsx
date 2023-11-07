"use client";
import { FC, FormEventHandler, MouseEventHandler, useCallback } from "react";
import { Project } from "@prisma/client";

interface ProjectSortingProps {
  direction: "asc" | "desc";
  by: keyof Project;
  handleDirectionClick: () => void;
  handleByClick: MouseEventHandler<HTMLInputElement>;
}

const ProjectSorting: FC<ProjectSortingProps> = ({
  direction,
  by,
  handleDirectionClick,
  handleByClick,
}) => {
  const handleBySubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => e.preventDefault(),
    []
  );

  return (
    <form
      aria-label="project-settings"
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
          defaultChecked={by === "name"}
          onClick={handleByClick}
        />
        <label htmlFor="name">Name</label>
      </div>
      <div>
        <input
          id="id"
          name="by"
          type="radio"
          value="id"
          defaultChecked={by === "id"}
          onClick={handleByClick}
        />
        <label htmlFor="id">ID</label>
      </div>
    </form>
  );
};

export default ProjectSorting;
