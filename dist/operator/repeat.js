"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = (count, motion) => function* (style) {
    const copy = Object.assign({}, style);
    let generator = motion(copy);
    let current = 0;
    let delta = 0;
    while (current < count) {
        const { done, value } = generator.next(delta);
        Object.assign(copy, value);
        if (done) {
            if (value) {
                delta = yield value;
            }
            current++;
            generator = motion(copy);
            continue;
        }
        delta = yield value;
    }
};
