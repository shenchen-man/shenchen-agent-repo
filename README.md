# shenchen-agent-repo

一个简单的 Web 应用，提供欢迎界面并实时显示当前时间。

## 功能

- 欢迎界面
- 显示当前时间（每秒刷新）
- 欢迎文本支持环境变量配置
  - 环境变量：`WELCOME_TEXT`
  - 默认值：`欢迎爸爸`

## 运行方式

```bash
npm start
```

默认访问地址：`http://localhost:3000`

## 自定义欢迎文本示例

```bash
WELCOME_TEXT="欢迎来到我的应用" npm start
```
