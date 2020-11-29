import useGlobalCountState from "hook/globalSample";

const Counter = (): JSX.Element => {
  const [count, setCount] = useGlobalCountState("count");
  return (
    <div>
      <span>Counter: {count}</span>
      {/* update state by passing callback function */}
      <button onClick={() => setCount((v) => v + 1)}>+1</button>
      {/* update state by passing new value */}
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
};

export default Counter;
