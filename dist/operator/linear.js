"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTransition_1 = require("./createTransition");
exports.linear = createTransition_1.createTransition((current, from, to, duration) => from + (to - from) * (current / duration));
