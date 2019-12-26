import React, { useState, useEffect, Fragment } from "react";
import { render } from "react-dom";
import { css } from "emotion";

function Light({
  on,
  blink
}: {
  readonly on: boolean;
  readonly blink: boolean;
}) {
  const [blinkFlag, setBlinkFlag] = useState(false);
  useEffect(() => {
    if (on && blink) {
      const interval = setInterval(() => {
        setBlinkFlag(!blinkFlag);
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [on, blink, blinkFlag, setBlinkFlag]);
  let color: string;
  if (on && blink) {
    if (blinkFlag) {
      color = "yellow";
    } else {
      color = "orange";
    }
  } else if (on && !blink) {
    color = "yellow";
  } else if (!on) {
    color = "black";
  }
  return (
    <Fragment>
      <pre>on:{on.toString()}</pre>
      <pre>blink:{blink.toString()}</pre>
      <pre>blinkFlag:{blinkFlag.toString()}</pre>
      <div
        className={css`
          width: 100px;
          height: 100px;
          border-radius: 50px;
          background-color: ${color};
        `}
      />
    </Fragment>
  );
}

function App() {
  const [lightOn, setLightOn] = React.useState(true);
  const [blinkOn, setBlinkOn] = React.useState(false);
  return (
    <Fragment>
      <div>
        <Light on={lightOn} blink={blinkOn} />
        <button
          onClick={() => {
            if (lightOn) {
              setLightOn(false);
              setBlinkOn(false);
            } else {
              setLightOn(true);
            }
          }}
        >
          Power
        </button>
        <button
          onClick={() => {
            if (lightOn) {
              setBlinkOn(!blinkOn);
            }
          }}
        >
          Blink
        </button>
      </div>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
