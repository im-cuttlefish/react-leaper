import { createTransition } from "./createTransition";

const { PI } = Math;

export const sin = createTransition(
  (current, from, to, duration) =>
    from + (to - from) * Math.sin((PI / 2) * (current / duration))
);
