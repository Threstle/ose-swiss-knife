import React, { useEffect, useLayoutEffect } from "react";
import { Stack } from "@cher-ami/router";
import "./App.less";

const componentName = "App";

function App() {


  // Magic VH that make responsive design easy by Bastien Cornier
  // --------------------------------------------------------------------- MANAGE CSS VH

  useLayoutEffect(() => {
    updateTrueCssVh();
  }, []);

  /**
   * Update vh css variable unit to support adress bars on mobile
   * Issue : https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
   *
   * Use it like :
   * `height: calc(var(--vh, 1vh) * 100);`
   */
  function updateTrueCssVh() {
    // Get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log(vh);
  }

  // --------------------------------------------------------------------- RESIZE GLOBAL HANDLER

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  function resizeHandler() {
    updateTrueCssVh();
  }

  return (
    <div className={componentName}>
      <h1 className={`${componentName}_title`}>B/X Time Tracker</h1>
      <Stack />
    </div>
  );
}

export default App;