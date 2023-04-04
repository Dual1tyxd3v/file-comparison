import { useAppSelector } from '../../hooks';

function Progress(): JSX.Element {
  const {max, value} = useAppSelector((state) => state.progressStatus);
  return (
    <section className="progress">
      <div className="progress__container">
        <label htmlFor="progress" className="progress__label">Прогресс - {value} из {max}</label>
        <progress id="progress" className="progress__progress" max={max} value={value}></progress>
      </div>
    </section>
  );
}

export default Progress;
