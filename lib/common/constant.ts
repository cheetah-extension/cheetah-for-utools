export const COMMAND = {
  OPEN: 'open',
  GIT_GUI_OPEN: 'git_gui_open',
  FOLDER_OPEN: 'folder_open',
  TERMINAL_OPEN: 'terminal_open',
  SET_APPLICATION: 'set_application',
};

export const commandMap: { [key: string]: string } = {
  编辑器: COMMAND.OPEN,
  open: COMMAND.OPEN,
  Git应用: 'git_gui_open',
  git_gui_open: 'git_gui_open',
  终端: 'terminal_open',
  terminal_open: 'terminal_open',
  文件夹: 'folder_open',
  folder_open: 'folder_open',
  设置项目默认应用: 'set_application',
  set_application: 'set_application',
};
