import { Transition, Interpolater } from "./types";
import { Style } from "../types";
import { registerCallback, unregisterCallback } from "../internal/symbol";

export const createTransition = (interpolater: Interpolater): Transition => (
  duration,
  props,
  abort
) => {
  const entries = Object.entries(props);
  const to: Style = {};

  for (const [key, [, x, template]] of entries) {
    to[key] = template ? template(x) : x;
  }

  return function*() {
    let aborted = false;
    let passed = 0;

    const abortCallback = () => {
      aborted = true;
    };

    if (abort) {
      abort[registerCallback](abortCallback);
    }

    while (true) {
      const result: Style = {};

      if (passed >= duration || aborted) {
        if (abort) {
          abort[unregisterCallback](abortCallback);
        }

        return to;
      }

      for (const [key, [from, to, template]] of entries) {
        const num = interpolater(passed, from, to, duration);
        const value = template ? template(num) : num;
        result[key] = value;
      }

      passed += yield result;
    }
  };
};
