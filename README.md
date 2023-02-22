# 猎豹 for uTools

查找指定目录下的 Git 项目，并使用配置的应用快速打开。

## 命令介绍

### setting / 设置

打开设置面板，可配置默认应用、工作区、清空缓存。

![设置面板](https://pic.fmcat.top/picgo/20220414151828.png)

### open / 编辑器

输入关键字匹配项目，使用 `默认编辑器` 打开项目。

### git_gui_open / Git 应用

输入关键字匹配项目，使用 `Git GUI 应用` 打开项目。

### terminal_open / 终端

输入关键字匹配项目，使用 `终端` 打开项目。

### folder_open / 文件夹

输入关键字匹配项目，打开项目文件夹。

### set_application / 设置项目默认应用

输入关键字匹配项目，为项目设置打开应用，优先级高于默认编辑器。

## 隐私

所有代码均以开源，无任何上传代码行为，如不放心可以参考逻辑自行开发。

## 本地运行

执行 `yarn preload` 运行 preload 入口文件编译监听
执行 `yarn view-build` 编译设置面板监听（监听没什么用，加载页面时样式会丢失，还是需要重新运行）

```
cheetah-for-utools
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ config
│  ├─ description
│  ├─ fork-settings
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 02
│  │  │  └─ da548c46787d91e12ad425a4179f4961a49064
│  │  ├─ 0e
│  │  │  └─ ba3b19a536f995892ff751d48518ce1b13a13e
│  │  ├─ 15
│  │  │  ├─ a9eb33a917637ba9d70814c1a5e6ea6714abaf
│  │  │  └─ ea22ca0581e95ce96022399fa31782cbd6b518
│  │  ├─ 1a
│  │  │  └─ e47f8bfa7373573055f68529930bb43bd60503
│  │  ├─ 30
│  │  │  └─ ab3c9734433519088041ed3c32b81a9123367b
│  │  ├─ 32
│  │  │  └─ ca10be591b02f77dfd688bf240dd7f9ca99342
│  │  ├─ 36
│  │  │  └─ b6cc2d4ad578b53b7e66667c4ef1195e64fa48
│  │  ├─ 3e
│  │  │  └─ f0fb7cab21a256451c26e5ea83bbc14c90dd2e
│  │  ├─ 40
│  │  │  └─ 3284f4979c39048c5e8415bc4c77d00fb9be6b
│  │  ├─ 44
│  │  │  └─ cf26e213b289884ecad3446463fd1950919983
│  │  ├─ 49
│  │  │  └─ 5c0217ec71be513ef0ed4dbc65a915e46f096f
│  │  ├─ 54
│  │  │  └─ 03e96196677491c36d6f4579b37e0c969ee7c7
│  │  ├─ 5d
│  │  │  └─ 3e00924a0d0dc3695dc70820e840bb4b45d5c1
│  │  ├─ 63
│  │  │  └─ cdfcc36370ba513f45866c230dc17ce54311db
│  │  ├─ 68
│  │  │  └─ 2d555acddd7e8639e627472dcfcd9762ffb545
│  │  ├─ 69
│  │  │  └─ b91f516a2f3bcc88600b78352645ea9e293f94
│  │  ├─ 6c
│  │  │  └─ 90e312645599c40c52493fa60e449bfcef78e3
│  │  ├─ 6e
│  │  │  └─ ac7ad708ae88b8033d16de0f9d930508ccac12
│  │  ├─ 6f
│  │  │  └─ 265ad71101bad4a5b6ebb830384ea7f4f5a9fa
│  │  ├─ 70
│  │  │  ├─ 15c2c371d99e521c58041c65adb251bb7144ba
│  │  │  └─ 2e07e62f6700cec8640ae34dfd5398ba31ab49
│  │  ├─ 72
│  │  │  └─ 28d789053e714513c7bc62ae938fd47afe3d8a
│  │  ├─ 8a
│  │  │  └─ 7cc4b7b1ec782fe7770e52eb9565f3bac591a4
│  │  ├─ 8b
│  │  │  └─ 28644aec05efef5eb52e24c3e20ba4c956f71e
│  │  ├─ 8d
│  │  │  └─ af7110283647945c634032db39bd2295b5241a
│  │  ├─ 90
│  │  │  └─ da288d8eeeb6ed9f41687fd7364d41be6e7a3e
│  │  ├─ 9a
│  │  │  └─ 27108098158d6f9c22d13791031fefde3e6280
│  │  ├─ a4
│  │  │  └─ 34b0105f13dd345993cd8f8c66521ffc2b6a4f
│  │  ├─ a5
│  │  │  └─ f67dfaace7cc00c3fd011895c089e9f61ff454
│  │  ├─ a7
│  │  │  └─ f3b1ffce1444ab884fed817ddfc9ec3d7c4309
│  │  ├─ ab
│  │  │  └─ 293112244a467c2f6b669c088bc3502e015eea
│  │  ├─ ae
│  │  │  └─ 7d1f51851e9ea8ab3eec69c5ea36b7c1615538
│  │  ├─ b9
│  │  │  └─ 2a27173dfe0be953df7d6335b962e972b891e3
│  │  ├─ ba
│  │  │  └─ 3fa00403053b9c793674a0f0ebed865bd0f9cb
│  │  ├─ cd
│  │  │  └─ 8206ea98b044129760eb62253ade3593fb9973
│  │  ├─ d0
│  │  │  └─ c7558fa34eebf854788671d6230463d24c3d54
│  │  ├─ de
│  │  │  └─ 138e8a72c7b429b8af109ec911563825dfa06c
│  │  ├─ e6
│  │  │  └─ 8511a9899dbb06f8a74d766c70f1858c033e28
│  │  ├─ eb
│  │  │  └─ a233a7baeb948681c8a646ee04114134d512db
│  │  ├─ ed
│  │  │  ├─ a8df16ff4cffc6728d63025efa2b3fc89d358c
│  │  │  └─ bc6c66683ee42c69decd56fa6383561f5eef2e
│  │  ├─ ef
│  │  │  └─ 69c6210098ffb19075c40422f9fdb32702ee1e
│  │  ├─ f4
│  │  │  └─ 54d1f02c53a5cd30abab80e6007d028987eb8e
│  │  ├─ fa
│  │  │  └─ 345bc979e8fca0774a9b8eaf2243c30569ddd6
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-dc1a1ae8bbb50fe990db1c1909b5719405104598.idx
│  │     └─ pack-dc1a1ae8bbb50fe990db1c1909b5719405104598.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ develop
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     ├─ develop
│     │     └─ master
│     └─ tags
│        └─ 1.2.0
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ CHANGE.md
├─ README.md
├─ lib
│  ├─ common
│  │  ├─ constant.ts
│  │  ├─ core.ts
│  │  ├─ index.ts
│  │  └─ utils.ts
│  ├─ index.ts
│  └─ mount.ts
├─ package
│  ├─ assets
│  │  ├─ empty.png
│  │  ├─ logo.png
│  │  ├─ refresh.png
│  │  └─ type
│  │     ├─ android.png
│  │     ├─ applescript.png
│  │     ├─ dart.png
│  │     ├─ hexo.png
│  │     ├─ javascript.png
│  │     ├─ nuxt.png
│  │     ├─ react.png
│  │     ├─ react_ts.png
│  │     ├─ rust.png
│  │     ├─ typescript.png
│  │     ├─ unknown.png
│  │     ├─ vscode.png
│  │     └─ vue.png
│  ├─ index.js
│  ├─ plugin.json
│  └─ window
│     ├─ assets
│     │  ├─ index.2a2238e4.css
│     │  ├─ index.c86e41ee.css
│     │  ├─ index.f3cec1c2.js
│     │  ├─ index.fe551449.js
│     │  └─ logo.dce191cc.png
│     ├─ favicon.ico
│     └─ index.html
├─ package.json
├─ rollup.config.js
├─ tsconfig.json
├─ types.d.ts
├─ vite.config.ts
└─ window
   ├─ index.html
   ├─ public
   │  └─ favicon.ico
   └─ src
      ├─ App.vue
      ├─ assets
      │  └─ logo.png
      ├─ components
      │  ├─ app-choose-item.vue
      │  ├─ cell-button.vue
      │  └─ workspace-manager.vue
      ├─ env.d.ts
      ├─ main.ts
      ├─ pages
      │  └─ index.vue
      └─ router
         └─ index.ts

```