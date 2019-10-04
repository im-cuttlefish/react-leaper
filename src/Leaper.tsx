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
  onAdded?: () => void;
  onRemoved?: () => void;
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
    const { add, onAdded, on } = this.props;
    const { style } = this.state;
    this.ticker();

    if (add) {
      const withAdded: Motion = function*(style) {
        yield* add(style);
        onAdded && onAdded();
      };

      this.currentMotion.add(withAdded(style));
    } else {
      onAdded && onAdded();
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
    const { children, remove, onRemoved } = this.props;
    const { style } = this.state;

    if (remove) {
      const withRemoved: Motion = function*(style) {
        yield* remove(style);
        onRemoved && onRemoved();
      };

      this.context.recycle(style, withRemoved, children);
    } else {
      onRemoved && onRemoved();
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
