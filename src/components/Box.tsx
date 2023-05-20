import { ReactNode } from "react";

interface BoxProps {
  className?: string;
  children: ReactNode;
}

export function Box({ children, className = "" }: BoxProps) {
  return (
    <div
      className={"rounded-sm bg-secondary p-4 text-sm shadow-md " + className}
    >
      {children}
    </div>
  );
}
