import { Motion } from "../types";
interface TemplateMap {
    [key: string]: (x: number | string) => number | string;
}
export declare const template: (motion: Motion, templateMap: TemplateMap) => Motion;
export {};
