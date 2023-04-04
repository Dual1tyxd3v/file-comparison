import { Extensions } from './types/types';

export enum AppRoute {
  Main = '/',
  Stats = '/stats',
  Results = '/results'
}

export const filesExt: Extensions = {
  image: '.jpg, .jpeg, .webp, .png, .svg',
  music: '.mp3'
};
