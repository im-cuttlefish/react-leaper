import { Component, ContextType, ReactElement } from "react";
import { UnmountContext } from "./internal/UnmountContext";
import { MotionEntries, Motion, Style } from "./types";
interface State {
    style: Style;
}
export interface Props {
    on?: MotionEntries;
    add?: Motion;
    remove?: Motion;
    initial?: Style;
    onAdded?: () => void;
    onRemoved?: () => void;
    children: (style: Style) => ReactElement;
}
export declare class Leaper extends Component<Props, State> {
    context: ContextType<typeof UnmountContext>;
    private frameID;
    private motionCallback;
    private currentMotion;
    constructor(props: Props);
    render(): ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private ticker;
}
export {};
