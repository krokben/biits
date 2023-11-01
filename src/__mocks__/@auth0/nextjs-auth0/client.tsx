import { vi } from "vitest";
import { UserProviderProps, UserContext } from "@auth0/nextjs-auth0/client";
import { ReactElement, useMemo, useCallback } from "react";
import { mockAuthStates } from "../../../test/test-utils";

const customUseUser = vi.fn(() => ({
  sub: "id",
  email: "something@something.com",
  email_verified: true,
}));

const CustomAuth0Provider = ({
  children,
  user: initialUser,
  authState,
}: UserProviderProps & { authState?: string }): ReactElement<UserContext> => {
  const { user, error, isLoading } = {
    user: initialUser,
    isLoading: authState === mockAuthStates.loading,
    error:
      authState === mockAuthStates.error
        ? new Error(mockAuthStates.error)
        : undefined,
  };

  const checkSession = useCallback(async () => {
    // do nothing
  }, []);

  const userValue = useMemo(
    () => ({ user, error, isLoading, checkSession }),
    [user, error, isLoading, checkSession]
  );

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export * from "@auth0/nextjs-auth0/client";
export { customUseUser as useUser, CustomAuth0Provider as UserProvider };
