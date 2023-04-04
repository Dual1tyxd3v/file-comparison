import HeadStat from '../components/head-stat/head-stat';
import LinkBack from '../components/link-back/link-back';
import StatsResults from '../components/stats-results/stats-results';
import { AppRoute } from '../const';

function StatsScreen(): JSX.Element {
  return (
    <section className="stats bg">
      <div className="stats__wrapper wrapper">
        <HeadStat type='original' />
        <HeadStat type='added' />
        <div className="stats__content">
          <StatsResults />
          <div className="stats__controls">
            <LinkBack path={AppRoute.Main} toMain/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsScreen;
