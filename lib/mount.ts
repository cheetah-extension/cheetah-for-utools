import { chooseFile, chooseFolder, getValue, setValue, notice } from './common';
import { platform } from './common/base';
import { getAllDefaultApp, setDefaultApp } from './common/application';
import { clearCache } from './common/core';

Object.assign(window, {
  platform,
  chooseFile,
  chooseFolder,
  notice,
  getValue,
  setValue,
  getAllDefaultApp,
  setDefaultApp,
  clearCache,
});
