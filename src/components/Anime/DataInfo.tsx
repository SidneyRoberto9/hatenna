import { w } from 'windstitch';

interface DataInfoProps {
  label: string;
  data: string | number;
}

const DataInfoStyle = {
  div: w.div('flex flex-col gap-0.5'),
  p: w.p('font-semibold capitalize text-primary'),
  span: w.span('capitalize text-primary-button'),
};

export function DataInfo({ label, data }: DataInfoProps) {
  return (
    <DataInfoStyle.div>
      <DataInfoStyle.p>{label}</DataInfoStyle.p>
      <DataInfoStyle.span>{data}</DataInfoStyle.span>
    </DataInfoStyle.div>
  );
}
