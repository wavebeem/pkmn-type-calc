import * as React from "react";
import { Type, typesFromString } from "../util/data";
import * as Matchups from "../components/Matchups";
import TypeSelector from "../components/TypeSelector";
import Layout from "../components/Layout";

interface DefenseProps {
  setDefenseParams: (params: string) => void;
}

export default function ScreenDefense(props: DefenseProps) {
  // const search = useSearch();
  // const history = useHistory();

  const type1 = Type.NORMAL;
  const type2 = Type.NONE;
  // const [type1 = Type.NORMAL, type2 = Type.NONE] = typesFromString(
  //   search.get("types") || ""
  // );

  function createParams(types: Type[]): string {
    return "?";
    // const params = new URLSearchParams();
    // if (types.length >= 0) {
    //   if (types[1] === Type.NONE) {
    //     params.set("types", types[0]);
    //   } else {
    //     params.set("types", types.join(" "));
    //   }
    // }
    // return "?" + params;
  }

  function updateTypes(types: Type[]) {
    // history.replace({ search: createParams(types) });
  }

  function updateType1(t: Type) {
    updateTypes([t, type2]);
  }

  function updateType2(t: Type) {
    updateTypes([type1, t]);
  }

  // const params = createParams([type1, type2]);
  // React.useEffect(() => {
  //   props.setDefenseParams(params);
  // }, [params]);

  const classH2 = "tc f5 mv3";
  return (
    <Layout>
      <main className="ph3 pt1 pb4 content-wide center">
        <div className="dib w-50-ns w-100 v-top">
          <h2 className={classH2}>Choose Primary Type</h2>
          <TypeSelector
            value={type1}
            onChange={updateType1}
            disabledTypes={[]}
            includeNone={false}
          />
          <h2 className={`${classH2} mt4`}>Choose Secondary Type</h2>
          <TypeSelector
            value={type2}
            onChange={updateType2}
            disabledTypes={[type1]}
            includeNone={true}
          />
        </div>
        <div className="dib w-50-ns w-100 v-top pl3-ns">
          <hr className="dn-ns subtle-hr mv4" />
          <Matchups.Defense type1={type1} type2={type2} />
        </div>
      </main>
    </Layout>
  );
}

ScreenDefense.displayName = "ScreenDefense";