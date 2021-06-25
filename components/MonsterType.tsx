import classnames from "classnames";
import * as React from "react";
import { Type } from "../util/data";

interface MonsterTypeProps {
  type: Type;
  index: number;
}

// TODO: Destructure props
export default function MonsterType(props: MonsterTypeProps) {
  return (
    <div
      className={classnames(
        `type-${props.type} type-bg-dark`,
        "ttc tc flex",
        "pv0 ph2 lh-copy b",
        "br-pill ba border3 f6",
        { ml1: props.index > 0 }
      )}
    >
      {props.type}
    </div>
  );
}
