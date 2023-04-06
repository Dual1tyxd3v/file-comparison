import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';

function StatsErrors(): JSX.Element | null {
  const errors = useAppSelector((state) => state.compare.errors);
  if (!errors) { return null; }
  return (
    <>
      <p className="stats__title">Найдено совпадений - <span className="stats__title--black">{errors.count}</span></p>
      {
        errors.count > 0 && <Link to={`${AppRoute.Results}/compare`} className="button">Посмотреть совпадения</Link>
      }
    </>
  );
}

export default StatsErrors;
