import { registerCallback, unregisterCallback } from "./internal/symbol";
export interface Style {
    [key: string]: string | number;
}
export declare type MotionGenerator = Generator<Style, void | Style, number>;
export declare type Motion = (current: Style) => MotionGenerator;
export declare type MotionEntries = [Dispatcher, Motion][];
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
