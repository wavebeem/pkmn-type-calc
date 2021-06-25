import * as React from "react";
import { useRouter } from "next/router";
import { CoverageType, Type, typesFromString } from "../../util/data";
import * as Matchups from "../../components/Matchups";
import MultiTypeSelector from "../../components/MultiTypeSelector";
import Layout from "../../components/Layout";
import { useSessionStorage } from "../../util/useSessionStorage";
import { useQuery } from "../../util/useQuery";

interface OffenseProps {}

export default function ScreenOffense({}: OffenseProps) {
  const router = useRouter();
  const [, setOffenseParams] = useSessionStorage("params.offense", "");
  const types = useQuery("types") ?? "";
  const offenseTypes = typesFromString(types);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [isLoadingCoverageTypes, setIsLoadingCoverageTypes] = React.useState(
    true
  );

  React.useEffect(() => {
    async function load() {
      const { fallbackCoverageTypes } = await import("../../util/pkmn");
      setCoverageTypes(fallbackCoverageTypes);
      setIsLoadingCoverageTypes(false);
    }
    load();
  }, []);

  function createParams(types: Type[]): string {
    const params = new URLSearchParams();
    if (types.length > 0) {
      params.set("types", types.join(" "));
    }
    return "?" + params;
  }

  const updateOffenseTypes = (types: Type[]) => {
    router.replace({ search: createParams(types) });
  };

  const params = createParams(offenseTypes);
  React.useEffect(() => {
    setOffenseParams(params);
  }, [params, setOffenseParams]);

  const classH2 = "tc f5 mv3";
  return (
    <Layout>
      <main className="ph3 pt1 pb4 content-wide center">
        <div className="dib w-50-ns w-100 v-top">
          <h2 className={classH2}>Choose Types</h2>
          <MultiTypeSelector
            value={offenseTypes}
            onChange={updateOffenseTypes}
          />
        </div>
        <div className="dib w-50-ns w-100 v-top pl3-ns">
          <hr className="dn-ns subtle-hr mv4" />
          <Matchups.Offense
            coverageTypes={coverageTypes}
            isLoadingCoverageTypes={isLoadingCoverageTypes}
            types={offenseTypes}
          />
        </div>
      </main>
    </Layout>
  );
}

ScreenOffense.displayName = "ScreenOffense";
