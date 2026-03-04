# 欢迎页面 Web 应用（纯前端）

这是一个无需后端的静态 Web 应用，包含以下功能：

- 欢迎界面（可自定义欢迎文案）
- 当前时间实时显示（每秒更新）
- 设置弹窗（修改欢迎文案 + 切换 24/12 小时制）
- 设置持久化（使用浏览器 `localStorage` 保存）

## 项目结构

```text
.
├── index.html
├── styles.css
├── app.js
└── README.md
```

## 本地运行

该项目是纯静态页面，直接启动一个静态服务器即可。

### 方案 1：使用 Python（推荐，通常系统自带）

在项目根目录执行：

```bash
python3 -m http.server 8080
```

浏览器访问：

```text
http://localhost:8080
```

### 方案 2：使用 Node（如果你已安装 npm）

```bash
npx serve .
```

## 功能测试（手动验证清单）

1. 打开页面后可看到欢迎文案和当前时间。
2. 时间每秒刷新一次。
3. 点击“设置”，可输入新的欢迎文案，并切换时间格式（24/12 小时制）。
4. 点击“保存”后，主界面文案和时间格式立即更新。
5. 刷新页面后，设置仍然保留（持久化成功）。
6. 点击“恢复默认”后，欢迎文案与时间格式恢复到默认值。

## 部署方式

该项目是静态资源，可直接部署到任意静态托管平台。

### 部署到 Nginx（Linux 服务器）

1. 将 `index.html`、`styles.css`、`app.js` 上传到 Nginx 站点目录，例如：
   - `/var/www/welcome-app/`
2. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/welcome-app;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

3. 重载 Nginx：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 部署到静态平台（如 Vercel / Netlify / GitHub Pages）

- 直接上传本仓库，构建命令留空（无需构建）。
- 发布目录设置为项目根目录（`.`）即可。
