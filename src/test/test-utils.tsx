import { ComponentType, ReactElement, createContext } from "react";
import { UserProvider } from "../__mocks__/@auth0/nextjs-auth0/client";
import { UserProfile, UserProviderProps } from "@auth0/nextjs-auth0/client";
import { render, RenderOptions } from "@testing-library/react";
import TRPCProvider from "@/app/_trpc/TRPCProvider";
import { vi } from "vitest";

export const mockAuthStates = { error: "error", loading: "loading" } as const;

export const MOCK_AUTH_USER = {
  sub: "TEST_ID",
  name: "TEST_NAME",
  email: "TEST_EMAIL",
};
export const MOCK_PROJECTS = [
  { id: 3, name: "TEST_PROJECT_1", authorId: "" },
  { id: 2, name: "TEST_PROJECT_2", authorId: "" },
  { id: 1, name: "TEST_PROJECT_3", authorId: "" },
];

export const mockURL = vi.fn(() => "localhost:3000?by=name&dir=asc");

vi.mock("next/navigation", async () => {
  const mod =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");

  return {
    ...mod,
    useRouter: () => ({
      prefetch: () => null,
      replace: vi.fn((path: string) => {
        window.location = { ...window.location, href: path };
      }),
    }),
    usePathname: () => window.location.origin,
    useSearchParams: () =>
      new URLSearchParams(
        new URL(decodeURIComponent(window.location.href)).search
      ),
  };
});

vi.mock("@/app/_trpc/client", () => {
  const trpc = createContext({});
  return {
    trpc: {
      ...trpc,
      user: {
        getUser: {
          useQuery: ({ user }: { user: UserProfile }) => ({
            data: { id: user.sub, email: user.email, projects: MOCK_PROJECTS },
          }),
        },
      },
      createClient: () => ({}),
    },
  };
});

const withUserProvider = ({
  user,
  profileUrl,
  loginUrl,
  fetcher,
  authState,
}: UserProviderProps & { authState?: string } = {}): ComponentType => {
  const userProvider = (props: any) => (
    <UserProvider
      {...props}
      user={user}
      profileUrl={profileUrl}
      loginUrl={loginUrl}
      fetcher={fetcher}
      authState={authState}
    />
  );
  return userProvider;
};

export const customRender = (
  ui: ReactElement,
  options: RenderOptions & { authState?: string } = {}
) => {
  const { authState, ...restOfOptions } = options;

  return render(<TRPCProvider>{ui}</TRPCProvider>, {
    wrapper: withUserProvider({
      authState,
      user: MOCK_AUTH_USER,
    }),
    ...restOfOptions,
  });
};

export * from "@testing-library/react";
export { customRender as render };
