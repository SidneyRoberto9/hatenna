"use client";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Input';
import { Box } from '@/components/Box';

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(255).nonempty(),
});
type LoginType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const loading: boolean = isSubmitting;

  async function dataSubmit(content: LoginType) {
    const signInResponse = await signIn("credentials", {
      redirect: false,
      email: content.email,
      password: content.password,
      callbackUrl: callbackUrl,
    });

    if (!signInResponse?.error) {
      router.push(callbackUrl);
    } else {
      setError("root", {
        type: "manual",
        message: "invalid email or password",
      });
    }
  }

  return (
    <Box className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-lg">login</h1>
      <form
        onSubmit={handleSubmit(dataSubmit)}
        className="flex w-96 flex-col gap-1 lg:w-[500px]"
      >
        <Input
          inputProps={register("email")}
          label="Email"
          name="email"
          placeholder="Enter your email"
          error={errors.email?.message}
        />

        <Input
          inputProps={register("password")}
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          error={errors.password?.message}
        />

        <button
          className={`${
            loading ? "bg-gray-300" : "bg-primary-button hover:bg-Accent"
          } mt-2 rounded-md p-2 text-white ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
    </Box>
  );
}
