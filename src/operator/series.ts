import { Motion, Style } from "../types";

export const series = (...motions: Motion[]): Motion =>
  function*(style) {
    for (const motion of motions) {
      const generator = motion(style);
      let delta = 0;

      while (true) {
        const { done, value } = generator.next(delta);
        style = { ...style, ...value };
        delta = yield value as Style;

        if (done) {
          continue;
        }
      }
    }
  };
