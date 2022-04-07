import { chooseFile, getValue, setValue } from './common';
import { platform } from './common/base';
import { getDefaultApp, setDefaultApp } from './common/application';

Object.assign(window, {
  platform,
  chooseFile,
  getValue,
  setValue,
  getDefaultApp,
  setDefaultApp,
});
