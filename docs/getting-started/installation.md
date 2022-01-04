---
title: 安装
order: 1
---

# 安装

本文档将介绍在 React 生态系统中，利用各种工具来使用 React Router 的最常见方式。

- [基本安装](#basic-installation)
- [Create React App](#create-react-app)
- [Parcel](#parcel)
- [Webpack](#webpack)
- [HTML Script Tags](#html-script-tags)

## 基本安装

现在大多数 React 项目使用[ npm ](https://www.npmjs.com/)或[ Yarn ](https://yarnpkg.com/)等包管理器来管理它们的依赖关系。要将 React Router 添加到现有项目中，你应该做的第一件事就是使用你选择的打包工具，来安装必要的依赖项：

<details>
<summary>npm</summary>

```sh
$ npm install react-router-dom@6
```

</details>

<details>
<summary>Yarn</summary>

```sh
$ yarn add react-router-dom@6
```

</details>

<details>
<summary>pnpm</summary>

```sh
$ pnpm add react-router-dom@6
```

</details>

## Create React App

按照 React [创建新的 React 应用](https://react.docschina.org/docs/create-a-new-react-app.html)的文档说明，并按照上面的[基本安装](#basic-installation)，在项目中安装 React Router。

创建项目并将 React Router 作为依赖项安装后，请在代码编辑器中打开 `src/index.js` 。 在顶部导入 `react-router-dom` 中的 `BrowserRouter` 并将你的 App 组件包裹在 `<BrowserRouter>`标签中：

```js [3, 9-11]
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

现在，可以在应用程序中的任何位置使用 React Router ！举个简单的例子，打开 `src/App.js` 并将一些默认标记替换为路由的方式：

```js [2, 8-12]
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
```

现在，仍在 `src/App.js` 中，创建路由组件：

```js
// App.js
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
```

继续并通过运行 `npm start` 命令来启动应用，当应用开始运行时，可以看到 `Home` 路由的内容。点击 "About" 可以看到 `About` 路由的内容，瞧！你已经成功通过使用 Create React App 安装了 React Router！ 🥳

当需要将应用部署到生产环境时，请务必按照 [Create React App 关于部署的文档介绍](https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing)，以确保你的服务器配置正确。

## Parcel

按照 [Parcel 文档](https://parceljs.org/getting_started.html)的说明创建项目，然后根据上面的[基本安装](#basic-installation)的说明，在项目中安装 React Router。

在你的项目的 `package.json` 中的 scripts 命令中添加 `start` 脚本命令，以便在开发过程中可以在浏览器中打开项目

```json [2]
"scripts": {
  "start": "parcel index.html"
}
```

创建项目并且安装完依赖项后，在你的项目的根目录下创建一个新文件叫 `.babelrc` ：

```json
{
  "presets": ["@babel/preset-react"]
}
```

打开你的项目中的 `index.js` 并且从 `react` 、 `react-dom` 和 `react-router-dom` 中导入必要的函数，然后在 ID 为 `root` 的 `div` 上挂载 React 应用:

```js
// index.js
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

在 `index.html` 中，在 script 标签上面的 body 标签内创建根 div ，并且提供 `noscript` 标签，有利于帮助不支持脚本或已禁用脚本的浏览器显示备选内容，除非你计划稍后进行服务端渲染。

```html
<body>
  <noscript
    >You need to enable JavaScript to run this
    app.</noscript
  >
  <div id="root"></div>
  <script src="./index.js"></script>
</body>
```

现在 React 和 React Router 已经安装好了，创建一个新文件叫 `App.js` ，并添加一些路由和组件：

```js
// App.js
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1>Welcome to React Router!</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
```

现在，通过运行 `npm start` 命令来启动应用, 并且当应用开始运行时，可以看到 `Home` 路由的内容。点击 "About" 链接来查看 `About` 路由的内容，瞧！你已成功使用 Parcel 来创建 React Router！🥳

## Webpack

按照 [webpack 文档](https://webpack.js.org/guides/getting-started/)中的说明来创建一个新的项目, 然后按照上面的 [基本安装](#basic-installation)的说明在你的项目中安装 React Router。
 
在 webpack 中创建一个新的 React 项目比 Parcel 或 Create React App 更复杂一些。由于 webpack 是一个配置比较自由的工具，允许你根据自己的喜好微调构建，因此你可能需要阅读 [webpack 文档](https://webpack.js.org/)或查看[其他存储库中的  webpack 配置](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js)以了解如何构建自己的项目。

在你代码的某个地方（可能是 React 组件树中的根组件），一旦你配置了 webpack 并安装了必要的依赖项, 你可以在  `react-router-dom` 中 进行 `import` 来获取所需的模块。

```js
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Hello, React Router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

## HTML Script Tags

使用 `<script>` 标签和全局变量是将 React 和 React Router 添加到网站的最快方法之一。 React Router 与 React 16.8+ 相互兼容。只需在闭合标签 `</body>` 之前，将 `<script>` 添加到 HTML 中:

```html
  <!-- Other HTML for your app goes here -->

  <!-- The node we will use to put our app in the document -->
  <div id="root"></div>

  <!-- Note: When deploying to production, replace "development.js"
       with "production.min.js" in each of the following tags -->

  <!-- Load React and React DOM -->
  <!-- See https://reactjs.org/docs/add-react-to-a-website.html to learn more -->
  <script src="https://unpkg.com/react@>=16.8/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@>=16.8/umd/react-dom.development.js" crossorigin></script>

  <!-- Load history -->
  <script src="https://unpkg.com/history@5/umd/history.development.js" crossorigin></script>

  <!-- Load React Router and React Router DOM -->
  <script src="https://unpkg.com/react-router@6/umd/react-router.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-router-dom@6/umd/react-router-dom.development.js" crossorigin></script>

  <!-- A simple example app -->
  <script>
  var e = React.createElement;
  var Router = ReactRouterDOM.BrowserRouter;
  var Routes = ReactRouterDOM.Routes;
  var Route = ReactRouterDOM.Route;

  ReactDOM.render(
    (
      e(Router, null, (
        e(Routes, null, (
          e(Route, {
            element: e('div', null, 'Hello, React Router!')
          })
        ))
      ))
    ),
    document.getElementById('root')
  );
  </script>

</body>
```

尽管此方法是快速启动和运行的好方法，但它有可能会加载了一些你没有在应用程序中使用的代码。
React Router 被设计为许多小组件和函数的集合，允许你根据自己的实际需要去使用尽可能少的库。

为了做到这一点，你需要使用像[ Webpack ](#webpack) 或者[ Parcel ](#parcel)这样的 JavaScript 模块打包器来构建你的网站。本页上的其他安装方法介绍的是如何开始使用这些工具。

<!--
## React Native

TODO:
-->
