import { Motion, Style } from "../types";

interface TemplateMap {
  [key: string]: (x: number | string) => number | string;
}

export const template = (motion: Motion, templateMap: TemplateMap): Motion =>
  function*(style) {
    const generator = motion(style);
    let delta = 0;

    while (true) {
      const { done, value: result } = generator.next(delta);

      if (result) {
        for (const [key, value] of Object.entries(result)) {
          result[key] = key in templateMap ? templateMap[key](value) : value;
        }
      }

      if (done) {
        if (result) {
          delta = yield result;
        }

        continue;
      }

      delta = yield result as Style;
    }
  };
