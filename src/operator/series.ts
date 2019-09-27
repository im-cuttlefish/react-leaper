import { Motion, Style } from "../types";

export const series = (...motions: Motion[]): Motion =>
  function*(style) {
    const copy = { ...style };

    for (const motion of motions) {
      const generator = motion(copy);
      let delta = 0;

      while (true) {
        const { done, value } = generator.next(delta);
        Object.assign(copy, value);

        if (done) {
          if (value) {
            delta = yield value;
          }

          continue;
        }

        delta = yield value as Style;
      }
    }
  };
