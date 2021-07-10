import { Fragment, FunctionComponent, h } from "preact";
import { CoverageType, Effectiveness, matchupFor, Type } from "./data";
import { PercentBar } from "./PercentBar";

interface DexCoverageProps {
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
}

const DexCoverage: FunctionComponent<DexCoverageProps> = ({
  coverageTypes,
  types,
  isLoading,
}) => {
  const count = coverageTypes.filter(({ type1, type2 }) => {
    const matchups = types.map((t) => matchupFor(type1, type2, t));
    return matchups.some((effectiveness) => {
      return effectiveness > Effectiveness.REGULAR;
    });
  }).length;
  const total = coverageTypes.length;
  const ratio = count / total || 0;
  const percent = (ratio * 100).toFixed(0);
  return (
    <div className="pt1 tabular-nums flex flex-column lh-copy">
      <PercentBar value={count} max={total} />
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex-auto tc">Loading...</div>
        ) : (
          <Fragment>
            <div className="tl mr2 w3">{percent}%</div>
            <div className="flex-auto tr">
              {count} / {total} forms
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

DexCoverage.displayName = "DexCoverage";

export default DexCoverage;
