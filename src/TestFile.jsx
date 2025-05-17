import { useState } from "react";
// import { useEventEmitter } from "./useEventEmitter";
import { useEventEmitter } from "./EventEmitterContext";

const TestFile = () => {
  const { emit } = useEventEmitter();

  const [value, setValue] = useState("");

  const _handleEvent = () => {
    emit("emitFromTestFile", value);
  };

  return (
    <div>
      <p>Test File</p>
      <input
        type="tetx"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => _handleEvent()}>send</button>
    </div>
  );
};

export default TestFile;
