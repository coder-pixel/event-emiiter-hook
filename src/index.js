import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EventEmitterProvider } from "./EventEmitterContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <EventEmitterProvider>
      <App />
    </EventEmitterProvider>
  </StrictMode>
);
