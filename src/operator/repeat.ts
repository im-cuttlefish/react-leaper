import { Motion, Style } from "../types";

export const repeat = (count: number, motion: Motion): Motion =>
  function*(style) {
    const copy = { ...style };
    let generator = motion(copy);
    let current = 0;
    let delta = 0;

    while (current < count) {
      const { done, value } = generator.next(delta);
      Object.assign(copy, value);

      if (done) {
        if (value) {
          delta = yield value;
        }

        current++;
        generator = motion(copy);
        continue;
      }

      delta = yield value as Style;
    }
  };
