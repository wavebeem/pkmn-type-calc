import * as React from "react";
import { useRouter } from "next/router";
import { CoverageType, Type, typesFromString } from "../../util/data";
import * as Matchups from "../../components/Matchups";
import MultiTypeSelector from "../../components/MultiTypeSelector";
import Layout from "../../components/Layout";

interface OffenseProps {
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: CoverageType[]) => void;
  setOffenseParams: (params: string) => void;
}

export default function ScreenOffense({
  coverageTypes,
  setCoverageTypes,
  setOffenseParams,
}: OffenseProps) {
  const router = useRouter();
  console.log(router);
  console.log(router.query);
  // const search = useSearch();
  // const history = useHistory();
  // const offenseTypes = typesFromString(router.query.types || "");
  const offenseTypes = ["fire", "flying"] as Type[];

  // function createParams(types: Type[]): string {
  //   const params = new URLSearchParams();
  //   if (types.length > 0) {
  //     params.set("types", types.join(" "));
  //   }
  //   return "?" + params;
  // }

  const updateOffenseTypes = (types: Type[]) => {
    // history.replace({ search: createParams(types) });
  };

  // const params = createParams(offenseTypes);
  // React.useEffect(() => {
  //   setOffenseParams(params);
  // }, [params]);

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
            setCoverageTypes={setCoverageTypes}
            types={offenseTypes}
          />
        </div>
      </main>
    </Layout>
  );
}

ScreenOffense.displayName = "ScreenOffense";
