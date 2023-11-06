import { expect, describe, it } from "vitest";
import { MOCK_PROJECTS } from "../test/test-utils";
import { sortProjects } from "./useSortProjects";

describe("useSortProjects", async () => {
  it("sortProjects sorts by id", async () => {
    expect(MOCK_PROJECTS.sort(sortProjects("id", "asc"))[0].name).toBe(
      "TEST_PROJECT_3"
    );
    expect(MOCK_PROJECTS.sort(sortProjects("id", "desc"))[0].name).toBe(
      "TEST_PROJECT_1"
    );
  });

  it("sortProjects sorts by name", async () => {
    expect(MOCK_PROJECTS.sort(sortProjects("name", "asc"))[0].name).toBe(
      "TEST_PROJECT_1"
    );
    expect(MOCK_PROJECTS.sort(sortProjects("name", "desc"))[0].name).toBe(
      "TEST_PROJECT_3"
    );
  });
});
