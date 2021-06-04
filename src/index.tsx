import { Router } from "@cher-ami/router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import TrackerPage from "./pages/trackerPage/TrackerPage";
import LootDividerPage from "./pages/lootDividerPage/LootDividerPage";

const routesList = [
  {
    path: "/",
    component: TrackerPage,
  },
  {
    path: "/divider",
    component: LootDividerPage,
  }
];
ReactDOM.render(
  <Router routes={routesList} base={"/"}>
    <App />
  </Router>,
  document.getElementById("app")
);