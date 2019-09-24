import { createTransition } from "./createTransition";

export const linear = createTransition(
  (current, from, to, duration) => from + (to - from) * (current / duration)
);
