import { Motion } from "../types";

export interface TransitionProps {
  [key: string]: [number, number, ((x: number) => string) | void];
}

export type Transition = (duration: number, props: TransitionProps) => Motion;
