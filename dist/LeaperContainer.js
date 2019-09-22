"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const uuid_1 = require("uuid");
const UnmountContext_1 = require("./internal/UnmountContext");
const UnmountedLeaper_1 = require("./internal/UnmountedLeaper");
class LeaperContainer extends react_1.Component {
    constructor() {
        super(...arguments);
        this.unmounted = new Map();
        this.recycle = (style, remove, children) => {
            const id = uuid_1.v4();
            const child = (react_1.default.createElement(UnmountedLeaper_1.UnmountedLeaper, { key: id, initial: style, remove: remove, noticeAnimationEnd: () => this.unmountChild(id) }, children));
            this.unmounted.set(id, child);
            this.forceUpdate();
        };
        this.unmountChild = (id) => {
            this.unmounted.delete(id);
            this.forceUpdate();
        };
    }
    render() {
        return (react_1.default.createElement(UnmountContext_1.UnmountContext.Provider, { value: { recycle: this.recycle } },
            this.props.children,
            react_1.default.createElement(react_1.default.Fragment, null, [...this.unmounted.values()])));
    }
}
exports.LeaperContainer = LeaperContainer;
