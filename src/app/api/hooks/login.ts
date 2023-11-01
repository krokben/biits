import { NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(request: Request) {
  const body: { id: string; email: string } = await request.json();
  const { id, email } = body;

  const user = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    await db.user.create({
      data: {
        id,
        email,
      },
    });
    return NextResponse.json({ user, message: "user created" });
  }

  // if (user) {
  //   // update user in db
  //   return NextResponse.json({ user, message: "user updated" });
  // }

  return NextResponse.json({ message: "error" });
}
