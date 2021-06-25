import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

interface NavLinkProps {
  className: string;
  activeClassName: string;
  href: string;
  children: JSX.Element;
}

const NavLink: React.FC<NavLinkProps> = ({
  className,
  activeClassName,
  href,
  children,
}) => {
  const router = useRouter();
  const isActive = router.asPath.startsWith(
    // `window.location` doesn't exist when server rendering, so let's use a
    // fake domain since we only care about the pathname anyway
    new URL(href, "https://example.com").pathname
  );
  const computedClassName = classnames(className, isActive && activeClassName);
  return (
    <Link href={href}>
      {React.cloneElement(children, { className: computedClassName })}
    </Link>
  );
};

export default NavLink;
