import { useRouter } from "next/router";
import * as React from "react";
import Layout from "../../components/Layout";
import * as Matchups from "../../components/Matchups";
import MultiTypeSelector from "../../components/MultiTypeSelector";
import { buildParams } from "../../util/buildParams";
import { CoverageType, Type, typesFromString } from "../../util/data";
import { useQuery } from "../../util/useQuery";
import { useStorage } from "../../util/useStorage";

interface OffenseProps {}

export default function ScreenOffense({}: OffenseProps) {
  const router = useRouter();
  const [, updateStorage] = useStorage();
  // console.log(useQuery("types"));
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
    return buildParams((params) => {
      if (types.length > 0) {
        params.set("types", types.join(" "));
      }
    });
  }

  const updateOffenseTypes = (types: Type[]) => {
    router.replace({ search: createParams(types) }, undefined, {
      scroll: false,
    });
  };

  const params = createParams(offenseTypes);
  React.useEffect(() => {
    updateStorage({ paramsOffense: params });
  }, [params, updateStorage]);

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
