import { Motion, Style } from "../types";

interface TemplateMap {
  [key: string]: (x: number | string) => number | string;
}

export const template = (motion: Motion, templateMap: TemplateMap): Motion =>
  function*(style) {
    const generator = motion(style);
    let delta = 0;

    while (true) {
      const { done, value: style } = generator.next(delta);

      if (style) {
        for (const [key, value] of Object.entries(style)) {
          style[key] = key in templateMap ? templateMap[key](value) : value;
        }
      }

      delta = yield style as Style;

      if (done) {
        continue;
      }
    }
  };
