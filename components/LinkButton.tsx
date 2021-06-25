import classnames from "classnames";
import Link from "next/link";
import * as React from "react";

interface LinkButtonProps extends React.AnchorHTMLAttributes<never> {
  disabled?: boolean;
  href: string;
}

export function LinkButton({
  disabled = false,
  href,
  className,
  ...props
}: LinkButtonProps) {
  if (disabled) {
    // React Router <Link> requires the `to` prop, but rendering an <a> without
    // an `href` works better for "disabling" a link
    return (
      <a
        {...props}
        className={classnames(
          className,
          baseClasses,
          "border4 fg4 bg-transparent no-pointer"
        )}
      />
    );
  }
  return (
    <Link href={href}>
      <a
        onClick={props.onClick}
        className={classnames(
          className,
          baseClasses,
          "border2 button-shadow button-bg button-bg-hover color-inherit active-squish"
        )}
        {...props}
      ></a>
    </Link>
  );
}

const baseClasses = classnames(
  "no-underline",
  "db",
  "ba br2 pv1 ph2",
  "b f5",
  "SimpleFocus"
);
