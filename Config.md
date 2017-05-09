配置主题
---

通过注入代码可以实现一些简单的主题配置。

参数均使用 `data-` 前缀表示，如果不填写某个参数则使用默认。

下述为默认参数列表：

```html
<div id="theme-config"
  data-toc-name="Contents"
  data-def-cover-image=""
  ></div>
```

| 项目 | 说明 | 例子 |
| ---- | ---- | ---- |
| `toc-name` | 章节目录 ToC 的标题文字 | `Contents` |
| `def-cover-image` | 没有提供文章头图时，自动显示的头图。<br>可使用内置变量。 | `https://example.com/no-image.png?%rand` |

---

## 内置变量

部分参数允许使用内置变量。

| 项目 | 说明 | 例子 |
| ---- | ---- | ---- |
| `rand` | 一个随机数字，范围为 `0~10000000`。 | `%rand` `%{ rand }` |
| `base` | 博客首页地址。 | `%home` 将产生 `https://example.com` 这样的地址。 |
