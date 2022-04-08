import { filterWithCache, filterWithSearchResult } from './common/core';
import { getOpenCommand } from './common/application';
import { ResultItem } from './common/type';
// import { platform } from './base';
import './mount';
import { commandMap } from './common/constant';
const cp = require('child_process');

const refreshKeyword = '[refresh]';

/**
 * @description: 搜索项目
 * @param {any} action
 * @param {string} keyword 搜索关键字
 * @param {any} callbackSetList 渲染候选列表的回调
 * @return {*}
 */
async function search(action: any, keyword: string, callbackSetList: any) {
  const needRefresh: boolean = keyword.includes(refreshKeyword);
  const searchKeyword = keyword.replace(refreshKeyword, '');
  if (!searchKeyword) return callbackSetList();
  let result: ResultItem[] = await filterWithCache(searchKeyword);
  let fromCache = true;
  // 如果缓存结果为空或者需要刷新缓存，则重新搜索
  if (!result.length || needRefresh) {
    result = await filterWithSearchResult(searchKeyword);
    fromCache = false;
  }

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
      description: '请尝试更换关键词',
      icon: 'assets/empty.png',
    });
  }

  return callbackSetList(result);
}

/**
 * @description: 处理点击结果，如果是重新搜索会返回跳过
 * @param {ResultItem} itemData 被点击的条目
 * @return {boolean} 是否需要跳过
 */
function commonSelect(itemData: ResultItem): boolean {
  const { arg } = itemData;
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
        if (commonSelect(itemData)) return;
        const { payload }: { payload: string } = action;
        const commandType = commandMap[payload];
        // if (condition) {
          
        // }
        const command = await getOpenCommand(commandType, itemData);
        cp.exec(command);
        utools.outPlugin();
        utools.hideMainWindow();
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
            height: 600,
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
