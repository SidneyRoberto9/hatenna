"use client";

import { signOut } from "next-auth/react";

export function LogOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="my-2 mr-2 rounded-md bg-primary-button px-4 py-2 text-secondary hover:bg-Accent"
    >
      Log Out
    </button>
  );
}
