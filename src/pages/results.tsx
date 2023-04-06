/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResultsCard from '../components/results-card/results-card';
import { useAppSelector } from '../hooks';
import { Collection, Errors, State } from '../types/types';
import ResultsControls from '../components/results-controls/results-controls';

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
                const key1 = `${i}__orig${errorPair.original.hash}`;
                const key2 = `${i}s__added${errorPair.added.hash}`;
                const key3 = `${i}fr`;
                return (
                  <React.Fragment key={key3}>
                    <ResultsCard key={key1} error={errorPair.original} isPlaying={activeAudio === errorPair.original.name} setActive={setActive}/>
                    <ResultsCard key={key2} error={errorPair.added} isPlaying={activeAudio === errorPair.added.name} setActive={setActive} toDelete/>
                  </React.Fragment>
                );
              })
            }
          </div>
        </div>
        <ResultsControls type={type as string} errors={errors as Errors} />
      </div>
    </section>
  );
}

export default Results;
