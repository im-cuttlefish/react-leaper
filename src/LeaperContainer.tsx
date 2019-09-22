import React, { Component } from "react";
import { v4 } from "uuid";
import { UnmountContext } from "./internal/UnmountContext";
import { UnmountedLeaper } from "./internal/UnmountedLeaper";
import { Recycle } from "./internal/types";

export class LeaperContainer extends Component {
  private unmounted = new Map<string, JSX.Element>();

  render() {
    return (
      <UnmountContext.Provider value={{ recycle: this.recycle }}>
        {this.props.children}
        <>{[...this.unmounted.values()]}</>
      </UnmountContext.Provider>
    );
  }

  private recycle: Recycle = (style, remove, children) => {
    const id = v4();

    const child = (
      <UnmountedLeaper
        key={id}
        initial={style}
        remove={remove}
        noticeAnimationEnd={() => this.unmountChild(id)}
      >
        {children}
      </UnmountedLeaper>
    );

    this.unmounted.set(id, child);
    this.forceUpdate();
  };

  private unmountChild = (id: string) => {
    this.unmounted.delete(id);
    this.forceUpdate();
  };
}
