import Image from "next/image";

import { CardAtributes } from "@/@Types/Card";

interface LargeCardProps {
  attributes: CardAtributes;
}

export function SmallCard({ attributes }: LargeCardProps) {
  return (
    <div className="flex h-72 w-48 max-w-5xl overflow-hidden rounded-md shadow-lg">
      <div className="relative h-72 w-full">
        <Image
          src={attributes.image}
          alt="Picture of the author"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-auto w-full justify-between gap-2 bg-primary/75 px-1 py-2 text-sm text-secondary">
          <h4 className="ml-4">{attributes.title}</h4>
        </div>
      </div>
    </div>
  );
}
