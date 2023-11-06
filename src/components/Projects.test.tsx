import { expect, describe, it } from "vitest";
import { MOCK_AUTH_USER, render, screen, within } from "../test/test-utils";
import Projects from "./Projects";

describe("Projects", async () => {
  it("Should render only 3 projects", async () => {
    render(<Projects user={MOCK_AUTH_USER} />);
    const ul = await screen.findByRole("list");

    expect(ul.children).toHaveLength(3);
    expect(within(ul).getByText(/test_project_1/i)).toBeDefined();
    expect(within(ul).getByText(/test_project_2/i)).toBeDefined();
    expect(within(ul).getByText(/test_project_3/i)).toBeDefined();
    expect(within(ul).queryByText(/test_project_4/i)).toBeNull();
  });

  it("Should change sort direction", async () => {
    const { rerender } = render(<Projects user={MOCK_AUTH_USER} />);
    let ul = await screen.findByRole("list");
    const directionButtonAsc = await screen.findByRole("button", {
      name: /asc/i,
    });

    expect(ul.firstChild?.textContent).toBe("TEST_PROJECT_1");

    directionButtonAsc.click();
    expect(directionButtonAsc).toContain(/desc/i);

    rerender(<Projects user={MOCK_AUTH_USER} />);

    ul = await screen.findByRole("list");
    expect(ul.firstChild?.textContent).toBe("TEST_PROJECT_3");
  });

  it("Should sort by id", async () => {
    window.location = {
      ...window.location,
      href: "https://test.com?by=id&dir=asc",
    };
    render(<Projects user={MOCK_AUTH_USER} />);

    const ul = await screen.findByRole("list");
    expect(ul.firstChild?.textContent).toBe("TEST_PROJECT_3");
  });

  it("Should sort by id after change", async () => {
    const { rerender } = render(<Projects user={MOCK_AUTH_USER} />);
    const form: HTMLFormElement = await screen.findByRole("form", {
      name: "project-settings",
    });
    const nameRadioInput: HTMLInputElement = within(form).getByRole("radio", {
      name: /name/i,
    });
    const idRadioInput: HTMLInputElement = within(form).getByRole("radio", {
      name: /id/i,
    });

    expect(nameRadioInput.checked).toBe(true);
    expect(idRadioInput.checked).toBe(false);

    idRadioInput.click();
    expect(nameRadioInput.checked).toBe(false);
    expect(idRadioInput.checked).toBe(true);

    rerender(<Projects user={MOCK_AUTH_USER} />);

    const ul = await screen.findByRole("list");
    expect(ul.firstChild?.textContent).toBe("TEST_PROJECT_3");
  });
});
