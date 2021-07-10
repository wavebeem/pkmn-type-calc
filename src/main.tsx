import { h, render } from "preact";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import ScreenError from "./ScreenError";
import "./style.css";

render(
  <ErrorBoundary render={(error) => <ScreenError error={error} />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.querySelector("#app") ?? document.body
);
