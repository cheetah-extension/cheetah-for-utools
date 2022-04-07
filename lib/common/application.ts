import { getValue, setValue } from './';
import { platform } from './base';

export function getAllDefaultApp() {
  return (
    getValue('defaultApp') || {
      open: '',
      git_gui_open: '',
      terminal_open: '',
    }
  );
}

function openFolderAppPath() {
  if (platform.isWin) {
    return 'explorer.exe';
  }

  return 'open';
}

export function getDefaultApp(type: string = '') {
  const defaultAppConfig = getValue('defaultApp');
  const defaultApp = defaultAppConfig?.[type] ?? '';

  // if (condition) {
    
  // }

  // return value?.[type] ?? '';
}

export function setDefaultApp(type: string, appPath: string) {
  const defaultApp = getDefaultApp();
  // defaultApp[type] = appPath;
  setValue('defaultApp', defaultApp);
}

export default {
  getDefaultApp,
  setDefaultApp,
};
