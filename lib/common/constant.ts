export const COMMAND = {
  OPEN: 'open',
  GIT_GUI_OPEN: 'git_gui_open',
  TERMINAL_OPEN: 'terminal_open',
  FOLDER_OPEN: 'folder_open',
  SET_APPLICATION: 'set_application',
};

export const commandMap: { [key: string]: string } = {
  编辑器: COMMAND.OPEN,
  open: COMMAND.OPEN,
  Git应用: COMMAND.GIT_GUI_OPEN,
  git_gui_open: COMMAND.GIT_GUI_OPEN,
  终端: COMMAND.TERMINAL_OPEN,
  terminal_open: COMMAND.TERMINAL_OPEN,
  文件夹: COMMAND.FOLDER_OPEN,
  folder_open: COMMAND.FOLDER_OPEN,
  设置项目默认应用: COMMAND.SET_APPLICATION,
  set_application: COMMAND.SET_APPLICATION,
};
