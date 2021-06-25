import * as React from "react";
import { Type, typesFromString } from "../util/data";
import * as Matchups from "../components/Matchups";
import TypeSelector from "../components/TypeSelector";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useQuery } from "../util/useQuery";
import { useStorage } from "../util/useStorage";
import { buildParams } from "../util/buildParams";

interface DefenseProps {}

export default function Defense({}: DefenseProps) {
  const router = useRouter();
  const types = useQuery("types") ?? "";
  const [, updateStorage] = useStorage();

  const [type1 = Type.NORMAL, type2 = Type.NONE] = typesFromString(types);

  function createParams(types: Type[]): string {
    return buildParams((params) => {
      if (types.length >= 0) {
        if (types[1] === Type.NONE) {
          params.set("types", types[0]);
        } else {
          params.set("types", types.join(" "));
        }
      }
    });
  }

  function updateTypes(types: Type[]) {
    router.replace({ search: createParams(types) }, undefined, {
      scroll: false,
    });
  }

  function updateType1(t: Type) {
    updateTypes([t, type2]);
  }

  function updateType2(t: Type) {
    updateTypes([type1, t]);
  }

  const params = createParams([type1, type2]);
  React.useEffect(() => {
    updateStorage({ paramsDefense: params });
  }, [params, updateStorage]);

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
