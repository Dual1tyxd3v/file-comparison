/* eslint-disable no-console */
import { filesExt } from './const';
import { Extensions, Hash } from './types/types';

const { ipcRenderer } = window.require('electron');

export const getReadableTime = (time: number | null) => {
  if (!time) { return '---'; }
  const h = Math.floor(time / 1000 / 60 / 60);
  const m = Math.floor((time / 1000 / 60) - h * 60);
  const s = Math.floor((time / 1000) - h * 60 * 60 - m * 60);
  return `${h} часов, ${m} минут, ${s} секунд`;
};

export const getType = (ext: string): string => {
  let result = '';
  for (const k in filesExt) {
    if ((filesExt[k as keyof Extensions] as string).includes(ext.toLowerCase())) { result = k.toString(); }
  }
  return result;
};

export const getShortName = (src: string): string => src.slice(src.lastIndexOf('\\') + 1);

export const saveHash = async (data: string) => {
  const result = await ipcRenderer.invoke('saveHash', data).then((res) => res as string);
  return result;
};

export const assignHash = async (orig: Hash, added: Hash, oldDir: string, dir: string) => {
  const replacedHash = JSON.parse(JSON.stringify(added));
  for (const k in replacedHash) {
    replacedHash[k] = replacedHash[k].replace(oldDir, dir);
  }

  const newFiles = Object.values(replacedHash);
  const oldFiles = Object.values(added);
  await ipcRenderer.invoke('replaceFiles', JSON.stringify({
    old: oldFiles, new: newFiles
  }));

  const resp = await saveHash(JSON.stringify({
    hash: { ...orig, ...replacedHash },
    path: dir
  }));
  return resp;
};
