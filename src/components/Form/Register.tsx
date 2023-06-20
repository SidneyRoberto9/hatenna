"use client";

import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/server/api";
import { Input } from "@/components/Form/Input";
import { Box } from "@/components/Box";

const registerFormSchema = z.object({
  name: z.string().min(3).max(255).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(255).nonempty(),
});

type RegisterFormType = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(isSubmitting);

  async function dataSubmit(content: RegisterFormType) {
    setIsLoading(true);
    api
      .post("/register", content)
      .then(() => {
        signIn(undefined, { callbackUrl: "/" });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          duration: 3000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Box className="flex flex-col items-center justify-center gap-4">
      <Toaster position="top-center" />
      <h1 className="text-lg">Register</h1>
      <form
        onSubmit={handleSubmit(dataSubmit)}
        className="flex w-96 flex-col gap-1 lg:w-[500px]"
      >
        <Input
          inputProps={register("name")}
          label="Name"
          name="name"
          placeholder="Enter your name"
          error={errors.name?.message}
        />

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
          {isLoading ? "loading..." : "Register"}
        </button>
      </form>
    </Box>
  );
}
