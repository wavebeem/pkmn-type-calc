import React from "react";

import Offense from "./Offense";
import Defense from "./Defense";
import Dex from "./Dex";
import { TabContainer, TabItem } from "./Tab";
import { Type } from "./data";
import { AllPokemon } from "./pkmn";
import Footer from "./Footer";
import matchSorter from "match-sorter";

function App() {
  const [tab, changeTab] = React.useState(1);
  const [type0, updateType0] = React.useState(Type.NORMAL);
  const [type1, updateType1] = React.useState(Type.NORMAL);
  const [type2, updateType2] = React.useState(Type.NONE);
  const [search, updateSearch] = React.useState("");
  const [currentPage, updateCurrentPage] = React.useState(0);

  const pkmn = React.useMemo(() => {
    const s = search.trim();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return AllPokemon.filter(p => p.number === number);
    }
    return matchSorter(AllPokemon, s, { keys: ["name", "number"] });
  }, [search]);

  React.useEffect(() => {
    updateCurrentPage(0);
  }, [search]);

  return (
    <div className="sans-serif bg-near-white mid-gray min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f2 tc relative white bg-dark-red pokeball-header">
          <a href="#" className="link white dim">
            Pokémon Type Calculator
          </a>
        </h1>
        <TabContainer changeTab={changeTab} current={tab}>
          <TabItem name="offense" title="Offense">
            <Offense type0={type0} updateType0={updateType0} />
          </TabItem>
          <TabItem name="defense" title="Defense">
            <Defense
              type1={type1}
              type2={type2}
              updateType1={updateType1}
              updateType2={updateType2}
            />
          </TabItem>
          <TabItem name="pokedex" title="Pokédex">
            <Dex
              updateCurrentPage={updateCurrentPage}
              updateSearch={updateSearch}
              currentPage={currentPage}
              pkmn={pkmn}
              search={search}
              updateType1={updateType1}
              updateType2={updateType2}
              changeTab={changeTab}
            />
          </TabItem>
        </TabContainer>
      </div>
      <Footer />
    </div>
  );
}

App.displayName = "App";

export default App;
