/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import AssignButton from '../assign-button/assign-button';

function StatsResults(): JSX.Element | null {
  const errors = useAppSelector((state) => state.compare.errors);

  if (!errors) { return null; }

  return (
    <div className="stats__result">
      <p className="stats__title">Найдено совпадений - <span className="stats__title--black">{errors.count}</span></p>
      <Link to={`${AppRoute.Results}/compare`} className="button">Посмотреть совпадения</Link>
      <AssignButton />
    </div>
  );
}

export default StatsResults;
