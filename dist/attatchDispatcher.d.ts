import { Dispatcher, MotionMap } from "./types";
export declare const attatchDispatcher: <T extends MotionMap>(motionMap: T) => [[Dispatcher, import("./types").Motion][], { [key in keyof T]: Dispatcher; }];
