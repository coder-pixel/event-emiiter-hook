import React, { createContext, useContext, useRef, useCallback } from "react";

const EventEmitterContext = createContext();

export const EventEmitterProvider = ({ children }) => {
  const eventsRef = useRef({});

  const emit = useCallback((event, args) => {
    const callbacks = eventsRef.current[event];
    if (!callbacks) return;

    return callbacks.map((cb) => {
      // check whether incoming args are array or not, and acc call the callback with properly passing the arguments
      if (Array.isArray(args)) return cb(...args);
      else return cb(args);
    });
  }, []);

  const subscribe = useCallback((event, callback) => {
    if (!eventsRef.current[event]) eventsRef.current[event] = []; // instantiating with empty array, if not already present

    eventsRef.current[event].push(callback); // one event can have multiple callbacks...

    return () => {
      // unsubscribe from the event on unmount
      eventsRef.current[event] = eventsRef.current[event].filter(
        (cb) => cb !== callback
      );
      if (eventsRef.current[event].length === 0)
        delete eventsRef.current[event];
    };
  }, []);

  return (
    <EventEmitterContext.Provider value={{ emit, subscribe }}>
      {children}
    </EventEmitterContext.Provider>
  );
};

export const useEventEmitter = () => useContext(EventEmitterContext);
