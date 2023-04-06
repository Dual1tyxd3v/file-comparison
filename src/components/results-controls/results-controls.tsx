import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setAddedErrors, setCompareErrors, setOrigErrors } from '../../store/actions';
import { Errors } from '../../types/types';
import { deleteFiles } from '../../utils';
import LinkBack from '../link-back/link-back';

type ResultsControlsProps = {
  errors: Errors;
  type: string;
}

function ResultsControls({ type, errors }: ResultsControlsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function deleteHandler(collection = 'added') {
    const resp = await deleteFiles(collection, errors.data);
    if (!resp) { return; }

    switch(type) {
      case 'compare':
        dispatch(setCompareErrors(null));
        break;
      case 'original':
        dispatch(setOrigErrors(null));
        break;
      case 'added':
        dispatch(setAddedErrors(null));
        break;
    }
    navigate(AppRoute.Stats);
  }

  return (
    <div className="results__controls">
      <button className="button" type="button" onClick={() => deleteHandler('original')}>Удалить оригиналы</button>
      <button className="button" type="button" onClick={() => deleteHandler()}>Удалить добавленные</button>
      <LinkBack path={AppRoute.Stats} />
    </div>
  );
}

export default ResultsControls;
