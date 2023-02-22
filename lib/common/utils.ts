import { ErrorCodeMessage } from 'cheetah-core';

export function chooseFile() {
  return utools.showOpenDialog({
    filters: [{ name: '选择应用', extensions: ['app', 'exe', 'lnk'] }],
    properties: ['openFile'],
  });
}

export function chooseFolder() {
  return utools.showOpenDialog({
    properties: ['openDirectory'],
  });
}

export function getValue(key: string) {
  let data = utools.dbStorage.getItem(key) ?? null;

  if (data) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      data = null;
    }
  }

  return data;
}

export function setValue(key: string, value: any, rev?: string) {
  let data = value;
  if (typeof data !== 'string') {
    data = JSON.stringify(value);
  }

  return utools.dbStorage.setItem(key, data);
}

export function notice(message: string) {
  utools.showNotification(message);
}

export function copy(text: string) {
  utools.copyText(text);
}

export function errorHandle(error: any) {
  const errorCode: number = error.message;
  notice(ErrorCodeMessage[errorCode]);
  utools.hideMainWindow();
}
