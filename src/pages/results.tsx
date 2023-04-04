/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkBack from '../components/link-back/link-back';
import ResultsCard from '../components/results-card/results-card';
import { AppRoute } from '../const';
import { useAppSelector } from '../hooks';
import { Collection, State } from '../types/types';

function Results(): JSX.Element {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const { type } = useParams();
  const {errors} = useAppSelector((state) => state[type as keyof State] as Collection);

  const setActive = useCallback((name: string) => {
    setActiveAudio(name);
  },[]);
  return (
    <section className="results bg">
      <div className="wrapper results__wrapper">
        <div className="results__content">
          <h4 className="results__title">Найдено <span className="results__title--accent">{errors?.count}</span> совпадений</h4>
          <div className="results__container">
            {
              errors && errors.data.map((errorPair, i) => {
                const key1 = `${i}__${errorPair.orig.hash}`;
                const key2 = `${i}s__${errorPair.added.hash}`;
                const key3 = `${i}fr`;
                return (
                  <React.Fragment key={key3}>
                    <ResultsCard key={key1} error={errorPair.orig} isPlaying={activeAudio === errorPair.orig.name} setActive={setActive}/>
                    <ResultsCard key={key2} error={errorPair.added} isPlaying={activeAudio === errorPair.added.name} setActive={setActive} toDelete/>
                  </React.Fragment>
                );
              })
            }
          </div>
        </div>
        <div className="results__controls">
          <button className="button" type="button">Удалить похожие</button>
          <LinkBack path={AppRoute.Stats} />
        </div>
      </div>
    </section>
  );
}

export default Results;
