import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/db";

export const userRouter = t.router({
  getUser: publicProcedure
    .input(
      z.object({
        user: z.object({
          sub: z.string().optional().nullable(),
          email: z.string().optional().nullable(),
        }),
      })
    )
    .query(async ({ input: { user } }) => {
      if (!user.sub || !user.email) {
        throw new Error("Missing user data.");
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

      return dbUser;
    }),
});
