'use client';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { EyeOff, Eye } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Divider } from '@/styles/Divider';
import { Button } from '@/styles/Button';
import { Box } from '@/styles/Box';
import { Input } from '@/components/Form/Input';

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(255).nonempty(),
});
type LoginType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(isSubmitting);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  async function dataSubmit(content: LoginType) {
    setIsLoading(true);
    const signInResponse = await signIn('credentials', {
      redirect: false,
      email: content.email,
      password: content.password,
      callbackUrl: callbackUrl,
    });

    if (!signInResponse?.error) {
      router.push(callbackUrl);
    } else {
      setError('root', {
        type: 'manual',
        message: 'invalid email or password',
      });

      toast.error('invalid email or password', {
        duration: 3000,
      });
    }
    setIsLoading(false);
  }

  return (
    <Box className="flex flex-col items-center justify-center gap-2 rounded-2xl">
      <Toaster position="top-center" />
      <h1 className="text-2xl ">login</h1>
      <form onSubmit={handleSubmit(dataSubmit)} className="flex w-118  flex-col gap-1 px-2">
        <Input
          inputProps={register('email')}
          label="Email"
          name="email"
          placeholder="Enter your email"
          error={errors.email?.message}
        />

        <Input
          inputProps={register('password')}
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={togglePassword ? 'text' : 'password'}
          error={errors.password?.message}
          rightIcon={togglePassword ? Eye : EyeOff}
          onRightIconClick={() => setTogglePassword(!togglePassword)}
        />

        <Button form={isLoading ? 'loading' : 'stock'} disabled={isLoading}>
          {isLoading ? 'loading...' : 'Sign In'}
        </Button>
      </form>

      <Divider opacity={50} />

      <div className="flex items-center justify-center gap-2 w-full">
        <Button as={Link} href={'/'} link className="w-full">
          Hatenna
        </Button>
        <Button as={Link} href={'/register'} redirect className="w-full  durat">
          Sign Up
        </Button>
      </div>
    </Box>
  );
}
