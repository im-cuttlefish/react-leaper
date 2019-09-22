import { Motion, Dispatcher } from "../types";

export interface TransitionProps {
  [key: string]: [number, number, ((x: number) => string) | void];
}

export type Transition = (
  duration: number,
  props: TransitionProps,
  abort?: Dispatcher
) => Motion;
