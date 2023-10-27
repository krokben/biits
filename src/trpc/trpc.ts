import { initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "@auth0/nextjs-auth0";

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession();

  return {
    session,
  };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
