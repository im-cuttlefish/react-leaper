"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series = (...motions) => function* (style) {
    for (const motion of motions) {
        const generator = motion(style);
        let delta = 0;
        while (true) {
            const { done, value } = generator.next(delta);
            style = Object.assign(Object.assign({}, style), value);
            delta = yield value;
            if (done) {
                continue;
            }
        }
    }
};
