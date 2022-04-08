import { getValue, setValue, notice, chooseFile } from './';
import { platform } from './base';
import { readCache, writeCache } from './core';
import { ResultItem, Project } from './type';
import { query as linkQuery } from 'windows-shortcuts';

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

  return 'Finder';
}

function getAppRealPath(path: string): Promise<string> {
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

export async function getOpenCommand(
  commandType: string = '',
  projectItem?: ResultItem
) {
  const { editor } = readCache();
  const { type = '', path, idePath } = projectItem ?? {};
  // 默认应用集合
  const defaultAppConfig = getValue('defaultApp');
  // 默认应用
  const defaultAppPath = defaultAppConfig?.[commandType] ?? '';
  // 类型应用
  const typeAppPath = editor?.[type] ?? '';
  // 最终使用的应用
  const targetAppPath = idePath || typeAppPath || defaultAppPath;

  let realAppPath = await getAppRealPath(targetAppPath);

  // 打开文件夹为兜底选项
  if (!realAppPath) {
    realAppPath = openFolderAppPath();
  }

  if (platform.isMac) {
    return `open -a "${realAppPath}" "${path}"`;
  }

  return `"${realAppPath}" "${path}"`;
}

export function setDefaultApp(type: string, appPath: string) {
  const defaultApp = getAllDefaultApp();
  defaultApp[type] = appPath;
  setValue('defaultApp', defaultApp);
}

export function setProjectApp(projectItem: ResultItem) {
  const { path } = projectItem;
  const { cache: cacheList = [] } = readCache();
  const projectPath: string = chooseFile();
  if (!projectPath) {
    return;
  }

  const targetProject = cacheList.find((item: Project) => item.path === path);

  if (!targetProject) {
    return;
  }

  // 更新项目编辑器
  targetProject.idePath = projectPath;
  writeCache(cacheList);
  notice('设置成功');
}

export default {
  getAllDefaultApp,
  setDefaultApp,
};
