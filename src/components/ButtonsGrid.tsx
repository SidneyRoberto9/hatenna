import { StretchHorizontal, LayoutList, LayoutGrid } from "lucide-react";

import { LayoutCartType } from "@/@Types/Card";

interface ButtonsGridProps {
  changeLayoutType: (type: LayoutCartType) => void;
}

export function ButtonsGrid({ changeLayoutType }: ButtonsGridProps) {
  return (
    <div className="m-2 mt-1 flex gap-2">
      <LayoutGrid
        size={20}
        className="cursor-pointer text-primary-button"
        onClick={() => changeLayoutType("grid")}
      />
      <LayoutList
        size={20}
        className="cursor-pointer text-primary-button"
        onClick={() => changeLayoutType("around")}
      />
      <StretchHorizontal
        size={20}
        className="cursor-pointer text-primary-button"
        onClick={() => changeLayoutType("stretch")}
      />
    </div>
  );
}
