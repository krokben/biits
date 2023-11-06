import { vi, beforeEach, afterEach } from "vitest";

beforeEach(() => {
  window.location = {
    ...window.location,
    href: "https://test.com",
  };
});

afterEach(() => {
  vi.resetModules();
});
