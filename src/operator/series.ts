import { Motion, Style } from "../types";

export const series = (...motions: Motion[]): Motion =>
  function*(style) {
    const copy = { ...style };
    let generator = motions[0](copy);
    let delta = 0;
    let index = 0;

    while (index < motions.length) {
      const { done, value } = generator.next(delta);
      Object.assign(copy, value);

      if (!done) {
        delta = yield value as Style;
        continue;
      }

      const next = motions[++index];

      if (!next) {
        return value;
      }

      if (value) {
        delta = yield value;
      }

      generator = next(copy);
      continue;
    }
  };
