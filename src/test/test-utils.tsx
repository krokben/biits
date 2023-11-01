import { ComponentType, ReactElement } from "react";
import { UserProvider } from "../__mocks__/@auth0/nextjs-auth0/client";
import { UserProviderProps } from "@auth0/nextjs-auth0/client";
import { render, RenderOptions } from "@testing-library/react";
import TRPCProvider from "@/app/_trpc/TRPCProvider";

export const mockAuthStates = { error: "error", loading: "loading" } as const;

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
      user: { sub: "TEST_ID", name: "TEST_NAME", email: "TEST_EMAIL" },
    }),
    ...restOfOptions,
  });
};

export * from "@testing-library/react";
export { customRender as render };
