import { Users2, Trophy, Heart, Gauge } from "lucide-react";

import { formatNumber } from "@/helper/formater";
import { RankBadge } from "@/components/Anime/RankBadge";
import { HatennaAnime } from "@/@Types/Hatenna";

interface StatisticsProps {
  data: HatennaAnime;
}

export function Statistics({ data }: StatisticsProps) {
  return (
    <div className="flex flex-col gap-3 py-4">
      <RankBadge score={data.score} label="score" icon={<Gauge size={14} />} />
      <RankBadge
        score={data.rank}
        label="#rank"
        icon={<Trophy size={14} className="text-amber-500" fill="#f59e0b" />}
      />
      <RankBadge
        score={data.popularity}
        label="#popularity"
        icon={<Heart size={14} className="text-pink-600" fill="#db2777" />}
      />
      <RankBadge
        score={formatNumber(data.members)}
        label="members"
        icon={<Users2 size={14} />}
      />
    </div>
  );
}
