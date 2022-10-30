import path from 'path';
import { getValue, setValue, notice, errorHandle } from './utils';
import {
  HOME_PATH,
  Project,
  ResultItem,
  init,
  PlatformType,
  clearCache,
} from 'cheetah-core';
import { platform } from './constant';
import { query as linkQuery } from 'windows-shortcuts';

// 缓存路径
const cachePath = path.join(
  HOME_PATH,
  '.utools',
  'fmcat',
  'cheetah',
  'config.json'
);

export function getAllDefaultApp() {
  return (
    getValue('defaultApp') || {
      open: '',
      git_gui_open: '',
      terminal_open: '',
    }
  );
}

/**
 * @description: 快捷方式解析，暂时用不上
 * @param {string} path
 * @return {*}
 */
export function getAppRealPath(path: string): Promise<string> {
  return new Promise<string>((resolve) => {
    if (platform.isMac && !platform.isLinux && !path.endsWith('.lnk')) {
      resolve(path);
    }
    if (platform.isWin) {
      linkQuery(path, (error, details) => {
        if (error || !details) {
          utools.showNotification('获取应用路径失败');
          resolve('');
          return;
        }
        resolve(details?.target ?? '');
      });
    }
  });
}

/**
 * @description: 设置默认应用
 * @param {string} type 要设置的类型
 * @param {string} appPath 要设置的应用路径
 * @return {*}
 */
export function setDefaultApp(type: string, appPath: string): void {
  const defaultApp = getAllDefaultApp();
  defaultApp[type] = appPath;
  setValue('defaultApp', defaultApp);
}

export function initCore() {
  const workspaces = getValue('workspaces') || [];

  let platformType: PlatformType = PlatformType.MAC;
  if (utools.isWindows()) {
    platformType = PlatformType.WINDOWS;
  }
  if (utools.isLinux()) {
    platformType = PlatformType.LINUX;
  }

  init({
    cachePath,
    workspaces: workspaces.join(','),
    platformType,
  });
}

export function output(projectList: Project[]): ResultItem[] {
  const result = projectList.map(
    ({
      name,
      path,
      type,
      hits,
      idePath,
    }: {
      name: string;
      path: string;
      type: string;
      hits: number;
      idePath: string;
    }) => {
      return {
        title: name,
        description: `${hits} ${path}`,
        icon: `assets/type/${type}.png`,
        path,
        type,
        idePath,
      };
    }
  );
  return result;
}

export async function onClearCache(): Promise<void> {
  try {
    initCore();
    await clearCache();
    notice('缓存清除成功');
  } catch (error: any) {
    errorHandle(error);
  }
}
