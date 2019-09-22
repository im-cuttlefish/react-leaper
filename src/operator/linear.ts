import { Transition } from "./types";
import { Style } from "../types";

export const linear: Transition = (duration, props) =>
  function*() {
    let passed = 0;
    const entries = Object.entries(props);
    const to: Style = {};

    for (const [key, [, x, template]] of entries) {
      to[key] = template ? template(x) : x;
    }

    while (true) {
      const result: Style = {};

      if (passed >= duration) {
        return to;
      }

      for (const [key, [from, to, template]] of entries) {
        const num = (to - from) * (passed / duration);
        const value = template ? template(num) : num;
        result[key] = value;
      }

      passed += yield result;
    }
  };
