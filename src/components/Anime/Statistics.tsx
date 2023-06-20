import { ReactNode } from "react";
import { Users2, Trophy, Heart, Gauge } from "lucide-react";

import { formatNumber } from "@/helper/formater";
import { RankBadge } from "@/components/Anime/RankBadge";
import { HatennaAnime } from "@/@Types/Hatenna";

interface StatisticsProps {
  data: HatennaAnime;
}

interface StaticData {
  icon: ReactNode;
  label: string;
  score: number | string;
}

export function Statistics({ data }: StatisticsProps) {
  const staticData: StaticData[] = [
    {
      icon: <Gauge size={14} />,
      label: "score",
      score: data.score,
    },
    {
      icon: <Trophy size={14} className="text-amber-500" fill="#f59e0b" />,
      label: "#rank",
      score: data.rank,
    },
    {
      icon: <Heart size={14} className="text-pink-600" fill="#db2777" />,
      label: "#popularity",
      score: data.popularity,
    },
    {
      icon: <Users2 size={14} />,
      label: "members",
      score: formatNumber(data.members),
    },
  ];

  return (
    <div className="flex flex-col gap-3 py-4">
      {staticData.map(({ icon, label, score }) => (
        <RankBadge score={score} label={label} icon={icon} />
      ))}
    </div>
  );
}
