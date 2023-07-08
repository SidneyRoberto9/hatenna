import { w } from 'windstitch';
import { ReactNode } from 'react';

const RankBadgeStyles = {
  container: w.div(
    'flex select-none items-center justify-center gap-2 rounded-sm bg-secondary px-4 py-2 text-sm shadow-md',
  ),
  label: w.span('pl-1 font-semibold capitalize'),
};

interface RankBadgeProps {
  icon: ReactNode;
  label: string;
  score: number | string;
}

export function RankBadge({ score, label, icon }: RankBadgeProps) {
  return (
    <RankBadgeStyles.container>
      {icon}
      <RankBadgeStyles.label>{label}</RankBadgeStyles.label>
      <span>{score}</span>
    </RankBadgeStyles.container>
  );
}
