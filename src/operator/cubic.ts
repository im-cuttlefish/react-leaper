import { createTransition } from "./createTransition";

const { pow } = Math;

export const cubic = createTransition(x => {
  return x < 0.5 ? 4 * pow(x, 3) : 1 - 4 * pow(1 - x, 3);
});
