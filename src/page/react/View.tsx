import { Suspense, useEffect, useState } from 'react';
import Sub from './Sub';

const View = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Sub count={count} />
      </Suspense>
      <div>count is {count}</div>
    </>
  );
};

export default View;
