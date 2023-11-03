import { expect, describe, it } from "vitest";
import {
  MOCK_AUTH_USER,
  fireEvent,
  render,
  screen,
  within,
} from "../test/test-utils";
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
    window.location = {
      ...window.location,
      origin: "https://test.com?by=name&dir=asc",
      href: "href",
      hash: "hash",
    };
    const { rerender } = render(<Projects user={MOCK_AUTH_USER} />);
    const ul = await screen.findByRole("list");
    const directionButtonAsc = await screen.findByRole("button", {
      name: /asc/i,
    });
    const idRadioInput: HTMLInputElement = await screen.findByRole("radio", {
      name: /id/i,
    });

    expect(ul.firstChild?.textContent).toBe("TEST_PROJECT_1");

    directionButtonAsc.click();
    expect(directionButtonAsc).toContain(/desc/i);

    rerender(<Projects user={MOCK_AUTH_USER} />);

    const ulRerendered = await screen.findByRole("list");
    expect(ulRerendered.firstChild?.textContent).toBe("TEST_PROJECT_3");

    expect(idRadioInput.checked).toBe(false);
    idRadioInput.click();
    expect(idRadioInput.checked).toBe(true);

    rerender(<Projects user={MOCK_AUTH_USER} />);

    const ulRerenderedAgain = await screen.findByRole("list");
    expect(ulRerenderedAgain.firstChild?.textContent).toBe("TEST_PROJECT_1");
  });
});
