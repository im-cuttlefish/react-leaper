import { Component, ContextType, ReactElement } from "react";
import { registerCallback, unregisterCallback } from "./internal/symbol";
import { UnmountContext } from "./internal/UnmountContext";
import {
  Dispatcher,
  MotionGenerator,
  MotionEntries,
  Motion,
  Style
} from "./types";

interface State {
  style: Style;
}

export interface Props {
  on?: MotionEntries;
  add?: Motion;
  remove?: Motion;
  initial?: Style;
  children: (style: Style) => ReactElement;
}

export class Leaper extends Component<Props, State> {
  context!: ContextType<typeof UnmountContext>;

  private frameID = 0;
  private motionCallback: Map<Dispatcher, () => void>;
  private currentMotion: Set<MotionGenerator>;

  constructor(props: Props) {
    super(props);
    this.motionCallback = new Map();
    this.currentMotion = new Set();

    this.state = { style: { ...props.initial } };
  }

  render() {
    const { children } = this.props;
    return children(this.state.style);
  }

  componentDidMount() {
    const { add, on } = this.props;
    const { style } = this.state;
    this.ticker();

    if (add) {
      this.currentMotion.add(add(style));
    }

    if (on) {
      for (const [dispatcher, motion] of on) {
        const callback = () => {
          const { style } = this.state;
          this.currentMotion.add(motion(style));
        };

        this.motionCallback.set(dispatcher, callback);
        dispatcher[registerCallback](callback);
      }
    }
  }

  componentWillUnmount() {
    const { children, remove } = this.props;
    const { style } = this.state;

    if (remove) {
      this.context.recycle(style, remove, children);
    }

    cancelAnimationFrame(this.frameID);

    for (const [dispatcher, callback] of this.motionCallback) {
      dispatcher[unregisterCallback](callback);
    }
  }

  private ticker = () => {
    let passed = performance.now();

    const frame = (progress: number) => {
      this.frameID = requestAnimationFrame(frame);
      const delta = progress - passed;
      const props = { ...this.state.style };
      passed = progress;

      for (const generator of this.currentMotion) {
        const { value, done } = generator.next(delta);
        Object.assign(props, value);

        if (done) {
          this.currentMotion.delete(generator);
          continue;
        }
      }

      this.setState({ style: { ...props } });
    };

    this.frameID = requestAnimationFrame(frame);
  };
}

Leaper.contextType = UnmountContext;
