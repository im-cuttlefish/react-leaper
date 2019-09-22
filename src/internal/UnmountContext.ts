import { createContext } from "react";
import { Recycle } from "./types";

interface UnmountContext {
  recycle: Recycle;
}

const defaultValue: UnmountContext = {
  recycle: () => {}
};

export const UnmountContext = createContext(defaultValue);
