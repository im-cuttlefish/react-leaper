"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("../internal/symbol");
const getIntervals = (props, style) => Object.entries(props).map(([key, value]) => typeof value === "function" ? [key, value(style[key])] : [key, value]);
exports.createTransition = (interpolater) => (duration, props, abort) => {
    return function* (style) {
        const entries = getIntervals(props, style);
        const destination = {};
        for (const [key, [, x]] of entries) {
            destination[key] = x;
        }
        let aborted = false;
        const abortCallback = () => {
            aborted = true;
        };
        if (abort) {
            abort[symbol_1.registerCallback](abortCallback);
            setTimeout(() => {
                abort[symbol_1.unregisterCallback](abortCallback);
            }, duration);
        }
        let passed = 0;
        while (true) {
            if (passed >= duration || aborted) {
                abort && abort[symbol_1.unregisterCallback](abortCallback);
                return destination;
            }
            const result = {};
            for (const [key, [from, to]] of entries) {
                result[key] = interpolater(passed, from, to, duration);
            }
            passed += yield result;
        }
    };
};
