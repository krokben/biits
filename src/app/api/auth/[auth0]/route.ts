import { serverClient } from "@/app/_trpc/server";
import {
  AppRouteHandlerFnContext,
  handleAuth,
  handleProfile,
} from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

// export const GET = handleAuth({
//   profile: async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
//     return await handleProfile(req, ctx, {
//       refetch: true,
//       afterRefetch: async (testReq: any, session: any) => {
//         const user = await serverClient.user.getUserById(session.user.sub);
//         session.user = {
//           ...session.user,
//           ...user,
//         };
//         return session;
//       },
//     });
//   },
// });

export const GET = handleAuth();
