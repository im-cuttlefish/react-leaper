"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const symbol_1 = require("./internal/symbol");
const UnmountContext_1 = require("./internal/UnmountContext");
class Leaper extends react_1.Component {
    constructor(props) {
        super(props);
        this.frameID = 0;
        this.ticker = () => {
            let passed = performance.now();
            const frame = (progress) => {
                this.frameID = requestAnimationFrame(frame);
                const delta = progress - passed;
                const props = Object.assign({}, this.state.style);
                passed = progress;
                for (const generator of this.currentMotion) {
                    const { value, done } = generator.next(delta);
                    Object.assign(props, value);
                    if (done) {
                        this.currentMotion.delete(generator);
                        continue;
                    }
                }
                this.setState({ style: Object.assign({}, props) });
            };
            this.frameID = requestAnimationFrame(frame);
        };
        this.motionCallback = new Map();
        this.currentMotion = new Set();
        this.state = { style: Object.assign({}, props.initial) };
    }
    render() {
        const { children } = this.props;
        return children(this.state.style);
    }
    componentDidMount() {
        const { add, onAdded, on } = this.props;
        const { style } = this.state;
        this.ticker();
        if (on) {
            for (const [dispatcher, motion] of on) {
                const callback = () => {
                    const { style } = this.state;
                    this.currentMotion.add(motion(style));
                };
                this.motionCallback.set(dispatcher, callback);
                dispatcher[symbol_1.registerCallback](callback);
            }
        }
        if (add) {
            const withAdded = function* (style) {
                yield* add(style);
                onAdded && onAdded();
            };
            this.currentMotion.add(withAdded(style));
        }
        else {
            onAdded && onAdded();
        }
    }
    componentWillUnmount() {
        const { children, remove, onRemoved } = this.props;
        const { style } = this.state;
        cancelAnimationFrame(this.frameID);
        for (const [dispatcher, callback] of this.motionCallback) {
            dispatcher[symbol_1.unregisterCallback](callback);
        }
        if (remove) {
            const withRemoved = function* (style) {
                yield* remove(style);
                onRemoved && onRemoved();
            };
            this.context.recycle(style, withRemoved, children);
        }
        else {
            onRemoved && onRemoved();
        }
    }
}
exports.Leaper = Leaper;
Leaper.contextType = UnmountContext_1.UnmountContext;
