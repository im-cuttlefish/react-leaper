"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = (motion, templateMap) => function* (style) {
    const generator = motion(style);
    let delta = 0;
    while (true) {
        const { done, value: result } = generator.next(delta);
        if (result) {
            for (const [key, value] of Object.entries(result)) {
                result[key] = key in templateMap ? templateMap[key](value) : value;
            }
        }
        if (done) {
            if (result) {
                delta = yield result;
            }
            break;
        }
        delta = yield result;
    }
};
