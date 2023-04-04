import { createAction } from '@reduxjs/toolkit';
import { Errors, Hash, ProgressStatus, Stat } from '../types/types';

export const setProgressStatus = createAction('setProgressStatus', (value: ProgressStatus) => ({payload: value}));
export const setLoadingStatus = createAction('setLoadingStatus', (value: boolean) => ({payload: value}));
export const setOriginalStat = createAction('setOriginalStat', (value: Stat) => ({payload: value}));
export const setAddedStat = createAction('setAddedStat', (value: Stat) => ({payload: value}));
export const setOrigErrors = createAction('setOrigErrors', (value: Errors) => ({payload: value}));
export const setAddedErrors = createAction('setAddedErrors', (value: Errors) => ({payload: value}));
export const setHash = createAction('setHash', (value: Hash) => ({payload: value}));
export const setAddedHash = createAction('setAddedHash', (value: Hash) => ({payload: value}));
export const setCompareErrors = createAction('setCompareErrors', (value: Errors) => ({payload: value}));
export const setOriginalDir = createAction('setOriginalDir', (value: string) => ({payload: value}));
export const setAddedDir = createAction('setAddedDir', (value: string) => ({payload: value}));
export const resetAdded = createAction('resetAdded');
export const redirectToStats = createAction('redirectToStats');
