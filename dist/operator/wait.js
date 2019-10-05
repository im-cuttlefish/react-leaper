"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = (msec) => function* () {
    let passed = false;
    setTimeout(() => {
        passed = true;
    }, msec);
    while (!passed) {
        yield {};
    }
};
