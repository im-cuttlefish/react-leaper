import { Motion, Dispatcher } from "../types";

export type Interpolater = (
  current: number,
  from: number,
  to: number,
  duration: number
) => number;

export interface TransitionProps {
  [key: string]:
    | [number, number]
    | ((x: number | string | void) => [number, number]);
}

export type Transition = (
  duration: number,
  props: TransitionProps,
  abort?: Dispatcher
) => Motion;
