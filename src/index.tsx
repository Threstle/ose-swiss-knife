import { Router } from "@cher-ami/router";
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import TrackerPage from "./pages/trackerPage/TrackerPage";

const routesList = [
    {
      path: "/",
      component: TrackerPage,
    }
  ];
ReactDOM.render(
    <Router routes={routesList} base={"/"}>
        <App />
    </Router>,
    document.getElementById("app")
);