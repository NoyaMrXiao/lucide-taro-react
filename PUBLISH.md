# 发布指南

## 发布前准备

### 1. 检查 package.json

确保以下字段已填写：
- `name`: 包名（确保在 npm 上唯一）
- `version`: 版本号（遵循语义化版本）
- `description`: 包描述
- `author`: 作者信息（可选）
- `license`: 许可证
- `repository`: 仓库地址（可选但推荐）

### 2. 构建包

```bash
npm run build
```

这会自动运行 `prepublishOnly` 脚本，确保使用最新代码构建。

### 3. 检查构建产物

确保 `dist/` 目录包含：
- `index.js` (CommonJS)
- `index.mjs` (ESM)
- `index.d.ts` (TypeScript 类型定义)
- `index.d.mts` (TypeScript ESM 类型定义)

## 发布到 npm

### 首次发布

1. **登录 npm**
```bash
npm login
```

2. **检查包名是否可用**
```bash
npm view lucide-taro-react
```
如果返回 404，说明包名可用。

3. **发布**
```bash
npm publish --access public
```
使用 `--access public` 因为这是 scoped 包或者是首次发布的公共包。

### 更新版本

1. **更新版本号**（三种方式选其一）

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 主要版本 (1.0.0 -> 2.0.0)
npm version major
```

或者手动编辑 `package.json` 中的 `version` 字段。

2. **发布**
```bash
npm publish
```

### 发布测试版本

```bash
# 发布 beta 版本
npm version prepatch --preid=beta
npm publish --tag beta

# 安装测试版本
npm install lucide-taro-react@beta
```

## 使用 npm link 本地测试

在发布前，建议先在本地测试：

```bash
# 在包目录
npm link

# 在测试项目中
npm link lucide-taro-react
```

## 撤销发布（如果出错）

**注意：发布后 72 小时内可以撤销**

```bash
# 撤销整个版本
npm unpublish lucide-taro-react@1.0.0

# 撤销并删除包（仅在 72 小时内且无其他版本）
npm unpublish lucide-taro-react --force
```

## 自动化发布（可选）

可以设置 GitHub Actions 自动发布：

```yaml
# .github/workflows/publish.yml
name: Publish

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

