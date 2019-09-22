"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = (...motions) => function* (style) {
    for (const motion of motions) {
        const { next } = motion(style);
        let delta = 0;
        while (true) {
            const result = next(delta);
            if (result.done) {
                break;
            }
            style = result.value;
            delta = yield style;
        }
    }
};
