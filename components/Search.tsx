import classnames from "classnames";
import * as React from "react";

interface SearchProps {
  updateSearch: (search: string) => void;
  search: string;
}

export default function Search(props: SearchProps) {
  const { updateSearch, search } = props;
  const ref = React.useRef<HTMLInputElement>(null);
  const iconSize = 24;
  const inputHeight = 36;
  return (
    <div className="relative mv3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svg/search.svg"
        width={iconSize}
        height={iconSize}
        alt=""
        className="o-50 absolute dark:invert"
        style={{ left: 10, top: 8 }}
      />
      <input
        aria-label="Search"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="search"
        autoCapitalize="none"
        className={classnames(
          "f5 w-100 border-box",
          "pv2",
          "SimpleFocus",
          "inset-shadow",
          "br-pill ba",
          "bg1",
          "fg1",
          "border2"
        )}
        style={{ paddingLeft: 40, paddingRight: 40, height: inputHeight }}
        value={search}
        onChange={(event) => {
          updateSearch(event.target.value);
        }}
        ref={ref}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svg/clear.svg"
        width={iconSize}
        height={iconSize}
        alt=""
        onClick={() => {
          updateSearch("");
          if (ref.current) {
            ref.current.focus();
          }
        }}
        className={classnames("o-50 absolute dark:invert", {
          dn: search === "",
        })}
        style={{ right: 6, top: 6 }}
      />
    </div>
  );
}

Search.displayName = "Search";
