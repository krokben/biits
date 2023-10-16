import { vi, expect, describe, it, afterEach } from "vitest";
import { mockAuthStates, render, screen, within } from "../test/test-utils";
import Home from "./page";

describe("Home", async () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("Should render loading screen", async () => {
    render(<Home />, { authState: mockAuthStates.loading });
    const errorMessage = await screen.findByText("Loading...");

    expect(within(errorMessage)).toBeDefined();
  });

  it("Should render error screen", async () => {
    render(<Home />, { authState: mockAuthStates.error });
    const errorMessage = await screen.findByText(mockAuthStates.error);

    expect(within(errorMessage)).toBeDefined();
  });

  it("Should render logged in page", async () => {
    render(<Home />);
    const main = await screen.findByRole("main");

    expect(
      within(main).getByRole("heading", { level: 1, name: /biits/i })
    ).toBeDefined();
  });
});
