import { useAppDispatch, useAppSelector } from '../../hooks';
import { compareCollections } from '../../store/api-actions';
import { Hash } from '../../types/types';

type CompareButtonProps = {
  addedHash: Hash;
}

function CompareButton({addedHash}: CompareButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const hash = useAppSelector((state) => state.original.hash);

  function compareHandler() {
    dispatch(compareCollections({hash: hash as Hash, addedHash}));
  }
  return(
    <button className="button" type='button' onClick={compareHandler}>Сравнить</button>
  );
}

export default CompareButton;
