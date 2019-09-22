import { useRef } from "react";
import { attatchDispatcher } from "./attatchDispatcher";
import { MotionMap } from "./types";

export const useDispatcher = <T extends MotionMap>(motionMap: T) => {
  const { current } = useRef(attatchDispatcher(motionMap));
  return current;
};
