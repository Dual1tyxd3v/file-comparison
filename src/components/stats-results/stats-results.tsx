/* eslint-disable no-console */
import { useAppSelector } from '../../hooks';
import AssignButton from '../assign-button/assign-button';
import StatsErrors from '../stats-errors/stats-errors';

function StatsResults(): JSX.Element | null {
  const added = useAppSelector((state) => state.added.hash);

  if (!added) { return null; }

  return (
    <div className="stats__result">
      <StatsErrors />
      <AssignButton />
    </div>
  );
}

export default StatsResults;
