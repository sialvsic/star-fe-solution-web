import React from 'react';

interface Props {
  black: boolean;
  children: React.ReactElement | null;
}

export default function Square({ black, children }: Props) {
  const fill = black ? 'black' : 'white';
  const stroke = black ? 'white' : 'black';

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}
