import { Motion } from "../types";
interface TemplateMap {
    [key: string]: (x: number | string) => number | string;
}
export declare const template: (templateMap: TemplateMap, motion: Motion) => Motion;
export {};
