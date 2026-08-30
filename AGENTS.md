# AGENTS.md

在线拼音打字练习（Vite + React + antd + `@vitjs/vit`）。命令与依赖见 `package.json`，
功能清单见 `README.md`，此处不重复。用户级规则不写进本文件。

## Hard Rules

### 方案与文本靠 side-effect 注册，漏 import 等于没加

拼音方案、练习文本通过模块顶层的 `Registry.schema.register` /
`Registry.text.register` / `Registry.text.load` 注册，再由
`src/assets/schemes/index.ts`、`src/assets/texts/index.ts` 侧效 import，最终经
`src/global.ts` 拉起。

新增时两步都要做：

1. 新建 `src/assets/schemes/<Name>.ts` 或 `src/assets/texts/<Name>.ts`，在文件内完成 register/load。
2. 在对应 `index.ts` 里 `import './<Name>'`。

只建文件不挂 index，运行时列表里不会出现。参照 `XianHe.ts`、`HelloWorld.ts`、`ChuShiBian.ts`。

### `vite.config.ts` 的 `base: '/pinyin/'` 不要随手改

站点部署在 GitHub Pages 子路径 `/pinyin/`（见 `.github/workflows/gh-pages.yml`）。
改 `base` 或发布目录时，部署路径与静态资源前缀必须一起对齐，否则本地 `pnpm build` 看着正常、线上资源 404。

### 拼音术语变量名用全拼

`src/core/Pinyin.ts` 约定：拼音 → `Pinyin`/`pinyin`，全拼 → `Quanpin`/`quanpin`，
双拼 → `Shuangpin`/`shuangpin`，声母 → `Shengmu`/`shengmu`。新编码与映射字段跟这套走，
不要混用拼音缩写或英文意译（如 `initial`/`final`）。

### `TextRegister.load` 的注音要人工核对

`load({ content, pinyin })` 按「字 ↔ 拼音 token」一一对齐；工具站注音有已知错例
（见 `src/core/registers/TextRegister/index.ts` 注释：「内」→`na`，「其」→`ji`）。
用 `load` 新增长文后，抽查易错字，不要默认相信导出结果。短文优先手写
`Registry.text.register`（见 `HelloWorld.ts`）。

### 包管理器用 pnpm

仓库锁文件是 `pnpm-lock.yaml`。本地安装/脚本用 `pnpm`，不要另起一份
`package-lock.json`。CI workflow 仍写着 `npm install`，改部署流程时先显式对齐锁文件策略。

## Task Routing

只读匹配当前任务的那一处，不要预加载。

| 任务 | 读 |
| --- | --- |
| 新增 / 修改拼音方案（全拼、双拼映射） | 上面「side-effect 注册」+ `src/assets/schemes/` + `src/core/registers/PinyinSchemaRegister/` |
| 新增 / 修改练习文本 | 上面「side-effect 注册」与「注音核对」+ `src/assets/texts/` |
| 编码枚举、声母、零声母、全拼↔双拼转换 | `src/core/Pinyin.ts`、`src/core/registers/PinyinSchemaRegister/` |
| 练习页 UI、输入进度、配置抽屉 | `src/pages/Hero/` |
| 汉字格 / 四线格组件 | `src/components/` |
| 路由 | `vite.config.ts` 里 `vitApp({ routes })`（不在 `src/pages` 外另有路由表） |
| 本地验证 | `pnpm lint`；改 UI 时再 `pnpm dev`（port 8000）目视；发版前 `pnpm build` |
| 部署 / Pages | `.github/workflows/gh-pages.yml` + 上面 `base` 规则 |

尚无独立主题文件。某决策域规则超过约 3 条、或本文件明显超过一屏时，再拆到 `docs/` 并由本表路由。
