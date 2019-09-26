"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTransition_1 = require("./createTransition");
const { PI } = Math;
exports.sin = createTransition_1.createTransition((current, from, to, duration) => from + (to - from) * Math.sin((PI / 2) * (current / duration)));
