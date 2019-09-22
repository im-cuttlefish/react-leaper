"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const attatchDispatcher_1 = require("./attatchDispatcher");
exports.useFactory = () => {
    const prev = react_1.useRef(new Map());
    const next = new Map();
    react_1.useEffect(() => {
        prev.current = next;
    });
    return (id, motionMap) => {
        const memoized = prev.current.get(id);
        if (memoized) {
            next.set(id, memoized);
            return memoized;
        }
        const result = attatchDispatcher_1.attatchDispatcher(motionMap);
        next.set(id, result);
        return result;
    };
};
