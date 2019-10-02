import React, { useEffect, useState } from "react";
import {
  useDispatcher,
  Leaper,
  LeaperContainer,
  repeat,
  template,
  sin,
  cubic,
  linear
} from "../../";

const blinkMotion = cubic(1000, { opacity: [0, 1] });

const rotateMotion = template(
  repeat(linear(1000, { transform: [0, 360] }), Infinity, true),
  { transform: x => `rotate(${x}deg)` }
);

const removeMotion = sin(1000, { opacity: [1, 0] });

const initial = {
  opacity: 0,
  display: "inline-block",
  transformOrigin: "center"
};

const App: React.FC = () => {
  const [isActive, toggleActiveness] = useState(true);
  const [entries, { blink, rotate }] = useDispatcher({
    blink: blinkMotion,
    rotate: rotateMotion
  });

  useEffect(() => {
    setTimeout(blink, 1000);
    setTimeout(rotate, 2000);
    setTimeout(() => toggleActiveness(false), 5000);
  }, [blink, rotate]);

  return (
    <LeaperContainer>
      {isActive ? (
        <Leaper on={entries} remove={removeMotion} initial={initial}>
          {style => <div style={style}>\\ Hello World! //</div>}
        </Leaper>
      ) : (
        <></>
      )}
    </LeaperContainer>
  );
};

export default App;
