"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.UnmountedLeaper = (props) => {
    const [style, setStyle] = react_1.useState(props.initial);
    react_1.useEffect(() => {
        const generator = props.remove(props.initial);
        let frameID = 0;
        let passed = performance.now();
        const frame = (progress) => {
            frameID = requestAnimationFrame(frame);
            const delta = progress - passed;
            passed = progress;
            const { value, done } = generator.next(delta);
            setStyle(Object.assign(Object.assign({}, style), value));
            if (done) {
                cancelAnimationFrame(frameID);
                props.noticeAnimationEnd();
                return;
            }
        };
        frameID = requestAnimationFrame(frame);
    }, []);
    const { children } = props;
    return children(style);
};
