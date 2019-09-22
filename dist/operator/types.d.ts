export interface TransitionProps {
    [key: string]: [number, number] | [number, number, (x: number) => string];
}
