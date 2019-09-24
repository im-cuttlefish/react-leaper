import { Motion, Dispatcher } from "../types";
export declare type Interpolater = (current: number, from: number, to: number, duration: number) => number;
export interface TransitionProps {
    [key: string]: [number, number] | ((x: number | string | void) => [number, number]);
}
export declare type Transition = (duration: number, props: TransitionProps, abort?: Dispatcher) => Motion;
