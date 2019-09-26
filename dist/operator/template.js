"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = (templateMap, motion) => function* (style) {
    const generator = motion(style);
    let delta = 0;
    while (true) {
        const { done, value: style } = generator.next(delta);
        if (style) {
            for (const [key, value] of Object.entries(style)) {
                style[key] = key in templateMap ? templateMap[key](value) : value;
            }
        }
        if (done) {
            if (style) {
                delta = yield style;
            }
            continue;
        }
        delta = yield style;
    }
};
