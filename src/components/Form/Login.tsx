"use client";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Form/Input";
import { Box } from "@/components/Box";

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(255).nonempty(),
});
type LoginType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(isSubmitting);

  async function dataSubmit(content: LoginType) {
    setIsLoading(true);
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

      toast.error("invalid email or password", {
        duration: 3000,
      });
    }
    setIsLoading(false);
  }

  return (
    <Box className="flex flex-col items-center justify-center gap-4 ">
      <Toaster position="top-center" />
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
            isLoading ? "bg-gray-300" : "bg-primary-button hover:bg-Accent"
          } mt-2 rounded-md p-2 text-white ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "Sign In"}
        </button>
      </form>

      <div className="h-1 w-full rounded-lg border-t-0 bg-primary/50 opacity-20"></div>

      <Link
        href={"/register"}
        className="w-full cursor-pointer rounded-md bg-primary-button p-2 text-center text-white hover:bg-Accent"
      >
        Sign Up
      </Link>
    </Box>
  );
}
