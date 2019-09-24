import { Motion, Style } from "../types";

export const pallarel = (...motions: Motion[]): Motion =>
  function*(style) {
    const generators = motions.map(motion => motion(style));
    let delta = 0;

    while (true) {
      let doneAll = true;
      let result: Style = {};

      for (const generator of generators) {
        const { done, value } = generator.next(delta);
        result = { ...result, ...value };
        doneAll = done!! && doneAll;
      }

      if (doneAll) {
        return result;
      }

      delta = yield result;
    }
  };
