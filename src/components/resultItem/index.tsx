import { FC } from 'react';

const ResultItem: FC<{ label: string; value: string; testid?: string }> = ({
  label,
  value,
  testid,
}) => {
  return (
    <div>
      <h1 data-testid={testid}>{label}</h1>
      <p>{value}</p>
    </div>
  );
};

export default ResultItem;
