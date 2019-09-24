import { registerCallback, unregisterCallback } from "./internal/symbol";

export interface Style {
  [key: string]: string | number;
}

export type MotionGenerator = Generator<Style, void | Style, number>;
export type Motion = (current: Style) => MotionGenerator;

export type MotionEntries = [Dispatcher, Motion][];

export interface MotionMap {
  [key: string]: Motion;
}

export interface Dispatcher {
  (): void;
  readonly [registerCallback]: (callback: () => void) => void;
  readonly [unregisterCallback]: (callback: () => void) => void;
}

export interface DispatcherMap {
  [key: string]: Dispatcher;
}
