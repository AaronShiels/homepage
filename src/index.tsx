import "./styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as ReactRouterDOM from "react-router-dom";
import { Lander } from "./components/Lander.js";

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
const router = ReactRouterDOM.createBrowserRouter([
  {
    element: <Lander />,
    path: "/"
  }
]);

root.render(
  <React.StrictMode>
    <ReactRouterDOM.RouterProvider router={router} />
  </React.StrictMode>
);
