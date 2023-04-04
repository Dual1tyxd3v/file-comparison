/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { Hash, Stat } from '../../types/types';
import { getReadableTime } from '../../utils';
import HeadStatEmpty from '../head-stat-empty/head-stat-empty';
import Progress from '../progress/progress';
import { State, Collection } from '../../types/types';
import CompareButton from '../compare-button/compare-button';
import SaveButton from '../save-button/save-button';

type HeadStatProps = {
  type: string;
}

function HeadStat({ type }: HeadStatProps): JSX.Element {
  const { stat, hash, errors, dir } = useAppSelector((state) => state[type as keyof State] as Collection);
  const isLoading = useAppSelector((state) => state.isLoading);

  if (!stat) { return <HeadStatEmpty />; }

  const { message, duration, filesCount, filesInHash } = stat as Stat;

  const time = getReadableTime(duration as number);

  return (
    <>
      {
        isLoading ? <Progress /> : null
      }
      <div className="stats__head head">
        <div className="head__left">
          <p className="head__text head__text--message">{message} <span className='head__text--variables'>{time}</span></p>
          <p className="head__text">Ошибок - <span className='head__text--variables'>{errors ? errors.count : 0}</span></p>
        </div>
        <div className="head__middle">
          <p className="head__text">Файлов всего <span className='head__text--variables'>{filesCount}</span></p>
          <p className="head__text">Файлов в хэше <span className='head__text--variables'>{filesInHash}</span></p>
        </div>
        <div className="head__right">
          {
            type === 'original'
              ? <SaveButton dir={dir as string} hash={hash as Hash} /> : null
          }
          <Link to={`${AppRoute.Results}/${type}`} className={`button ${errors?.count ? '' : 'hide'}`}>Посмотреть ошибки</Link>
          {
            type === 'added'
              ? <CompareButton addedHash={hash as Hash} /> : null
          }
        </div>
      </div>
    </>
  );
}

export default HeadStat;
