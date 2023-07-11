import Link from 'next/link';

import { Button } from '@/styles/Button';

interface LinkNavigationProps {
  url: string;
  label: string;
  removeCache?: boolean;
}

export function LinkNavigation({ url, label, removeCache = false }: LinkNavigationProps) {
  if (removeCache) {
    return (
      <Button as={'a'} href={url} link={true}>
        {label}
      </Button>
    );
  }

  return (
    <Button as={Link} href={url} prefetch={false} link={true}>
      {label}
    </Button>
  );
}
