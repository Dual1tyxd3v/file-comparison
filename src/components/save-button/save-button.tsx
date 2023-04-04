import { useState } from 'react';
import { Hash } from '../../types/types';
import { saveHash } from '../../utils';

type SaveButtonProps = {
  dir: string;
  hash: Hash;
}

function SaveButton({dir, hash}: SaveButtonProps): JSX.Element {
  const [btnClass, setBtnClass] = useState('');

  async function saveBtnHandler() {
    const resp = await saveHash(JSON.stringify({
      hash,
      path: dir
    }));
    setBtnClass(resp);
  }

  return (
    <button className={`button ${btnClass}`} type='button' onClick={saveBtnHandler} disabled={!!btnClass.length}>Сохранить хэш</button>
  );
}

export default SaveButton;
