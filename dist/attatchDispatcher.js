"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createDispatcher_1 = require("./createDispatcher");
exports.attatchDispatcher = (motionMap) => {
    const dispatcherMap = {};
    const motionEntries = [];
    const entries = Object.entries(motionMap);
    for (const [key, motion] of entries) {
        const dispatcher = createDispatcher_1.createDispatcher();
        dispatcherMap[key] = dispatcher;
        motionEntries.push([dispatcher, motion]);
    }
    return [motionEntries, dispatcherMap];
};
