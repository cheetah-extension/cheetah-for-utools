declare interface Window {
  setValue(key: string, value: any): void;
  getValue(key: string): any;
  chooseFile(): string[];
  chooseFolder(): string[];
  notice(content: string): void;
  platform: any;
  getAllDefaultApp(): any;
  setDefaultApp(key: string, appPath: string): void;
  onClearCache(): void;
}

declare var utools: any;
