import { useEffect, useState, ReactElement } from "react";
import { Motion, Style } from "../types";

export interface Props {
  remove: Motion;
  initial: Style;
  noticeAnimationEnd: () => void;
  children: (style: Partial<Style>) => ReactElement;
}

export const UnmountedLeaper = (props: Props) => {
  const [style, setStyle] = useState(props.initial);

  useEffect(() => {
    const generator = props.remove(props.initial);
    let frameID = 0;
    let passed = performance.now();

    const frame = (progress: number) => {
      frameID = requestAnimationFrame(frame);
      const delta = progress - passed;
      passed = progress;

      const { value, done } = generator.next(delta);
      setStyle({ ...style, ...value });

      if (done) {
        cancelAnimationFrame(frameID);
        props.noticeAnimationEnd();
        return;
      }
    };

    frameID = requestAnimationFrame(frame);
  }, []);

  const { children } = props;
  return children(style);
};
