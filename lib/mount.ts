window.setValue = function (key: string, value: any) {
  return utools.db.put({
    _id: key,
    data: value,
  });
};

window.getValue = function (key: string) {
  return utools.db.get(key);
};

window.chooseFile = function () {
  return utools.showOpenDialog({
    filters: [{ extensions: ['app'] }],
    properties: ['openFile'],
  });
};
