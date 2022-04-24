import React from 'react';

interface Props {
  color: string;
}

function Overlay(props: Props) {
  const { color } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  );
}

export default Overlay;
