import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../browser-history';
import { AppRoute } from '../const';
import { reducer } from '../store/reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === 'redirectToStats') {
    browserHistory.push(AppRoute.Stats);
  }

  return next(action);
};
