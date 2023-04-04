import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { assignHash } from '../../utils';
import { Hash } from '../../types/types';

function AssignButton(): JSX.Element {
  const {original: {hash: origHash, dir}, added: {hash: addedHash, dir: oldDir}} = useAppSelector((state) => state);
  const [btnClass, setBtnClass] = useState('');

  async function assignHandler() {
    const resp = await assignHash(origHash as Hash, addedHash as Hash, oldDir as string, dir as string);
    setBtnClass(resp);
  }

  return(
    <button type="button" className={`button ${btnClass}`} onClick={assignHandler} disabled={!!btnClass.length}>Объединить в 1 Hash</button>
  );
}

export default AssignButton;
