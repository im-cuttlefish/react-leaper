"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linear = (duration, props) => function* () {
    const entries = Object.entries(props);
    const passed = 0;
    while (true) {
        if (passed >= duration) {
            const to = {};
            for (const [key, [, value, template]] of entries) {
                to[key] = template ? template(value) : value;
            }
            yield to;
            break;
        }
    }
};
