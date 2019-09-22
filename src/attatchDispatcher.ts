import { createDispatcher } from "./createDispatcher";
import { MotionEntries, Dispatcher, MotionMap, DispatcherMap } from "./types";

export const attatchDispatcher = <T extends MotionMap>(motionMap: T) => {
  type Result = [MotionEntries, { [key in keyof T]: Dispatcher }];

  const dispatcherMap: DispatcherMap = {};
  const motionEntries: MotionEntries = [];

  const entries = Object.entries(motionMap);

  for (const [key, motion] of entries) {
    const dispatcher = createDispatcher();
    dispatcherMap[key] = dispatcher;
    motionEntries.push([dispatcher, motion]);
  }

  return [motionEntries, dispatcherMap] as Result;
};
