import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetAdded } from '../../store/actions';

type LinkBackProps = {
  path: AppRoute;
  toMain?: boolean;
}

function LinkBack({path, toMain}: LinkBackProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function clickHandler(e: MouseEvent) {
    if (!toMain) {return;}
    e.preventDefault();
    dispatch(resetAdded());
    navigate(AppRoute.Main);
  }
  return (
    <Link to={path} className="link" onClick={clickHandler}>
      <svg width="80px" height="80px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="stats__icon--back" preserveAspectRatio="xMidYMid meet"><circle cx="32" cy="32" r="30" fill="#517690"></circle><path fill="#ffffff" d="M30.3 16L15 32l15.3 16V37.4H49V27.1H30.3z"></path></svg>
      Назад
    </Link>
  );
}

export default LinkBack;
