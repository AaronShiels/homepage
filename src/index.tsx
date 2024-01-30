import "./styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as ReactRouterDOM from "react-router-dom";
import { Main } from "./components/Main.js";

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
const router = ReactRouterDOM.createBrowserRouter([
  {
    element: <Main />,
    path: "/"
  }
]);

root.render(
  <React.StrictMode>
    <ReactRouterDOM.RouterProvider router={router} />
  </React.StrictMode>
);
