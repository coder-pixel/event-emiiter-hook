import { useState } from "react";
export const useEventEmitter = () => {
  const [events, setaEvents] = useState({});

  const subscribe = (event, cb) => {
    console.log({ event, cb });
    if (!events?.[event]) {
      // if there's no entry found in events obj for that specific event, then
      events[event] = []; // initialze with an empty array
    }

    events[event].push(cb);
  };

  const unsubscribe = (event, cb) => {
    if (!events[event]) return;

    events[event].delete(cb); // Remove specific callback
  };

  const emit = (event, args) => {
    console.log({ event, args });
    console.log({ events });

    // Check if the specified event is exist / subscribed by anyone
    if (!events[event]) {
      // Doesn't exist, so just return
      return;
    }

    const res = [];

    events[event].forEach((cb) => {
      if (Array.isArray(args)) {
        res.push(cb(...args)); // spread if array
      } else {
        res.push(cb(args)); // pass as-is for other types
      }
    });

    return res;
  };

  return {
    subscribe,
    unsubscribe,
    emit,
  };
};

// this is not optimal as then we have to call this hook once in top level, and then pass it (fn's like subscribe etc) down as different hook initializations will create different instances...
// so optimal way, will use a context to provide it anywhere in the app
