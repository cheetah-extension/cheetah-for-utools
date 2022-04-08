import { chooseFile, getValue, setValue } from './common';
import { platform } from './common/base';
import { getAllDefaultApp, setDefaultApp } from './common/application';

Object.assign(window, {
  platform,
  chooseFile,
  getValue,
  setValue,
  getAllDefaultApp,
  setDefaultApp,
});
