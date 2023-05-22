import { z } from 'zod';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

import { prisma } from '@/server/prisma';

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
    const error: ResponseError = {
      message: "User already exists",
    };

    return NextResponse.json({ error }, { status: 200 });
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
