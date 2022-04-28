interface Props {
  count: number;
}

function Sub(props: Props) {
  const { count } = props;
  return <div>I am sub, count is {count}</div>;
}

export default Sub;
