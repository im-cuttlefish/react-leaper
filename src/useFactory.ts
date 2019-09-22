import { useRef, useEffect } from "react";
import { attatchDispatcher } from "./attatchDispatcher";
import { MotionMap, Dispatcher, MotionEntries } from "./types";

export const useFactory = () => {
  const prev = useRef(new Map());
  const next = new Map();

  useEffect(() => {
    prev.current = next;
  });

  return <T extends MotionMap>(id: string | number, motionMap: T) => {
    type Result = [MotionEntries, { [key in keyof T]: Dispatcher }];

    const memoized = prev.current.get(id);

    if (memoized) {
      next.set(id, memoized);
      return memoized as Result;
    }

    const result = attatchDispatcher(motionMap);
    next.set(id, result);
    return result as Result;
  };
};
