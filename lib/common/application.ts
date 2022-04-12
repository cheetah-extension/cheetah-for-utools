import { getValue, setValue, notice, chooseFile } from './';
import { platform } from './base';
import { readCache, writeCache } from './core';
import { ResultItem, Project } from './type';
import { COMMAND } from './constant';
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

/**
 * @description: 兜底方案，返回文件夹打开的应用路径
 * @param {*}
 * @return {*}
 */
function openFolderAppPath(): string {
  if (platform.isWin) {
    return 'explorer.exe';
  }

  return 'Finder';
}

/**
 * @description: 快捷方式解析，暂时用不上
 * @param {string} path
 * @return {*}
 */
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

/**
 * @description: windows 下终端命令处理
 * @param {string} realAppPath 应用路径
 * @param {string} projectPath 项目路径
 * @return {*}
 */
function windowsTerminal(realAppPath: string, projectPath: string): string {
  if (/powershell/i.test(realAppPath)) {
    return `start powershell -NoExit -Command "cd ${projectPath}"`;
  }

  if (/cmd/i.test(realAppPath)) {
    return `start /D ${projectPath}`;
  }

  notice('未知的终端程序，降级为文件夹打开');
  return `${openFolderAppPath()} ${projectPath}`;
}

// windows git gui 应用命令处理
// function windowsGitGui(realAppPath: string, projectPath: string) {
//   if (/github/i.test(realAppPath)) {
//     return `github "${projectPath.replace(/\\\\/g, '\\')}"`;
//   }

//   return `"${realAppPath}" "${projectPath}"`;
// }

/**
 * @description: 处理 windows 路径
 * @param {string} path
 * @return {*}
 */
function pathConvert(path: string): string {
  return platform.isMac ? path : path.replace(/\\/g, '\\\\');
}

/**
 * @description: 获取打开项目的命令
 * @param {string} commandType 命令类型
 * @param {ResultItem} projectItem 项目信息
 * @return {*}
 */
export function getOpenCommand(
  commandType: string = '',
  projectItem?: ResultItem
): string {
  const { editor } = readCache();
  const { type = '', path = '', idePath } = projectItem ?? {};
  // 默认应用集合
  const defaultAppConfig = getValue('defaultApp');
  // 默认应用
  const defaultAppPath = defaultAppConfig?.[commandType] ?? '';
  // 类型应用
  const typeAppPath = editor?.[type] ?? '';
  // 最终使用的应用
  const targetAppPath = idePath || typeAppPath || defaultAppPath;

  let realAppPath = pathConvert(targetAppPath);
  let projectPath = pathConvert(path);

  // 打开文件夹为兜底选项
  if (!realAppPath) {
    realAppPath = openFolderAppPath();
  }

  if (platform.isMac) {
    return `open -a "${realAppPath}" "${projectPath}"`;
  }

  if (commandType === COMMAND.TERMINAL_OPEN) {
    return windowsTerminal(realAppPath, projectPath);
  }

  // if (commandType === COMMAND.GIT_GUI_OPEN) {
  //   return windowsGitGui(realAppPath, projectPath);
  // }

  return `"${realAppPath}" "${projectPath}"`;
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

/**
 * @description: 设置项目专属编辑器
 * @param {ResultItem} projectItem
 * @return {*}
 */
export function setProjectApp(projectItem: ResultItem): void {
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

/**
 * @description: 更新项目打开次数，用于排序
 * @param {ResultItem} projectItem
 * @return {*}
 */
export function updateHits(projectItem: ResultItem): void {
  const { path } = projectItem;
  const { cache: cacheList = [] } = readCache();

  const targetProject = cacheList.find((item: Project) => item.path === path);

  if (!targetProject) {
    return;
  }

  targetProject.hits += 1;
  writeCache(cacheList);
}

export default {
  getAllDefaultApp,
  setDefaultApp,
};
