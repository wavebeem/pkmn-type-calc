import classnames from "classnames";
import Link from "next/link";
import * as React from "react";
import { getImage } from "../util/getImage";
import { pickTranslation } from "../util/pickTranslation";
import { Pokemon } from "../util/pkmn";
import MonsterType from "./MonsterType";
import StatsTable from "./StatsTable";

const nbsp = "\u00a0";

interface MonsterProps {
  pokemon: Pokemon;
  index: number;
}

// TODO: Destructure props
export default function Monster(props: MonsterProps) {
  const displayNumber = "#" + String(props.pokemon.number).padStart(3, "0");
  const params = new URLSearchParams({ types: props.pokemon.types.join(" ") });
  const speciesName = pickTranslation(props.pokemon.speciesNames);
  const formName = pickTranslation(props.pokemon.formNames);
  return (
    <div className={classnames("fg1 pv3", "flex-ns items-center", "Monster")}>
      <div className="flex flex-column">
        <div className="flex flex-column pa3 br4 bg1 flex ba border4">
          <div className="flex items-center">
            <h2 className="mv0 f4">{speciesName}</h2>
            <div className="ph1 flex-auto" />
            <div className="fg3 mv0 tabular-nums f5">{displayNumber}</div>
          </div>
          <div className="nv2 fg3 f5">{formName || nbsp}</div>

          <div className="pv3 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImage(props.pokemon.id)}
              role="presentation"
              alt=""
              className="db img-crisp"
              width={96}
              height={96}
            />
          </div>

          <div className="pt2 flex justify-end">
            {props.pokemon.types.map((t, i) => (
              <MonsterType key={i} type={t} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-column">
        <StatsTable pokemon={props.pokemon} />
        <div className="flex justify-end">
          <Link href={`/offense?${params}`}>
            <a
              aria-label={`Offense for ${speciesName} (${formName})`}
              className="underline fg-link OutlineFocus"
            >
              Offense
            </a>
          </Link>
          <span aria-hidden="true" className="o-50">
            &nbsp;&bull;&nbsp;
          </span>
          <Link href={`/defense?${params}`}>
            <a
              aria-label={`Defense for ${speciesName} (${formName})`}
              className="underline fg-link OutlineFocus"
            >
              Defense
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
