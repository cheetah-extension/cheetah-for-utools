/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ChildInfo, Project, Config, ResultItem } from './type';

const HOME_PATH = process.env.HOME ?? '';

// 缓存路径
const cachePath = path.join(
  `${HOME_PATH}/.utools/fmcat/cheetah`,
  'config.json'
);

// 获取文件的 md5 值
export function getMd5(content: string) {
  const hash = crypto.createHash('md5');
  hash.update(content, 'utf8');
  return hash.digest('hex');
}

// 写入缓存
export async function writeCache(newCache: Project[]): Promise<void> {
  try {
    const { editor } = await readCache();
    const newEditorList = combinedEditorList(editor, newCache);
    const newConfig = { editor: newEditorList, cache: newCache };
    const historyString = JSON.stringify(newConfig, null, 2);
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, historyString);
  } catch (error: any) {
    console.log(error.message);
  }
}

// 合并编辑器
function combinedEditorList(
  editor: { [key: string]: string },
  cache: Project[]
) {
  const newEditor = { ...editor };
  const currentEditor = Object.keys(newEditor);
  cache.forEach(({ type }: Project) => {
    if (!currentEditor.includes(type)) {
      newEditor[type] = '';
    }
  });
  return newEditor;
}

// 更新缓存时合并项目点击数
async function combinedCache(newCache: Project[]): Promise<Project[]> {
  const { cache } = await readCache();
  // 筛选有点击记录的项目
  const needMergeList = {} as { [key: string]: Project };
  cache
    .filter((item: Project) => item.hits > 0 || item.idePath)
    .forEach((item: Project) => {
      needMergeList[item.path] = item;
    });
  // 合并点击数
  newCache.forEach((item: Project) => {
    const cacheItem = needMergeList[item.path] ?? {};
    const { hits = 0, idePath = '' } = cacheItem;
    item.hits = item.hits > hits ? item.hits : hits;
    item.idePath = idePath;
  });
  return newCache;
}

// 读取文件内容
function readFile(filePath: string): string {
  return fs.readFileSync(filePath).toString();
}

// 读取缓存
export function readCache(): Config {
  try {
    const history = readFile(cachePath);
    return JSON.parse(history) ?? { editor: {}, cache: [] };
  } catch (error: any) {
    if (error.message === 'no such file or directory') {
      writeCache([]);
      return { editor: {}, cache: [] };
    }
    return { editor: {}, cache: [] };
  }
}

// 查找博客目录
export function findProject(dirPath: string): Project[] {
  const result: Project[] = [];
  const currentChildren: ChildInfo[] = [];
  let dirIter = [];
  try {
    dirIter = fs.readdirSync(dirPath);
  } catch (error) {
    return result;
  }

  for (const item of dirIter) {
    const itemPath = path.join(dirPath, item);
    let isDir = false;
    try {
      isDir = fs.statSync(itemPath).isDirectory();
    } catch (error: any) {
      //
    }
    currentChildren.push({
      name: item,
      isDir,
      path: itemPath,
    });
  }

  const isGitProject = currentChildren.some(
    ({ name }: { name: string }) => name === '.git'
  );

  const hasSubmodules = currentChildren.some(
    ({ name }: { name: string }) => name === '.gitmodules'
  );

  if (isGitProject) {
    result.push({
      name: path.basename(dirPath),
      path: dirPath,
      type: projectTypeParse(currentChildren),
      hits: 0,
      idePath: '',
    });
  }

  let nextLevelDir: ChildInfo[] = [];
  if (!isGitProject) {
    nextLevelDir = currentChildren.filter(
      ({ isDir }: { isDir: boolean }) => isDir
    );
  }
  if (isGitProject && hasSubmodules) {
    nextLevelDir = findSubmodules(path.join(dirPath, '.gitmodules'));
  }

  for (let i = 0; i < nextLevelDir.length; i += 1) {
    const dir = nextLevelDir[i];
    result.push(...findProject(path.join(dirPath, dir.name)));
  }
  return result;
}

// 查找项目内的 submodule
export function findSubmodules(filePath: string): ChildInfo[] {
  const fileContent = readFile(filePath);
  const matchModules = fileContent.match(/(?<=path = )([\S]*)(?=\n)/g) ?? [];
  return matchModules.map((module) => {
    return {
      name: module,
      isDir: true,
      path: path.join(path.dirname(filePath), module),
    };
  });
}

// 判断项目下的文件列表是否包含需要搜索的文件列表
function findFileFromProject(
  allFile: ChildInfo[],
  fileNames: string[]
): boolean {
  const reg = new RegExp(`^(${fileNames.join('|')})$`, 'i');
  const findFileList = allFile.filter(({ name }: { name: string }) =>
    reg.test(name)
  );

  return findFileList.length === fileNames.length;
}

function findDependFromPackage(
  allDependList: string[],
  dependList: string[]
): boolean {
  const reg = new RegExp(`^(${dependList.join('|')})$`, 'i');
  const findDependList = allDependList.filter((item: string) => reg.test(item));

  return findDependList.length >= dependList.length;
}

function getDependList(allFile: ChildInfo[]): string[] {
  const packageJsonFilePath =
    allFile.find(({ name }) => name === 'package.json')?.path ?? '';
  if (!packageJsonFilePath) {
    return [];
  }
  const { dependencies = [], devDependencies = [] } = JSON.parse(
    readFile(packageJsonFilePath)
  );
  const dependList = { ...dependencies, ...devDependencies };
  return Object.keys(dependList);
}

// 解析项目类型
function projectTypeParse(children: ChildInfo[]): string {
  if (findFileFromProject(children, ['cargo.toml'])) {
    return 'rust';
  }
  if (findFileFromProject(children, ['pubspec.yaml'])) {
    return 'dart';
  }
  if (findFileFromProject(children, ['.*.xcodeproj'])) {
    return 'applescript';
  }
  if (findFileFromProject(children, ['app', 'gradle'])) {
    return 'android';
  }
  // js 项目还可以细分
  if (findFileFromProject(children, ['package.json'])) {
    if (findFileFromProject(children, ['nuxt.config.js'])) {
      return 'nuxt';
    }
    if (findFileFromProject(children, ['vue.config.js'])) {
      return 'vue';
    }
    if (findFileFromProject(children, ['.vscodeignore'])) {
      return 'vscode';
    }

    const isTS = findFileFromProject(children, ['tsconfig.json']);
    const dependList = getDependList(children);

    if (findDependFromPackage(dependList, ['react'])) {
      return isTS ? 'react_ts' : 'react';
    }

    if (findDependFromPackage(dependList, ['hexo'])) {
      return 'hexo';
    }

    return isTS ? 'typescript' : 'javascript';
  }
  return 'unknown';
}

// 过滤项目
export function filterProject(
  projectList: Project[],
  keyword: string
): Project[] {
  const result = projectList.filter(({ name }: { name: string }) => {
    const reg = new RegExp(keyword, 'i');
    return reg.test(name);
  });

  // 排序规则：项目名称以关键词开头的权重最高，剩余的以点击量降序排序
  const startMatch: Project[] = [];
  const otherMatch: Project[] = [];
  result.forEach((item) => {
    if (item.name.startsWith(keyword)) {
      startMatch.push(item);
    } else {
      otherMatch.push(item);
    }
  });

  return [
    ...startMatch.sort((a: Project, b: Project) => b.hits - a.hits),
    ...otherMatch.sort((a: Project, b: Project) => b.hits - a.hits),
  ];
}
// 输出待选列表给 Alfred
export function output(projectList: Project[]): ResultItem[] {
  const result = projectList.map(
    ({
      name,
      path,
      type,
      hits,
      idePath
    }: {
      name: string;
      path: string;
      type: string;
      hits: number;
      idePath: string;
    }) => {
      return {
        title: name,
        description: `${hits} ${path}`,
        icon: `assets/type/${type}.png`,
        path,
        type,
        idePath
      };
    }
  );
  return result;
}

// 在多个工作目录下搜索项目，工作目录以英文逗号分隔
async function batchFindProject() {
  const workspaces =
    '/Users/caohaoxia/Documents/work,/Users/caohaoxia/Documents/document/周报'
      .replace(/^~/, HOME_PATH)
      .split(/,|，/);
  const projectList: Project[] = [];
  for (let i = 0; i < workspaces.length; i += 1) {
    const dirPath = workspaces[i];
    const children = await findProject(dirPath);
    projectList.push(...children);
  }
  return projectList;
}

// 从缓存中过滤
export async function filterWithCache(keyword: string): Promise<ResultItem[]> {
  const { cache } = await readCache();
  return output(filterProject(cache, keyword));
}

// 从搜索结果中过滤
export async function filterWithSearchResult(
  keyword: string
): Promise<ResultItem[]> {
  const projectList: Project[] = await batchFindProject();
  writeCache(await combinedCache(projectList));
  return filterWithCache(keyword);
}

export default {
  filterWithCache,
  filterWithSearchResult,
};
