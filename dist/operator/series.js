"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series = (...motions) => function* (style) {
    const copy = Object.assign({}, style);
    for (const motion of motions) {
        const generator = motion(copy);
        let delta = 0;
        while (true) {
            const { done, value } = generator.next(delta);
            Object.assign(copy, value);
            if (done) {
                if (value) {
                    delta = yield value;
                }
                continue;
            }
            delta = yield value;
        }
    }
};
