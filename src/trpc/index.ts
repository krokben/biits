import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { db } from "@/db";

export const appRouter = router({
  authCallback: publicProcedure.query(async (ctx) => {
    const { user } = ctx.session;

    console.log(ctx);

    if (error) {
      console.error(error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    if (!user?.sub || !user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbUser = await db.user.findFirst({
      where: {
        id: user.sub,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.sub,
          email: user.email,
        },
      });
    }

    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
