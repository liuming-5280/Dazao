# 延安精神学习助手 · 后端

FastAPI 服务，负责用户鉴权、会话管理、延安精神资料解析入库、检索与双语流式问答。提示词集中在 `app/service/core/prompts.py`。

## 依赖

- Docker / Docker Compose
- 至少 4GB 可用内存、10GB 可用磁盘（Elasticsearch 建议独占 1GB+）
- 阿里云百炼 API Key（对话、Embedding、Rerank）

## 启动

```bash
cd backend
cp .env.example .env   # 填入 DASHSCOPE_API_KEY 等配置
docker compose up -d --build
docker compose logs -f knowisle_api
```

服务：

| 服务 | 容器名 | 端口 | 说明 |
|---|---|---|---|
| API | `knowisle_api` | 8000 | FastAPI，文档 `/docs` |
| PostgreSQL | `knowisle_pg` | 5432 | 业务数据 |
| Elasticsearch | `knowisle-es-01` | 9200 | 向量 + 全文索引 |
| Redis | `knowisle-redis` | 6379 | 快速解析缓存 |

## 主要配置项

| 变量 | 说明 |
|---|---|
| `DASHSCOPE_API_KEY` | 百炼 API Key（必填） |
| `DASHSCOPE_BASE_URL` | OpenAI 兼容接口地址 |
| `CHAT_MODEL` | 对话模型 |
| `UTIL_MODEL` | 会话命名、推荐问题等轻量任务模型 |
| `EMBEDDING_MODEL` | 向量模型，维度需与 ES 索引一致 |
| `RERANK_MODEL` | 重排序模型 |
| `DATABASE_URL` | PostgreSQL 连接串 |
| `ES_HOST` | Elasticsearch 地址 |
| `REDIS_HOST` / `REDIS_PORT` / `REDIS_DB` | Redis 连接配置 |
| `MEM_LIMIT` / `TIMEZONE` | ES 容器内存上限与时区 |

## 接口一览

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/register` / `/login` | 注册 / 登录 |
| POST | `/create_session` | 创建会话 |
| POST | `/quick_parse` | 会话内临时解析小文档 |
| GET | `/get_parsed_content` | 读取快速解析结果 |
| POST | `/upload_files` | 上传知识库文档并入库 |
| POST | `/chat_on_docs` | 基于知识库的流式问答（SSE） |
| GET | `/get_sessions` | 会话列表 |
| GET | `/get_messages` | 会话消息 |
| GET | `/get_files` | 知识库文档列表 |
| DELETE | `/delete_file/{file_name}` | 删除知识库文档 |
| GET | `/sessions/{session_id}/documents` | 会话文档记录 |

除注册、登录外均需要 `Authorization: Bearer <token>`。

## 开发

```bash
# 本地直接跑（需自备 PG / ES / Redis）
cd app
pip install -r requirements.txt
uvicorn app_main:app --reload --port 8000
```

## 常见问题

1. **端口占用**：确认 8000 / 5432 / 9200 / 6379 未被占用
2. **ES 启动慢**：首次启动需初始化，健康检查最长等待数分钟
3. **内存不足**：调低 `MEM_LIMIT` 与 `ES_JAVA_OPTS`
4. **检索为空**：确认文档已成功入库，索引名与当前用户一致
5. **模型报错**：确认 `CHAT_MODEL` / `EMBEDDING_MODEL` 已在百炼控制台开通

## 开源声明

`app/service/core` 下的 `deepdoc`、`rag` 目录基于 [RAGFlow](https://github.com/infiniflow/ragflow) 二次开发（Apache License 2.0）。