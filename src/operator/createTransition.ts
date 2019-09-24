import { Transition, Interpolater, TransitionProps } from "./types";
import { Style } from "../types";
import { registerCallback, unregisterCallback } from "../internal/symbol";

const getIntervals = (props: TransitionProps, style: Style) =>
  Object.entries(props).map(([key, value]): [string, [number, number]] =>
    typeof value === "function" ? [key, value(style[key])] : [key, value]
  );

export const createTransition = (interpolater: Interpolater): Transition => (
  duration,
  props,
  abort
) => {
  return function*(style) {
    const entries = getIntervals(props, style);
    const destination: Style = {};

    for (const [key, [, x]] of entries) {
      destination[key] = x;
    }

    let aborted = false;
    const abortCallback = () => {
      aborted = true;
    };

    if (abort) {
      abort[registerCallback](abortCallback);

      setTimeout(() => {
        abort[unregisterCallback](abortCallback);
      }, duration);
    }

    let passed = 0;

    while (true) {
      if (passed >= duration || aborted) {
        abort && abort[unregisterCallback](abortCallback);
        return destination;
      }

      const result: Style = {};

      for (const [key, [from, to]] of entries) {
        result[key] = interpolater(passed, from, to, duration);
      }

      passed += yield result;
    }
  };
};
