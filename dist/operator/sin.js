"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTransition_1 = require("./createTransition");
const { PI, cos } = Math;
exports.sin = createTransition_1.createTransition(x => 1 - (cos(PI * x) + 1) / 2);
