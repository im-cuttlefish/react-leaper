import { MotionMap } from "./types";
export declare const useDispatcher: <T extends MotionMap>(motionMap: T) => [[import("./types").Dispatcher, import("./types").Motion][], { [key in keyof T]: import("./types").Dispatcher; }];
