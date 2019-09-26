import { Motion, Style } from "../types";

export const repeat = (count: number, motion: Motion): Motion =>
  function*(style) {
    let generator = motion(style);
    let current = 0;
    let delta = 0;

    while (current < count) {
      const { done, value } = generator.next(delta);
      style = { ...style, ...value };

      if (done) {
        if (value) {
          delta = yield value;
        }

        current++;
        generator = motion(style);
        continue;
      }

      delta = yield value as Style;
    }
  };
