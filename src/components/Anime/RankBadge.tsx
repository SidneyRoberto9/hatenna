import { ReactNode } from 'react';

interface RankBadgeProps {
  icon: ReactNode;
  label: string;
  score: number | string;
}

export function RankBadge({ score, label, icon }: RankBadgeProps) {
  return (
    <div className="flex cursor-pointer select-none items-center justify-center gap-2 rounded-sm bg-secondary px-4 py-2 text-sm shadow-md">
      {icon}

      <span className="pl-1 font-semibold capitalize">{label}</span>
      <span>{score}</span>
    </div>
  );
}
