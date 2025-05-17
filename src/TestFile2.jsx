import { useState } from "react";
// import { HeaderEmiiter } from "./customEvents";
// import { useEventEmitter } from "./useEventEmitter";
import { useEventEmitter } from "./EventEmitterContext";

const TestFile2 = () => {
  const { subscribe } = useEventEmitter();
  const [value, setValue] = useState("");

  const _listenCustomEvent = (args) => {
    setValue(args);
    () => alert(`event triggrred ${args}`);
  };

  subscribe("emitFromTestFile", _listenCustomEvent);

  return (
    <div>
      <p>Test File 2</p>
      <p>Event Output: {value}</p>
    </div>
  );
};

export default TestFile2;
