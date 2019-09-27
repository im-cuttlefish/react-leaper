"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTransition_1 = require("./createTransition");
const { pow } = Math;
exports.cubic = createTransition_1.createTransition(x => {
    return x < 0.5 ? 4 * pow(x, 3) : 1 - 4 * pow(1 - x, 3);
});
