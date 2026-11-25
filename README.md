# 延安精神学习助手 Yan'an Spirit Learning Assistant

> 传承延安精神 · 双语智能问答。

这是一个面向**延安精神学习**的 RAG（检索增强生成）双语问答系统：上传延安精神相关的文献、讲话与学习资料后，系统会完成解析、切片、向量化入库，并支持带引用的流式问答、多轮会话与知识库管理。界面与回答均支持中文、英文。

## 功能

- **双语界面**：侧边栏与登录页提供「中文 / EN」切换，Ant Design 组件语言同步切换
- **双语问答**：中文提问用中文回答，英文提问用英文回答，中英混用或要求双语时分节输出
- **账号体系**：注册 / 登录，JWT 鉴权，会话与知识库按用户隔离
- **知识库管理**：上传、列表、删除文档；文档解析 → 切片 → 向量化 → 写入 Elasticsearch
- **混合检索**：向量召回 + 关键词召回加权融合，支持接入重排序模型
- **流式问答**：SSE 逐字输出，回答中标注引用编号，点击可查看原文段落
- **学习引导**：内置延安精神核心内涵介绍与示例问题，自动生成会话标题与推荐追问
- **快速解析**：会话内临时上传小文档（PDF ≤ 4 页 / DOCX、TXT ≤ 4000 字），解析结果缓存 2 小时
- **语音输入**：基于火山引擎语音服务的浏览器端语音转写

## 架构

```
┌─────────────────────────────────────────────────────────────┐
│  前端  React 18 + TypeScript + Vite + antd + valtio          │
│  双语切换 / 登录 / 会话 / 流式消息 / 引用抽屉 / 知识库管理      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP + SSE
┌───────────────────────────▼─────────────────────────────────┐
│  后端  FastAPI                                               │
│  ├─ router        user / chat / history                      │
│  ├─ service       业务编排、鉴权、文档操作                     │
│  └─ service/core  RAG 内核                                    │
│       ├─ deepdoc  版面分析 / OCR / 表格结构识别                │
│       ├─ rag      切片、分词、ES 读写、检索与重排               │
│       └─ chat     Prompt 组装 + 双语流式生成                    │
└───┬──────────────┬──────────────┬──────────────┬─────────────┘
    │              │              │              │
┌───▼────┐   ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼──────┐
│Postgres│   │Elasticsearch│ │  Redis    │  │ DashScope  │
│用户/会话│   │ 向量+全文   │ │ 缓存/临时 │  │ LLM/Embed  │
└────────┘   └───────────┘  └───────────┘  └────────────┘
```

## 技术栈

| 层 | 选型 |
|---|---|
| 前端 | React 18、TypeScript、Vite 6、Ant Design 5、valtio、ahooks、axios |
| 后端 | FastAPI、SQLAlchemy、Alembic、Pydantic |
| 存储 | PostgreSQL 15、Elasticsearch 8.11、Redis 7 |
| 模型 | DashScope（对话 / Embedding / Rerank），兼容 OpenAI 协议 |
| 文档解析 | deepdoc（版面分析、OCR、表格识别）、pdfplumber、python-docx |
| 部署 | Docker Compose、Nginx |

## 快速开始

### 1. 配置密钥

```bash
cd backend
cp .env.example .env
```

在 `backend/.env` 中填入：

```dotenv
DASHSCOPE_API_KEY=你的阿里云百炼 API Key
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
CHAT_MODEL=qwen-plus
UTIL_MODEL=qwen-turbo
EMBEDDING_MODEL=text-embedding-v3
```

> `.env` 已被忽略，**不要提交任何真实密钥**。

### 2. 启动后端

```bash
cd backend
docker compose up -d --build
docker compose logs -f knowisle_api
```

服务端口：API `8000`（文档见 http://localhost:8000/docs ）、PostgreSQL `5432`、Elasticsearch `9200`、Redis `6379`。

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:5181/ 。

### 4. 生产构建

```bash
cd frontend
npm run build
```

## 目录结构

```
backend/
  app/
    app_main.py            FastAPI 入口
    router/                接口层（用户 / 会话 / 历史 / 文档）
    service/               业务层
    service/core/          RAG 内核（解析、切片、检索、生成）
    models/ schemas/       ORM 模型与请求响应模型
    database/ utils/       数据访问与工具
  init.sql                 初始化表结构
  docker-compose.yml       API + PG + ES + Redis
frontend/
  src/
    pages/                 登录、对话、知识库
    components/            Markdown、输入框、页面布局
    api/                   请求封装与接口定义
    store/                 valtio 状态
    configs/brand.ts       品牌配置
    configs/i18n.ts        中英文界面文案
```

## 品牌与双语配置

产品名、英文名、口号、助手名都集中在：

- `frontend/.env`：`VITE_TITLE`、`VITE_TITLE_EN`、`VITE_SLOGAN`、`VITE_SLOGAN_EN`、`VITE_ASSISTANT_NAME`、`VITE_ASSISTANT_NAME_EN`、`VITE_REPO_NAME`、`VITE_REPO_NAME_EN`
- `frontend/src/configs/brand.ts`：读取上述变量并提供默认值
- `frontend/src/configs/i18n.ts`：中英文界面文案字典
- `frontend/src/store/lang.ts`：语言状态与本地持久化

改名不需要全局搜索替换。

## 提示词

延安精神双语问答的提示词集中在 `backend/app/service/core/prompts.py`，包括：

- `build_chat_messages`：角色设定、语言规则、引用规范与参考内容组装
- `build_recommended_questions_prompt`：推荐追问生成
- `build_session_name_prompt`：会话标题生成

## 开源声明

`backend/app/service/core` 下的 `deepdoc`、`rag` 目录基于 [RAGFlow](https://github.com/infiniflow/ragflow) 二次开发，遵循 Apache License 2.0，文件头保留了原始版权声明。其余业务代码为本项目自有。

## Roadmap

- [ ] 多轮对话记忆与查询改写
- [ ] 重排序接入与检索效果消融实验
- [ ] 检索评测集（Recall@k / MRR / 忠实度）
- [ ] 文档解析异步化与进度推送
- [ ] 会话与文档的越权校验、上传安全加固