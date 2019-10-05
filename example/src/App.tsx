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

const addMotion = cubic(1000, { opacity: [0, 1] });

const rotateMotion = template(
  repeat(linear(1000, { transform: [0, 360] }), 2, true),
  { transform: x => `rotate(${x}deg)` }
);

const swingMotion = repeat(
  series(sin(1000, { left: [0, 100] }), sin(1000, { left: [100, 0] })),
  2
);

const combinedMotion = series(rotateMotion, swingMotion);

const removeMotion = sin(1000, { opacity: [1, 0] });

const initial = {
  opacity: 0,
  display: "inline-block",
  position: "absolute",
  transformOrigin: "center",
  willChange: "opacity, left, transform"
};

const App: React.FC = () => {
  const [isActive, toggleActiveness] = useState(true);
  const [entries, { combined }] = useDispatcher({
    combined: combinedMotion
  });

  useEffect(() => {
    setTimeout(combined, 2000);
    setTimeout(() => toggleActiveness(false), 10000);
  }, [combined]);

  return (
    <LeaperContainer>
      {isActive && (
        <Leaper
          on={entries}
          add={addMotion}
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
