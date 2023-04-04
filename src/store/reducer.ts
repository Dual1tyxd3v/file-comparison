/* eslint-disable no-console */
import { createReducer } from '@reduxjs/toolkit';
import { Store } from '../types/types';
import { resetAdded, setAddedDir, setAddedErrors, setAddedHash, setAddedStat, setCompareErrors, setHash, setLoadingStatus, setOrigErrors, setOriginalDir, setOriginalStat, setProgressStatus } from './actions';

const initState: Store = {
  original: {
    stat: null,
    errors: null,
    hash: null,
    dir: null
  },
  added: {
    stat: null,
    errors: null,
    hash: null,
    dir: null
  },
  compare: {
    errors: null
  },
  progressStatus: {
    max: -1,
    value: -1
  },
  isLoading: false
};

export const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(setProgressStatus, (state, action) => {
      state.progressStatus = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setOriginalStat, (state, action) => {
      state.original.stat = action.payload;
    })
    .addCase(setAddedStat, (state, action) => {
      state.added.stat = action.payload;
    })
    .addCase(setOrigErrors, (state, action) => {
      state.original.errors = action.payload;
    })
    .addCase(setCompareErrors, (state, action) => {
      state.compare.errors = action.payload;
    })
    .addCase(setAddedErrors, (state, action) => {
      state.added.errors = action.payload;
    })
    .addCase(setHash, (state, action) => {
      state.original.hash = action.payload;
    })
    .addCase(setAddedHash, (state, action) => {
      state.added.hash = action.payload;
    })
    .addCase(setOriginalDir, (state,action) => {
      state.original.dir = action.payload;
    })
    .addCase(setAddedDir, (state,action) => {
      state.added.dir = action.payload;
    })
    .addCase(resetAdded, (state) => {
      state.added.errors = null;
      state.added.hash = null;
      state.added.stat = null;
    });
});
