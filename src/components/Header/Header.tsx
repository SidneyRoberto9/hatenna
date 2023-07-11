import { Session } from 'next-auth';

import { LinkNavigation } from '@/components/NavigationLink';
import { LogOutButton } from '@/components/Header/LogOutButton';

interface HeaderProps {
  session: Session | null;
  shadow?: boolean;
}

export function Header({ session, shadow = false }: HeaderProps) {
  return (
    <div className={` ${shadow ? 'shadow-lg' : ''}`}>
      <header
        className={`container mx-auto flex items-center py-2 h-16 w-11/12 lg:w-256 ${
          shadow ? 'border-b-2' : ''
        }`}>
        <LinkNavigation url="/" label="Hatenna" removeCache />
        <div className="grow">
          <div className="flex items-center justify-end gap-2 md:gap-8">
            {session ? (
              <div className="flex gap-4">
                <LinkNavigation url={`/profile/${session.user?.name}`} label="My Favorites" />
                <LogOutButton />
              </div>
            ) : (
              <LinkNavigation url="/login" label=" Sign In" />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
