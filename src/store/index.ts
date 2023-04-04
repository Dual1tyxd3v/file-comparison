import { configureStore } from '@reduxjs/toolkit';
import { redirect } from '../middleware/redirect';
import { reducer } from './reducer';

const { ipcRenderer } = window.require('electron');

const api = async (channel: string, path: string) => {
  const resp = await ipcRenderer.invoke(channel, path);
  return resp;
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});
