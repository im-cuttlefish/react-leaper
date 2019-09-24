import { ReactElement } from "react";
import { Motion, Style } from "../types";
export interface Props {
    remove: Motion;
    initial: Style;
    noticeAnimationEnd: () => void;
    children: (style: Style) => ReactElement;
}
export declare const UnmountedLeaper: (props: Props) => ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
