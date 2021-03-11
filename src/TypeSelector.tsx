import classnames from "classnames";
import * as React from "react";
import { Type, types, typesOrNone } from "./data";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes: Type[];
}

export default function TypeSelector(props: TypeSelectorProps) {
  const theTypes = props.includeNone ? typesOrNone : types;
  const styles = {
    disabled: "border4 bg2 o-60",
    selected: "border2 type-bg-dark no-box-shadow button-shadow",
    normal: "border2 bg1 fg1 button-bg button-shadow",
  };
  return (
    <div className="TypeSelector-Container">
      {theTypes.map((type) => {
        const isDisabled = props.disabledTypes.includes(type);
        const style = isDisabled
          ? styles.disabled
          : type === props.value
          ? styles.selected
          : styles.normal;
        return (
          <button
            key={`type-${type}`}
            disabled={isDisabled}
            className={classnames(
              style,
              "db w-100",
              "ba br-pill",
              "pv1 ph2",
              "f5 b",
              "ttc",
              "SimpleFocus",
              "active-squish",
              `type-${type}`
            )}
            onClick={() => props.onChange(type)}
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classnames(
                  `type-${type} b--black br-pill ba`,
                  type === props.value
                    ? "border1 type-bg-light"
                    : "border2 type-bg-dark"
                )}
                style={{
                  width: "1rem",
                  height: "1rem",
                }}
              />

              <span
                className="tl pl2 pr1 flex-auto truncate"
                style={{ lineHeight: buttonInnerHeight }}
              >
                {type}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

TypeSelector.displayName = "TypeSelector";
