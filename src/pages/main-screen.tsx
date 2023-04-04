import { ChangeEvent, DragEvent, useState } from 'react';
import Progress from '../components/progress/progress';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchFiles } from '../store/api-actions';
import { FileWithPath } from '../types/types';

function MainScreen(): JSX.Element {
  const [classN, setClassN] = useState('');
  const { isLoading } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  function changeHandler(e: ChangeEvent) {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      dispatch(fetchFiles({
        file: input.files[0] as FileWithPath,
        type: 'orig'
      }));
    }
  }

  function dropHandler(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    dispatch(fetchFiles({
      file: file as FileWithPath,
      type: 'orig'
    }));
  }

  function dragHandler(dragged: boolean, e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setClassN(dragged ? 'main__label--hover' : '');
  }

  return (
    <>
      {
        isLoading ? <Progress /> : null
      }
      <section className="main">
        <label
          htmlFor="file"
          className={`main__label ${classN}`}
          onDrop={dropHandler}
          onDragEnter={(e) => dragHandler(true, e)}
          onDragOver={(e) => dragHandler(true, e)}
          onDragLeave={(e) => dragHandler(false, e)}
        >Выберите или перетащите Hash файл или любой файл из коллекции
          <svg className="main__icon" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="File / Folder_Upload">
              <path id="Vector" d="M12 16V10M12 10L9 12M12 10L15 12M3 6V16.8C3 17.9201 3 18.4798 3.21799 18.9076C3.40973 19.2839 3.71547 19.5905 4.0918 19.7822C4.5192 20 5.07899 20 6.19691 20H17.8031C18.921 20 19.48 20 19.9074 19.7822C20.2837 19.5905 20.5905 19.2841 20.7822 18.9078C21.0002 18.48 21.0002 17.9199 21.0002 16.7998L21.0002 9.19978C21.0002 8.07967 21.0002 7.51962 20.7822 7.0918C20.5905 6.71547 20.2839 6.40973 19.9076 6.21799C19.4798 6 18.9201 6 17.8 6H12M3 6H12M3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40886 4 9.63904 4.05526C9.84311 4.10425 10.0379 4.18526 10.2168 4.29492C10.4186 4.41857 10.5918 4.59182 10.9375 4.9375L12 6" stroke="#8e9fab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </label>
        <input type="file" className="main__input" name="file" id="file" onChange={changeHandler} draggable />
      </section>
    </>
  );
}

export default MainScreen;
