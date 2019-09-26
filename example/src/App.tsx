import React, { useEffect, useState } from "react";
import {
  useDispatcher,
  Leaper,
  LeaperContainer,
  linear,
  repeat,
  template,
  sin
} from "../../";

const blinkMotion = sin(1000, { opacity: [0, 1] });

const rotateMotion = template(
  { transform: x => `rotate(${x}deg)` },
  repeat(Infinity, linear(1000, { transform: [0, 360] }))
);

const removeMotion = sin(1000, { opacity: [1, 0] });

const initial = {
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
          {style => <div style={style}>Hello World!</div>}
        </Leaper>
      ) : (
        <></>
      )}
    </LeaperContainer>
  );
};

export default App;