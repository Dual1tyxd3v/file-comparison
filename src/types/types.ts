import { store } from '../store';

export type Store = {
  original: Collection;
  added: Collection;
  compare: {
    errors: Errors | null
  },
  progressStatus: ProgressStatus;
  isLoading: boolean;
}

export type Collection = {
  stat: Stat | null;
  errors: Errors | null;
  hash: Hash | null;
  dir: string | null;
}

export type CompareCollections = {
  hash: Hash;
  addedHash: Hash;
}

export type ProgressStatus = {
  max: number;
  value: number;
}

export interface FileWithPath extends File {
  path: string;
}

export type ApiFetchRequest = {
  file: FileWithPath;
  type: string;
}

export type Errors = {
  count: number;
  data: ErrorPair[];
}

export type ApiFetchFiles = {
  channel: string;
  file: FileWithPath;
}

export type Error = {
  name: string;
  hash: string;
  src: string;
  ext: string;
}

export type Api = (channel: string, data: string) => Promise<string>;

export type Extensions = {
  image: string;
  music: string;
}

export type ErrorPair = {
  orig: Error;
  added: Error;
}

export type Stat = {
  message: string;
  duration: number;
  filesCount: number;
  filesInHash: number;
}

export type Hash = {
  [key: string]: string
}

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;

const test = {
  some: 'ab',
  another: 'kick'
};

// eslint-disable-next-line no-console
console.log(Object.keys(test));
