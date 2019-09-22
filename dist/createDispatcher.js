"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("./internal/symbol");
exports.createDispatcher = () => {
    const callbackSet = new Set();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatcher = () => {
        callbackSet.forEach(elm => elm());
    };
    dispatcher[symbol_1.registerCallback] = (callback) => {
        callbackSet.add(callback);
    };
    dispatcher[symbol_1.unregisterCallback] = (callback) => {
        callbackSet.delete(callback);
    };
    return dispatcher;
};
