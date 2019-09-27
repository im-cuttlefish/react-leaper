"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pallarel = (...motions) => function* (style) {
    const generators = motions.map(motion => motion(style));
    let delta = 0;
    while (true) {
        let doneAll = true;
        const result = {};
        for (const generator of generators) {
            const { done, value } = generator.next(delta);
            Object.assign(result, value);
            doneAll = done && doneAll;
        }
        if (doneAll) {
            return result;
        }
        delta = yield result;
    }
};
