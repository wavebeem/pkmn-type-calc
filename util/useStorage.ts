import { useCallback, useEffect, useReducer } from "react";
import { CoverageType } from "./data";
import { useForceRender } from "./useForceRender";

interface State {
  paramsOffense: string;
  paramsDefense: string;
  paramsPokedex: string;
  coverageTypes: CoverageType[];
}

// Faster and easier to keep this in memory than persist to sessionStorage, plus
// we don't have storage limits either
let globalState: State = {
  paramsOffense: "",
  paramsDefense: "",
  paramsPokedex: "",
  coverageTypes: [],
};

type UseStorage = [State, (diff: Partial<State>) => void];

export function useStorage(): UseStorage {
  const forceRender = useForceRender();

  const updateStorage = useCallback(
    (diff: Partial<State>): void => {
      globalState = { ...globalState, ...diff };
      forceRender();
    },
    [forceRender]
  );

  return [globalState, updateStorage];
}
