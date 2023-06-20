import Link from "next/link";

interface LinkNavigationProps {
  url: string;
  label: string;
  isHome?: boolean;
}

export function LinkNavigation({
  url,
  label,
  isHome = false,
}: LinkNavigationProps) {
  if (isHome) {
    return (
      <a
        href={url}
        className="mx-4 my-2 rounded-md bg-primary-button px-4 py-2 text-secondary hover:bg-Accent"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={url}
      prefetch={false}
      className="mx-4 my-2 rounded-md bg-primary-button px-4 py-2 text-secondary hover:bg-Accent"
    >
      {label}
    </Link>
  );
}
