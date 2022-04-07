export const platform: { [key: string]: boolean } = {
  isMac: utools.isMacOs(),
  isWin: utools.isWindows(),
  isLinux: utools.isLinux(),
};
