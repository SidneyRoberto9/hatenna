interface DataInfoProps {
  label: string;
  data: string | number;
}

export function DataInfo({ label, data }: DataInfoProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="font-semibold capitalize text-primary">{label}</p>
      <span className="capitalize text-primary-button">{data}</span>
    </div>
  );
}
