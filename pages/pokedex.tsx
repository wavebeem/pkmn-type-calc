import matchSorter from "match-sorter";
import { useRouter } from "next/router";
import * as React from "react";
import Layout from "../components/Layout";
import Paginator from "../components/Paginator";
import Search from "../components/Search";
import Monster from "../components/Monster";
import { AllPokemon } from "../util/pkmn";
import { useQuery } from "../util/useQuery";
import { useSessionStorage } from "../util/useSessionStorage";

const PAGE_SIZE = 20;

interface DexProps {}

export default function ScreenPokedex({}: DexProps) {
  const router = useRouter();
  const query = useQuery("q") ?? "";
  const page = Number(useQuery("page") ?? "1") - 1;

  const [, setPokedexParams] = useSessionStorage("params.pokedex", "");

  const pkmn = React.useMemo(() => {
    const s = query.trim();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return AllPokemon.filter((p) => p.number === number);
    }
    return matchSorter(AllPokemon, s, { keys: ["name", "number"] });
  }, [query]);

  function createParams(newQuery: string, newPage: number): string {
    const params = new URLSearchParams();
    if (newQuery) {
      params.set("q", newQuery);
    }
    if (Number(newPage) > 0) {
      params.set("page", String(newPage + 1));
    }
    return "?" + params;
  }

  function update(newQuery: string, newPage: number) {
    const params = createParams(newQuery, newPage);
    router.replace({ search: params });
  }

  const params = createParams(query, page);
  React.useEffect(() => {
    setPokedexParams(params);
  }, [params, setPokedexParams]);

  return (
    <Layout>
      <main className="ph3 mt3 center content-narrow">
        <Search
          search={query}
          updateSearch={(newQuery) => {
            update(newQuery, 0);
          }}
        />
        <Paginator
          currentPage={page}
          urlForPage={(newPage) => {
            return createParams(query, newPage);
          }}
          pageSize={PAGE_SIZE}
          emptyState={<p className="fg4 f4 b tc m0">No Pokémon found</p>}
          items={pkmn}
          renderPage={(page) =>
            page.map((pokemon, index) => (
              <Monster key={pokemon.id} pokemon={pokemon} index={index} />
            ))
          }
        />
      </main>
    </Layout>
  );
}

ScreenPokedex.displayName = "ScreenPokedex";
