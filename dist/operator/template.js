"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = (motion, templateMap) => function* (style) {
    const generator = motion(style);
    let delta = 0;
    while (true) {
        const { done, value: style } = generator.next(delta);
        if (style) {
            for (const [key, value] of Object.entries(style)) {
                style[key] = key in templateMap ? templateMap[key](value) : value;
            }
        }
        delta = yield style;
        if (done) {
            continue;
        }
    }
};
