import { MotionMap, Dispatcher } from "./types";
export declare const useFactory: () => <T extends MotionMap>(id: string | number, motionMap: T) => [[Dispatcher, import("./types").Motion][], { [key in keyof T]: Dispatcher; }];
