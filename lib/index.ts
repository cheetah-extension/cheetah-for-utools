import cp from 'child_process';
import './mount';
import {
  filterWithCache,
  filterWithSearchResult,
  updateHits,
  Project,
  ResultItem,
  COMMAND,
  getOpenCommand,
  setProjectApp,
} from 'cheetah-core';
import {
  initCore,
  output,
  chooseFile,
  commandMap,
  getAllDefaultApp,
  errorHandle,
} from './common';

const refreshKeyword = '[refresh]';

/**
 * @description: 搜索项目
 * @param {any} action
 * @param {string} keyword 搜索关键字
 * @param {any} callbackSetList 渲染候选列表的回调
 * @return {*}
 */
async function search(
  action: any,
  keyword: string,
  callbackSetList: any
): Promise<void> {
  try {
    initCore();
    const needRefresh: boolean = keyword.includes(refreshKeyword);
    const searchKeyword = keyword.replace(refreshKeyword, '');
    if (!searchKeyword) return callbackSetList();
    let projects: Project[] = await filterWithCache(searchKeyword);
    let fromCache = true;
    // 如果缓存结果为空或者需要刷新缓存，则重新搜索
    if (!projects.length || needRefresh) {
      projects = await filterWithSearchResult(searchKeyword);
      fromCache = false;
    }

    const result: ResultItem[] = output(projects);

    if (fromCache) {
      result.push({
        title: '忽略缓存重新搜索',
        description: '以上结果从缓存中获得,选择本条将重新搜索项目并更新缓存',
        icon: 'assets/refresh.png',
        arg: searchKeyword,
      });
    }

    if (!result.length) {
      result.push({
        title: `没有找到名称包含 ${searchKeyword} 的项目`,
        description: '请尝试更换关键词，回车返回重新搜索',
        icon: 'assets/empty.png',
        type: 'empty',
      });
    }

    callbackSetList(result);
  } catch (error: any) {
    errorHandle(error);
  }
}

/**
 * @description: 处理点击结果，如果是重新搜索会返回跳过
 * @param {ResultItem} itemData 被点击的条目
 * @return {boolean} 是否需要跳过
 */
function commonSelect(itemData: ResultItem): boolean {
  const { arg, type } = itemData;
  // 搜索结果为空的条目被点击则置空输入框
  if (type === 'empty') {
    utools.setSubInputValue('');
    return true;
  }
  // 重新搜索时重置搜索框内容为 [refresh]+关键字
  const skip = arg !== null && arg !== undefined;
  if (skip) {
    utools.setSubInputValue(`${refreshKeyword}${arg}`);
  }
  return skip;
}

window.exports = {
  open: {
    mode: 'list',
    args: {
      search,
      select: async (action: any, itemData: ResultItem) => {
        try {
          if (commonSelect(itemData)) return;
          initCore();
          const { payload }: { payload: string } = action;
          const commandType = commandMap[payload];

          if (commandType === COMMAND.SET_APPLICATION) {
            const appPath: string = chooseFile();
            setProjectApp(itemData.path!, appPath);
            utools.hideMainWindow();
            utools.outPlugin();
            return;
          }

          const defaultAppPath = getAllDefaultApp()?.[commandType] ?? '';
          
          const command = await getOpenCommand(
            itemData,
            commandType,
            defaultAppPath
          );

          cp.exec(command, { windowsHide: true }, (error: any) => {
            if (error) {
              utools.showNotification(error?.message ?? '未知错误');
            }
            updateHits(itemData.path!);
            utools.hideMainWindow();
            utools.outPlugin();
          });
        } catch (error: any) {
          errorHandle(error);
        }
      },
    },
  },
  setting: {
    mode: 'none',
    args: {
      enter: (action: any) => {
        const settingWindow = utools.createBrowserWindow(
          './window/index.html',
          {
            show: false,
            title: '设置',
            resizable: false,
            minimizable: false,
            maximizable: false,
            height: 800,
            width: 500,
            webPreferences: {
              preload: 'index.js',
            },
          },
          () => {
            settingWindow.show();
          }
        );
        utools.hideMainWindow();
      },
    },
  },
};
