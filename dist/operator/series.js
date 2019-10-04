"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series = (...motions) => function* (style) {
    const copy = Object.assign({}, style);
    let generator = motions[0](copy);
    let delta = 0;
    let index = 0;
    while (index < motions.length) {
        const { done, value } = generator.next(delta);
        Object.assign(copy, value);
        if (!done) {
            delta = yield value;
            continue;
        }
        const next = motions[++index];
        if (!next) {
            return value;
        }
        if (value) {
            delta = yield value;
        }
        generator = next(copy);
        continue;
    }
};
