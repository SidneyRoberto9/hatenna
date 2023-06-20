import { z } from "zod";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

import { prisma } from "@/server/prisma";

const registerFormSchema = z.object({
  name: z.string().min(3).max(255).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(255).nonempty(),
});

export async function POST(req: Request) {
  const { email, name, password } = registerFormSchema.parse(await req.json());

  const existing_user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (existing_user) {
    const existing_user_with_name = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    if (existing_user_with_name) {
      const error: ResponseError = {
        message: "Username already in use",
      };

      return NextResponse.json(error, { status: 500 });
    } else {
      const error: ResponseError = {
        message: "Email already in use",
      };

      return NextResponse.json(error, { status: 500 });
    }
  }

  const hashed_password = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashed_password,
    },
  });

  if (user == null) {
    const error: ResponseError = {
      message: "User creation failed",
    };

    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
    },
  });
}
