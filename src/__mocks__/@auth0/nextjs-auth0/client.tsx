import { UserProviderProps, UserContext } from "@auth0/nextjs-auth0/client";
import { ReactElement, useMemo, useCallback } from "react";
import { mockAuthStates } from "../../../test/test-utils";

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
export { CustomAuth0Provider as UserProvider };
