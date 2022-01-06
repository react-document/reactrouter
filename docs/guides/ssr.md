---
title: 服务端渲染
toc: false
order: 6
---

# 服务端渲染(Server-Side Rendering)

在最基本的服务端渲染中使用 React Router 是非常简单的。但是，你不能仅仅局限于能够渲染出正确的路由，还需要思考很多细节。以下列出了部分需要你去处理的事情：

- 分别打包服务端和客户端的代码
- 不要将仅在服务端运行的代码打包到客户端代码中
- 适用于服务端和客户端的代码分割(Code splitting)
- 服务端数据加载，这样就可以渲染(render)一些内容
- 适用于客服端和服务端的数据加载策略
- 处理好在服务端和客户端的代码分割(Code splitting)
- 正确的 HTTP 状态码和重定向
- 环境变量和密钥
- 部署

能够处理好上述几点是特别困难的。但是，冲着只有服务端渲染能够实现的卓越性能和用户体验，你做这些处理是值得的。

如果你想在你的 React Router 应用中实现服务端渲染，我们强烈推荐你使用 [Remix](https://remix.run)。这是我们的另外一个项目，它是基于 React Router 创建的。它能够解决包括但不仅限于上述的所有问题。尝试一下！

如果你想自己解决这个问题，你需要在服务端使用`<StaticRouter>`

首先，你需要在服务端和客户端渲染一个类似“app”或者“root”的组件：

```js filename=App.js
export default function App() {
  return (
    <html>
      <head>
        <title>Server Rendered App</title>
      </head>
      <body>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
        <script src="/build/client.entry.js" />
      </body>
    </html>
  );
}
```

服务端有一个用 express 实现的简单的服务器，它负责渲染我们的应用。注意在这里我们使用的是 `StaticRouter` 。

```js filename=server.entry.js
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

let app = express();

app.get("*", (req, res) => {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  res.send("<!DOCTYPE html>" + html);
});

app.listen(3000);
```

最后，你需要在类似的 JavaScript 文件中引入同一个 `App` 组件，去“激活(hydrate)”你的应用。注意这里我们使用的是 `BrowserRouter` ，而不是`StaticRouter`

```js filename=client.entry.js
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.documentElement
);
```

`server.entry.js` 和 `client.entry.js` 真正的区别如下：

- 使用的是 `StaticRouter`，而不是 `BrowserRouter`。
- 把来自服务端的 URL 传递到 `<StaticRouter url>` 中。
- 使用的是 `ReactDOMServer.renderToString`，而不是 `ReactDOM.render`。

要使其正常运行，你需要自己完成以下部分：

- 分别打包运行在浏览器和服务端的代码。
- 注意在 `<App>` 组件里，引入 client.entry.js 的 `<script>` 标签所在的位置。
- 弄清数据加载（尤其是 `<title>` 标签的内容）。

我们再次推荐你看一下[Remix](https://remix.run)。它是在 React Router 应用中实现服务端渲染的最佳方式。说不定它也是构建任何 React 应用的最佳方式 😉。
