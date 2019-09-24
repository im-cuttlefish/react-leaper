import React, { useEffect, useState } from "react";
import {
  useDispatcher,
  Leaper,
  LeaperContainer,
  Motion,
  linear,
  repeat,
  template
} from "../../";

const blinkMotion: Motion = function*() {
  let passed = 0;

  while (true) {
    const opacity = (Math.cos(passed / 100) + 1) / 2;
    passed += yield { opacity };
  }
};

const rotateMotion = template(
  repeat(Infinity, linear(1000, { transform: [0, 360] })),
  { transform: x => `rotate(${x}deg)` }
);

const removeMotion = linear(1000, { opacity: [1, 0] });

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
    setTimeout(() => toggleActiveness(false), 3000);
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
