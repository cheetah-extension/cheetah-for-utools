export const platform: { [key: string]: boolean } = {
  isMac: utools.isMacOs(),
  isWin: utools.isWindows(),
  isLinux: utools.isLinux(),
};

// 搜索项目时需要排除的目录
export const ignoreFolders = [
  'node_modules',
]