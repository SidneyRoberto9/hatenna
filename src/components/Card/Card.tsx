import { SmallCard } from "@/components/Card/Small";
import { LargeCard } from "@/components/Card/large";
import { CardAtributes } from "@/@Types/Card";

interface CardProps {
  type: "small" | "large";
  attributes: CardAtributes;
}

export function Card({ attributes, type }: CardProps) {
  switch (type) {
    case "small":
      return <SmallCard attributes={attributes} />;
    case "large":
      return <LargeCard attributes={attributes} />;
    default:
      return <SmallCard attributes={attributes} />;
  }
}
