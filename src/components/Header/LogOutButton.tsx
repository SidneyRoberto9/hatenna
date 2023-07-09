'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/styles/Button';

export function LogOutButton() {
  return (
    <Button onClick={() => signOut()} link>
      Log Out
    </Button>
  );
}
