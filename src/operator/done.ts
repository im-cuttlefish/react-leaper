import { Motion, Style } from "../types";

export const done = (motion: Motion, callback: () => void): Motion =>
  function*(style: Style) {
    yield* motion(style);
    callback();
  };
