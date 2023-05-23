import Link from "next/link";

interface LinkNavigationProps {
  url: string;
  label: string;
}

export function LinkNavigation({ url, label }: LinkNavigationProps) {
  return (
    <Link
      href={url}
      className="mx-4 my-2 rounded-md bg-primary-button px-4 py-2 text-secondary hover:bg-Accent"
    >
      {label}
    </Link>
  );
}
