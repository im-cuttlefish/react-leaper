"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = (count, motion) => function* (style) {
    let generator = motion(style);
    let current = 0;
    let delta = 0;
    while (current < count) {
        const { done, value } = generator.next(delta);
        style = Object.assign(Object.assign({}, style), value);
        if (done) {
            if (value) {
                delta = yield value;
            }
            current++;
            generator = motion(style);
            continue;
        }
        delta = yield value;
    }
};
