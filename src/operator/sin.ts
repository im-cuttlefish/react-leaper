import { createTransition } from "./createTransition";

const { PI, cos } = Math;

export const sin = createTransition(x => 1 - (cos(PI * x) + 1) / 2);
