import React, { useEffect, useState } from "react";
import { useDispatcher, Leaper, LeaperContainer, Motion } from "../../";

const blinkMotion: Motion = function*() {
  let passed = 0;

  while (true) {
    const opacity = (Math.cos(passed / 100) + 1) / 2;
    passed += yield { opacity };
  }
};

const rotateMotion: Motion = function*() {
  let passed = 0;

  while (true) {
    const transform = `rotate(${passed / 500}rad)`;
    passed += yield { transform };
  }
};

const removeMotion: Motion = function*() {
  let passed = 0;

  while (true) {
    const opacity = Math.cos(passed / 1000);

    if (opacity <= 0) {
      return { opacity: 0 };
    }

    passed += yield { opacity };
  }
};

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
