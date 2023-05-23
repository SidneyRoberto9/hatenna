import { Session } from "next-auth";

import { LinkNavigation } from "@/components/NavigationLink";
import { LogOutButton } from "@/components/Header/LogOutButton";

interface RoutesProps {
  session: Session | null;
}

export function Routes({ session }: RoutesProps) {
  return (
    <header className="flex h-auto w-full justify-end ">
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
    </header>
  );
}
