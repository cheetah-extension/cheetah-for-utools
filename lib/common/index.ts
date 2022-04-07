export function chooseFile() {
  return utools.showOpenDialog({
    filters: [{ extensions: ['app'] }],
    properties: ['openFile'],
  });
}

export function getValue(key: string) {
  let data = utools.dbStorage.getItem(key) ?? null;

  if (data) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      data = null;
    }
  }

  return data;
}

export function setValue(key: string, value: any, rev?: string) {
  let data = value;
  if (typeof data !== 'string') {
    data = JSON.stringify(value);
  }

  return utools.dbStorage.setItem(key, data);
}

export default {
  chooseFile,
  getValue,
  setValue,
};
