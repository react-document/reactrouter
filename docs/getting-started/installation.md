---
title: 安装
order: 1
---

# 安装

本文档将介绍在 React 生态系统中利用各种工具使用 React Router 的最常见方式。

- [基本安装](#basic-installation)
- [Create React App](#create-react-app)
- [Parcel](#parcel)
- [Webpack](#webpack)
- [HTML Script Tags](#html-script-tags)

## 基本安装

大多数现代 React 项目使用[npm](https://www.npmjs.com/)或[Yarn](https://yarnpkg.com/)等包管理器来管理它们的依赖关系。要将 React Router 添加到现有项目中，您应该做的第一件事就是使用您选择的工具安装必要的依赖项：

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

按照 React 文档中的说明 [创建新的 React 应用](https://react.docschina.org/docs/create-a-new-react-app.html), 然后按照上面的 [基本安装](#basic-installation) 在项目中安装 React Router。

创建项目并将 React Router 作为依赖项安装后，请在文本编辑器中打开  `src/index.js` 文件。 在顶部导入 `react-router-dom` 中的 `BrowserRouter` 并包裹在 `<BrowserRouter>`标签中：

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

现在，可以在应用程序中的任何位置使用 React Router！举个简单的例子，打开 `src/App.js` 将一些默认标记替换为路由：

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

继续并通过运行 `npm start` 来启动应用, 当应用开始运行时，应会看到路由 `Home`。点击 "About"可以看到 `<About>` 路由的内容, 瞧！您已经成功通过使用 Create React App 安装了 React Router！ 🥳

当需要将应用部署到生产环境时，请务必按照  [Create React App 关于部署的文档介绍](https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing)，以确保您的服务器配置正确。

## Parcel

Follow the instructions in the [Parcel documentation to set up a new project](https://parceljs.org/getting_started.html), then follow [the installation instructions above](#basic-installation) to install React Router in your project.

In your project's `package.json`, add a `start` script so you can open your project in a browser during development.

```json [2]
"scripts": {
  "start": "parcel index.html"
}
```

Once the project is set up and your dependencies are installed, create a new `.babelrc` file at the root of your project:

```json
{
  "presets": ["@babel/preset-react"]
}
```

Go to the `index.js` file in your project and import the necessary functions from `react`, `react-dom`, and `react-router-dom` and mount a React app in a `div` with the ID of `root`:

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

In your `index.html`, create the root div in the document body above the script tag. It's also helpful to provide a `noscript` fallback message for users who may have disabled JavaScript, unless you plan on server-rendering your app later.

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

Now that React and React Router are set up create a new file `App.js` and add some routes and components:

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

Now start your app by running `npm start`, and you should see the `Home` route when your app starts running. Click the "About" link to see your `About` route, and voilà! You successfully set up React Router using Parcel! 🥳

## Webpack

Follow the instructions in the [webpack documentation to set up a new project](https://webpack.js.org/guides/getting-started/), then follow [the installation instructions above](#basic-installation) to install React Router in your project.

Setting up a new React project in webpack is a bit more involved than Parcel or Create React App. Because webpack is a low-level tool that allows you to fine-tune your build to your liking, you may want to read the [webpack documentation](https://webpack.js.org/) or check out [webpack configurations in other repos](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) to understand how to build your own.

Once you have webpack configured and the necessary dependencies installed, somewhere in your code (probably towards the root of your React component tree) you can `import` the modules you need from `react-router-dom`.

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

One of the quickest ways to add React and React Router to a website is to use good ol' `<script>` tags and global variables. React Router is compatible with React 16.8+. Just add the following `<script>` tags to your HTML, just before the closing `</body>` tag:

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

Although this method is a nice way to get up and running quickly, it does load some code that you may not make use of in your app. React Router is designed as a collection of many small components and functions that allow you to use as little of the library as you actually need.

In order to do this, you'll need to build your website with a JavaScript bundler like [Webpack](#webpack) or [Parcel](#parcel). The rest of the installation methods on this page describe how to get started using these tools.

<!--
## React Native

TODO:
-->
