# 延安精神学习助手 · 前端

基于 React 18 + TypeScript + Vite + Ant Design 的延安精神双语学习问答界面，支持「中文 / EN」切换。

## 开发

```bash
npm install
npm run dev      # http://localhost:5181
```

## 构建

```bash
npm run build    # 产物输出到 dist/
npm run preview
```

## 环境变量

在 `frontend/.env` 中配置：

| 变量 | 说明 | 默认 |
|---|---|---|
| `VITE_TITLE` | 产品中文名 | 延安精神学习助手 |
| `VITE_TITLE_EN` | 产品英文名 | Yan'an Spirit Learning Assistant |
| `VITE_SLOGAN` | 中文定位语 | 传承延安精神 · 双语智能问答 |
| `VITE_SLOGAN_EN` | 英文定位语 | Learn and explore the Yan'an Spirit in Chinese and English |
| `VITE_ASSISTANT_NAME` | 助手中文名 | 延安精神学习助手 |
| `VITE_ASSISTANT_NAME_EN` | 助手英文名 | Yan'an Spirit Assistant |
| `VITE_REPO_NAME` | 知识库页面中文标题 | 延安精神知识库 |
| `VITE_REPO_NAME_EN` | 知识库页面英文标题 | Yan'an Spirit Knowledge Base |
| `VITE_API_BASE` | 后端地址 | http://localhost:8000 |

品牌相关的读取逻辑集中在 `src/configs/brand.ts`；中英文界面文案在 `src/configs/i18n.ts`，语言状态在 `src/store/lang.ts`。

## 目录

```
src/
  api/          请求封装、接口定义
  components/   Markdown 渲染、输入框、上传、页面布局
  layout/       侧边栏、导航、背景
  pages/        登录、对话、知识库、404
  router/       路由表与导航
  store/        valtio 状态（用户、会话、设备、语言）
  configs/      品牌、枚举与中英文文案
  utils/        通用 hook
```

## 说明

语音输入依赖火山引擎语音服务，`VITE_VOLC_APPID` / `VITE_VOLC_ACCESS_KEY` 仅用于本地演示，生产环境应改为由后端签发临时 Token。