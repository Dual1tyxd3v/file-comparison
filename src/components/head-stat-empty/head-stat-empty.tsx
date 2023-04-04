import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchFiles } from '../../store/api-actions';
import { FileWithPath } from '../../types/types';

function HeadStatEmpty(): JSX.Element {
  const dispatch = useAppDispatch();

  function changekHandler(e: ChangeEvent) {
    const input = e.target as HTMLInputElement;
    input.files?.length && dispatch(fetchFiles({
      file: input.files[0] as FileWithPath,
      type: 'added'
    }));
  }
  return (
    <div className="stats__head head head--empty">
      <label htmlFor="addedFile" className='button'>Загрузить еще коллекцию</label>
      <input type="file" name="addedFile" id="addedFile" onChange={changekHandler} />
    </div>
  );
}

export default HeadStatEmpty;
