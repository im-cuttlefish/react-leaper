"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.done = (motion, callback) => function* (style) {
    yield* motion(style);
    callback();
};
