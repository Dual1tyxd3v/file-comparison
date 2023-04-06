/* eslint-disable no-console */
import { useEffect, useRef } from 'react';
import { Error } from '../../types/types';
// import { getShortName } from '../../utils';

type ResultsCardProps = {
  error: Error;
  toDelete?: boolean;
  isPlaying: boolean;
  setActive: (name: string) => void;
}

function ResultsCard({ error, toDelete, isPlaying, setActive}: ResultsCardProps): JSX.Element {
  const {name, hash, src, ext} = error;
  const audio = useRef<null | HTMLAudioElement>(null);

  useEffect(() => {
    if (!audio.current) { return; }

    if (!isPlaying) {
      audio.current.pause();
    }
  }, [isPlaying]);

  function playHandler() {
    setActive(name);
  }

  return (
    <div className={`card ${toDelete ? 'card--red' : ''}`}>
      {
        ext === 'image'
          ? <img src={`data:image/png;base64,${src}`} alt="Card" className="card__img" />
          : <audio src={src} controls ref={audio} onPlay={playHandler}></audio>
      }
      <button className="card__deleteBtn">Удалить</button>
      <p className="card__text">{name}</p>
      <p className="card__text">{hash}</p>
    </div>
  );
}

export default ResultsCard;
