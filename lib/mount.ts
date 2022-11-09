import {
  chooseFile,
  chooseFolder,
  getValue,
  setValue,
  notice,
  getAllDefaultApp,
  setDefaultApp,
  platform,
  onClearCache
} from './common';

Object.assign(window, {
  platform,
  chooseFile,
  chooseFolder,
  notice,
  getValue,
  setValue,
  getAllDefaultApp,
  setDefaultApp,
  onClearCache,
});
