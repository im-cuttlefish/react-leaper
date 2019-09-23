import { Transition, Interpolater } from "./types";
import { Style } from "../types";
import { registerCallback, unregisterCallback } from "../internal/symbol";

export const createTransition = (interpolater: Interpolater): Transition => (
  duration,
  props,
  abort
) => {
  const getIntervals = (style: Style) =>
    Object.entries(props).map(([key, value]): [string, [number, number]] =>
      typeof value === "function" ? [key, value(style[key])] : [key, value]
    );

  return function*(style) {
    const entries = getIntervals(style);
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

      try {
        passed += yield result;
      } catch {
        abort && abort[unregisterCallback](abortCallback);
      }
    }
  };
};
