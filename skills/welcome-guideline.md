# 欢迎语修改指南

## 文件位置

欢迎语文案位于 `public/index.html` 文件中，具体位置在第 11 行：

```html
<h1>欢迎 XXX</h1>
```

## 修改规则

当用户要求修改欢迎语时（例如"欢迎语改为欢迎 YY"）：

1. **必须修改的文件**：`public/index.html`
2. **不要修改的文件**：`README.md`、`styles.css` 等其他文件
3. **修改位置**：第 11 行的 `<h1>` 标签内容

## 示例

用户说："欢迎语修改为欢迎大哥"

正确操作：
```diff
- <h1>欢迎姐姐</h1>
+ <h1>欢迎大哥</h1>
```

错误操作：
- 修改 README.md ❌
- 修改其他文件 ❌

## 提交规范

提交信息格式：`feat: change greeting to <新欢迎语>`

例如：`feat: change greeting to 欢迎大哥`
