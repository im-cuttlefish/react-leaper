import { ReactElement } from "react";
import { Style, Motion } from "../types";
export declare type Recycle = (style: Style, remove: Motion, children: (x: Style) => ReactElement) => void;
