import Link from "next/link";
import { Session } from "next-auth";

import { LinkNavigation } from "@/components/NavigationLink";
import { LogOutButton } from "@/components/Header/LogOutButton";

interface HeaderProps {
  session: Session | null;
}

export function Header({ session }: HeaderProps) {
  return (
    <header className="absolute left-1/2 top-0 z-40 -translate-x-1/2 transform">
      <div className="w-256 gap-4">
        <div className="flex h-auto w-full justify-between">
          <LinkNavigation url="/" label="Hatenna" isHome={true} />

          <div className="flex h-auto w-full justify-end">
            {session ? (
              <div className="flex ">
                <LinkNavigation
                  url={`/profile/${session.user?.name}`}
                  label="My Favorites"
                />
                <LogOutButton />
              </div>
            ) : (
              <LinkNavigation url="/login" label=" Sign In" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
