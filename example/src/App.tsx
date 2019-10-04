import React, { useEffect, useState } from "react";
import {
  useDispatcher,
  Leaper,
  LeaperContainer,
  repeat,
  template,
  sin,
  cubic,
  linear,
  series
} from "../../";

const blinkMotion = cubic(1000, { opacity: [0, 1] });

const rotateMotion = template(
  repeat(linear(1000, { transform: [0, 360] }), 2, true),
  { transform: x => `rotate(${x}deg)` }
);

const swingMotion = repeat(series(
  sin(1000, { left: [0, 100] }),
  sin(1000, { left: [100, 0] })
), 2);

const conbined = series(rotateMotion, swingMotion);

const removeMotion = sin(1000, { opacity: [1, 0] });

const initial = {
  opacity: 0,
  display: "inline-block",
  transformOrigin: "center",
  position: "absolute"
};

const App: React.FC = () => {
  const [isActive, toggleActiveness] = useState(true);
  const [entries, { blink, rotate }] = useDispatcher({
    blink: blinkMotion,
    rotate: conbined
  });

  useEffect(() => {
    setTimeout(blink, 1000);
    setTimeout(rotate, 2000);
    setTimeout(() => toggleActiveness(false), 10000);
  }, [blink, rotate]);

  return (
    <LeaperContainer>
      {isActive && (
        <Leaper
          on={entries}
          remove={removeMotion}
          onAdded={() => console.log("added")}
          onRemoved={() => console.log("removed")}
          initial={initial}
        >
          {style => <div style={style}>\\ Hello World! //</div>}
        </Leaper>
      )}
    </LeaperContainer>
  );
};

export default App;
