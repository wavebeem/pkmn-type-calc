import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import classnames from "classnames";
import BasicHead from "./BasicHead";

interface NavLinkProps {
  className: string;
  activeClassName: string;
  href: string;
}

// TODO: Use activeClassName somehow
// https://flaviocopes.com/nextjs-active-link/
const NavLink: React.FC<NavLinkProps> = ({
  className,
  activeClassName,
  href,
  children,
}) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

const title = "Pokémon Type Calculator";

const tabClass = classnames(
  "no-underline",
  "pv2 ph2 f5",
  "TabFocus",
  "b bn",
  "br--top br2",
  "bg-transparent",
  "fg3 bottom-border-thick"
);

const tabClassActive = classnames("fg1 bottom-border-thick-current");

const Layout: React.FC = ({ children }) => {
  // TODO: Fetch from localStorage
  const offenseParams = "";
  const defenseParams = "";
  const pokedexParams = "";
  return (
    <>
      <Head>
        <BasicHead />
      </Head>
      <div className="sans-serif bg2 fg1 min-vh-100 flex flex-column">
        <div className="flex-auto">
          <h1 className="f3-ns f4 tc relative white PokeballHeader">
            <Link href="/">
              <a className="no-underline white hover-white-90 DottedFocus">
                {title}
              </a>
            </Link>
          </h1>
          <nav
            className={classnames([
              "flex justify-center",
              "bg1",
              "bb TabBarBorder",
              "pt3",
            ])}
          >
            <NavLink
              className={tabClass}
              activeClassName={tabClassActive}
              href={`/offense${offenseParams}`}
            >
              Offense
            </NavLink>
            <NavLink
              className={tabClass}
              activeClassName={tabClassActive}
              href={`/defense${defenseParams}`}
            >
              Defense
            </NavLink>
            <NavLink
              className={tabClass}
              activeClassName={tabClassActive}
              href={`/pokedex${pokedexParams}`}
            >
              Pokédex
            </NavLink>
            <NavLink
              className={tabClass}
              activeClassName={tabClassActive}
              href="/info"
            >
              Info
            </NavLink>
          </nav>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
