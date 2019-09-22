"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const attatchDispatcher_1 = require("./attatchDispatcher");
exports.useDispatcher = (motionMap) => {
    const { current } = react_1.useRef(attatchDispatcher_1.attatchDispatcher(motionMap));
    return current;
};
