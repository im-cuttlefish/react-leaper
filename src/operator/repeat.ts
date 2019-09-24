import { Motion, Style } from "../types";

export const repeat = (count: number, motion: Motion): Motion =>
  function*(style) {
    for (let i = 0; i < count; i++) {
      const generator = motion(style);
      let delta = 0;

      while (true) {
        const { done, value } = generator.next(delta);

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
