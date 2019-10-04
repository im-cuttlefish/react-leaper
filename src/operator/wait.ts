import { Motion } from "../types";

export const wait = (msec: number): Motion =>
  function*() {
    let passed = false;

    setTimeout(() => {
      passed = true;
    }, msec);

    while (!passed) {
      yield {};
    }
  };
