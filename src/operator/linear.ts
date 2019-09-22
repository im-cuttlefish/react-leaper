import { createTransition } from "./createTransition";

export const linear = createTransition(
  (current, from, to, duration) => (to - from) * (current / duration)
);
