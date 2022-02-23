import * as React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div>x = {count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
