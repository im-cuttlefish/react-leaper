import { registerCallback, unregisterCallback } from "./internal/symbol";
import { Dispatcher } from "./types";

export const createDispatcher = () => {
  const callbackSet = new Set<() => {}>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatcher: any = () => {
    callbackSet.forEach(elm => elm());
  };

  dispatcher[registerCallback] = (callback: () => {}) => {
    callbackSet.add(callback);
  };

  dispatcher[unregisterCallback] = (callback: () => {}) => {
    callbackSet.delete(callback);
  };

  return dispatcher as Dispatcher;
};
