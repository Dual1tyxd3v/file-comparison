import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api, ApiFetchRequest, AppDispatch, CompareCollections, Errors, Hash, State } from '../types/types';
import { getType } from '../utils';
import { redirectToStats, setAddedDir, setAddedErrors, setAddedHash, setAddedStat, setCompareErrors, setHash, setLoadingStatus, setOrigErrors, setOriginalDir, setOriginalStat, setProgressStatus } from './actions';

const path = window.require('path');

export const compareCollections = createAsyncThunk<void, CompareCollections, {
  dispatch: AppDispatch, state: State, extra: Api
}>(
  'compareCollections',
  async ({hash, addedHash}, {dispatch, extra: api}) => {
    const errors: Errors = {
      count: 0,
      data: []
    };
    const resultHash: Hash = {};
    for (const k in addedHash) {
      if (hash[k]) {
        const origExt = getType(path.extname(hash[k]));
        const addedExt = getType(path.extname(addedHash[k]));
        errors.data.push({
          original: {
            hash: k,
            ext: origExt,
            name: hash[k],
            src: await api(origExt === 'image' ? 'toBase64' : 'toMp3', hash[k]),
          },
          added: {
            hash: k,
            ext: addedExt,
            name: addedHash[k],
            src: await api(addedExt === 'image' ? 'toBase64' : 'toMp3', addedHash[k]),
          }
        });
        errors.count++;
      } else {
        resultHash[k] = addedHash[k];
      }
    }
    dispatch(setCompareErrors(errors));
    dispatch(setAddedHash(resultHash));
  }
);

export const fetchFiles = createAsyncThunk<void, ApiFetchRequest, {
  dispatch: AppDispatch, state: State, extra: Api
}>(
  'fetchFiles',
  async ({ file, type }, { dispatch, extra: api }) => {
    dispatch(setLoadingStatus(true));
    const files = await api('sendFile', file.path.replace(file.name, ''));
    dispatch(setProgressStatus({ max: files.length, value: 0 }));
    const result: Hash = {};
    const errors: Errors = {
      count: 0,
      data: []
    };
    const startTime = new Date();
    const dir = file.path.replace(file.name, '');
    for (let i = 0; i < files.length; i++) {
      const tempdata = await api('hash', `${dir}${files[i]}`);
      const data = JSON.parse(tempdata as string);

      if (!result[data.hash]) {
        result[data.hash] = data.name ;
      } else {
        errors.count++;
        const ext = getType(data.ext);
        errors.data.push({
          original: {
            name: result[data.hash],
            hash: data.hash,
            ext: ext,
            src: await api(ext === 'image' ? 'toBase64' : 'toMp3', result[data.hash]) as string
          },
          added: {
            name: data.name,
            hash: data.hash,
            ext: ext,
            src: await api(ext === 'image' ? 'toBase64' : 'toMp3', data.name) as string
          }
        });
      }
      dispatch(setProgressStatus({ max: files.length, value: i + 1 }));
    }
    const endTime = new Date();
    dispatch(setLoadingStatus(false));
    const setStat = type === 'orig' ? setOriginalStat : setAddedStat;
    const setErrors = type === 'orig' ? setOrigErrors : setAddedErrors;
    const setDir = type === 'orig' ? setOriginalDir : setAddedDir;
    dispatch(setDir(dir));
    dispatch(setStat({
      message: 'Хэширование файлов успешно завершено за',
      duration: endTime.getTime() - startTime.getTime(),
      filesCount: files.length,
      filesInHash: files.length - errors.count
    }));
    dispatch(setErrors({
      count: errors.count,
      data: errors.data
    }));
    type === 'orig'
      ? dispatch(setHash(result))
      : dispatch(setAddedHash(result));
    dispatch(redirectToStats());
  }
);
