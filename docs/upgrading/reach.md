---
title: 从@reach/router 迁移
---

# 从 Reach Router 迁移到 React Router v6

<docs-info>本页面编写仍在进行中，请让我们了解到哪里还有缺失，这样我们就可以方便您更加丝滑的迁移！</docs-info>

## 介绍

当我们开始上手 React Router v6 的时候，从使用过 `@reach/router` 的用户视角出发，我们有如下目标:

- 保证 bundle 的大小足够小 (事实证明，我们打出来的包确实比 `@reach/router` 小)
- 保留 `@reach/router` 最优秀的部分 (如：嵌套路由、路径排名匹配、简约的API 以及 `navigate`)
- 升级为现代 React，使用常用的 API (比如 hooks)
- 为 Concurrent 模式以及 Suspense 提供最好的支持
- 停止不足够好的默认焦点管理方式

如果你曾经尝试过 `@reach/router` v2，它看起来其实与 React Router v6 非常相似。因此，下一版本的 `@reach/router` 其实就是 React Router v6。换句话说，将不会有 `@reach/router` v2，因为它和 React Router v6 简直一模一样。

将 `@reach/router` 1.3 和 React Router v6 相比较而言，它们有许多API其实是完全相同的:

- 路由排名和路由匹配
- 嵌套路由
- 相同的 `navigate` 标签
- 相同的 `Link` 标签
- 在1.3中所有的 hooks 都是相同的 (或者说是几乎相同)

绝大多数的变化都只不过是重新改了名字而已。如果你碰巧做了代码修改，请与我们分享，我们将会把它添加到这个指南中!

## 升级概览

在本指南中，我们将会向你展示如何升级每段路由代码。我们将会渐进的进行修改，因此你可以做一些更改、交付，以及之后当合适的时候进行返回迁移。我们还会探讨一些“为什么”要做这些改变，看似简单的重命名背后，实际上蕴含了巨大的思虑与考量。

### 第一步: 不跳跃更新

在迁移到 React Router v6 之前，我们强烈建议你在你的代码中做如下更新。这些更改不必一次性完成，你可以仅仅是更新了一行代码，然后提交、交付。当你在变化到 React Router v6 时，这些简单的操作将会起到事半功倍的效果。

1. 升级 React 到 16.8 或更高版本
2. 升级 `@reach/router` 到 v1.3
3. 更新使用 hooks 来访问路由组件的数据
4. 在应用顶部添加 `<LocationProvider/>` 

### 第二步: 跳跃更新

以下操作需要在你的应用中一次性完成：

<!-- 如果负担非常重, 我们将提供可复制/粘贴的包裹组件，并且hooks在每一部分都可以引入而不是通过同步升级你的应用代码来提供(TODO)-->

1. 升级 React Router 到 v6
2. 更新所有 `<Router>` 为 `<Routes>`
3. 更改 `<RouteElement default/>` 为 `<RouteElement path="*" />`
4. 修复 `<Redirect />`
5. 使用 hooks 实现 `<Link getProps />`
6. 更新使用 `useMatch`, params 使用 `match.params` 获取
7. 更改 `ServerLocation` 为 `StaticRouter`

## 不跳跃更新

### 升级到 React v16.8

React Router v6 中大量使用 [React
hooks](https://reactjs.org/docs/hooks-intro.html)，因此在尝试升级到 React Router v6 之前，你需要
升级 React 到 16.8 或更高的版本。

升级到了 React 16.8 之后，你需要重新部署你的应用，这样后续就可以发现所遗漏的部分。

### 升级到 `@reach/router` v1.3.3

你应该简单安装下 v1.3.3，然后部署你的应用。

```sh
npm install @reach/router@latest
```

### 使用 hooks 升级路由组件

你做这一步时，可以一次只完成一个路由组件、提交以及部署，你无需一次更新整个应用。

在 `@reach/router` v1.3 中，我们添加 hooks 来访问路由数据，来为升级到 React Router v6 做准备。如果你已经起先做了这些工作，后续当你升级到 React Router v6 时，你会发现只需要做很少的工作。

```jsx
// @reach/router v1.2
<Router>
  <User path="users/:userId/grades/:assignmentId" />
</Router>;

function User(props) {
  let {
    // route params从props获取
    userId,
    assignmentId,

    // location和navigate 也从props中获取
    location,
    navigate
  } = props;

  // ...
}

// @reach/router v1.3 and React Router v6
import {
  useParams,
  useLocation,
  useNavigate
} from "@reach/router";

function User() {
  // 所有的内容都来自特定的hooks
  let { userId, assignmentId } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  // ...
}
```

#### 理由

所有这些数据都已经存在于上下文中, 但对业务代码而言从上下文访问数据是很繁琐的，因此我们将其放到了 props 中。但 hooks 让基于上下文的获取数据变得十分简单，因此我们不再需要用 route 数据来污染你的 props。

不污染 props 也对 TypeScript 有一定的帮助，它可以防止你看到一个组件的时候就企图知道 props 的来源。如果你正在使用 router 获取数据，现在就变得十分清晰了。

此外, 随着页面业务逻辑的增长, 你很自然将其划分成多个不同的组件，结果"属性钻探"(prop drilling：所有的数据会基于树的结构一直钻探)的现象就会出现。现在，你可以在树的任何地方访问路由数据了。它不仅更加方便，而且可以使基于路由为中心的抽象组合成为可能。如果实现了一个自定义路由的hook，那么现在就可以简单的使用 `useLocation()` 了……

```sh
npm install react-router@6 react-router-dom@6
```

### 添加 LocationProvider

虽然在 `@reach/router` 中，应用的树顶层并不需要提供这样一个 Provider，但在 React Router v6 中却是需要的，所以现在不妨做好准备。

```jsx
// 之前
ReactDOM.render(<App />, el);

// 现在
import { LocationProvider } from "@reach/router";

ReactDOM.render(
  <LocationProvider>
    <App />
  </LocationProvider>,
  el
);
```

#### 理由:

`@reach/router` 使用了一个全局默认的 history 实例，这个实例在模块中具有副作用, 无论是否在全局中使用，它都无法进行 tree-shake 。此外，React Router 还提供了 `@reach/router` 所不具备的其他类型 (如：hash 方式)，因此它始终需要一个顶级的 location provider (在 React Router 中，使用 `<BrowserRouter/>` 而变得更加友好)。

除此之外, 诸如 `Router`、 `Link` 以及 `useLocation` 等多种类型的外侧设置一个 `<LocationProvider/>` ，便可以设置自己 URL 来进行监听。这虽然不是一个问题，但每一点都十分重要。在顶部设置一个 `<LocationProvider />` ，可以让应用具有一个单独的 URL 进行监听。

## 跳跃更新

下一组的更新需要一次性全部完成，但好在大部分都只是简单的重命名而已。

这里你可以“耍个花招”，即：当你迁移时这两个路由同时使用，但你绝不应该在这种状态下发布你的应用，因为他们是不可互操作的。你会发现，其中的一个 link 并不会对另外一个 link 起作用，但在进行更改并刷新页面时却能正确执行。

### 安装 React Router v6

```sh
npm install react-router@next
```

### 升级 `LocationProvider` 到 `BrowserRouter`

```jsx
// @reach/router
import { LocationProvider } from "@reach/router";

ReactDOM.render(
  <LocationProvider>
    <App />
  </LocationProvider>,
  el
);

// React Router v6
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
```

### 更改 `Router` 为 `Routes`

你可能需要更改的不只一个，但在你的应用最上层通常只有一个。如果你有多个，那你就需要为每个都进行修改。

```jsx
// @reach/router
import { Router } from "@reach/router";

<Router>
  <Home path="/" />
  {/* ... */}
</Router>;

// React Router v6
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  {/* ... */}
</Routes>;
```

### 更新 `default` 路由属性

在没有其他路由匹配时， `@reach/router` 中的 `default` 属性通常用来作为默认值。在 React Router v6 中，你可以使用通配符来处理。

```jsx
// @reach/router
<Router>
  <Home path="/" />
  <NotFound default />
</Router>

// React Router v6
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### `<Redirect/>`、`redirectTo`、`isRedirect`

哈...重量升级来了！请耐心阅读，不要吐槽我们的设计。

我们已经删除了 React Router 中的重定向功能，这意味着不再有 `<Redirect/>`、`redirectTo` 或者 `isRedirect`，并且也没有替代的API。 请继续阅读 😅

不要将重定向与导航(用户与你的应用交互的导航)混淆，导航的响应在用户的交互中仍然是需要的。当我们讨论重定向时，我们其实讨论的是匹配时的重定向：

```jsx
<Router>
  <Home path="/" />
  <Users path="/events" />
  <Redirect from="/dashboard" to="/events" />
</Router>
```

在 `@reach/router` 中，重定向的工作有点儿实验性质，它“抛出”重定向方法，并且通过 `componentDidCatch` 的方法捕获。这看起来十分酷炫，因为它可以导致整个渲染树的停止，并且在新的位置重新启动。很多年前，当我们首次发布这个项目时候，与 React 团队的讨论促使我们想要尝试一下这个思路。

在一些 issues (如：在应用程序级别上需要重新发布重定向)的启发下，我们决定在 React Router v6 中不再这么使用。

但我们其实思虑的更加深远一些，并且得出如下结论：重定向实际上并不是 React Router 的工作。你的动态 web 服务器或者静态文件服务器其实更应该处理这些问题，并且返回一个合适的状态码，如：301或302。

通过 React Router 进行匹配以实现重新定向有两种情况：1、复杂的一种情况，需要对你的服务器和路由进行重新配置；2、简单的一种情况是只需在React Router上操作，无需发送状态码。

我们经常使用 firebase 托管，因此，下面我们以更新其中一个应用为例：

```jsx
// @reach/router
<Router>
  <Home path="/" />
  <Users path="/events" />
  <Redirect from="/dashboard" to="/events" />
</Router>
```

```jsx
// React Router v6
// firebase.json 配置文件
{
  // ...
  "hosting": {
    "redirects": [
      {
        "source": "/dashboard",
        "destination": "/events",
        "type": 301
      }
    ]
  }
}
```

无论是作为一个 SSR 的 serverless 函数使用，还是我们仅仅将其作为一个静态服务端文件使用，这都是有效的，并且所有 Web 托管服务都提供了一种配置此服务的方法。
#### 点击未更新的链接会怎么样?

如果你的应用仍然存在一个 `<Link to="/events" />` 并且随意放置，用户点击它之后，由于你使用的是一个客户端路由，服务端并未参与。你将需要
更加努力的更新你的链接 😬。

或者, 如果你想要过时的链接，**并且你意识到你需要在客户端侧和服务端侧都配置重定向**，那么请复制/粘贴 `Redirect` 组件，该组件将会先被发布但随后就会被废弃掉。

```jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

// 使用
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/events" element={<Users />} />
  <Route
    path="/dashboard"
    element={<Redirect to="/events" />}
  />
</Routes>;
```

#### 理由

我们认为，不提供任何的重定向API，开发者将更有可能正确的配置它们。多年来，我们一直在不小心纵容这些不良习惯，但我们更希望开发者们能不这么使用 🙈。

### `<Link getProps />`

这种属性获取方法对将样式 link 设置为 “active” 十分有用，判断一个 link 是否是 active 一直都是一种主观行为。激活 link 的情形有许多：1、URL 精确匹配时；2、URL 部分匹配时；3、在其他边界条件下，如：搜索参数或者位置参数等，这些都希望可以做到。

```jsx
// @reach/router
function SomeCustomLink() {
  return (
    <Link
      to="/some/where/cool"
      getProps={obj => {
        let {
          isCurrent,
          isPartiallyCurrent,
          href,
          location
        } = obj;
        // 做你想做的
      }}
    />
  );
}

// React Router
import { useLocation, useMatch } from "react-router-dom";

function SomeCustomLink() {
  let to = "/some/where/cool";
  let match = useMatch(to);
  let { isExact } = useMatch(to);
  let location = useLocation();
  return <Link to={to} />;
}
```

来让我们看一下更加不太一般的例子吧：

```jsx
// 当 URL 的 link 的 href 属性被精确匹配时，一个自定义 nav link 被激活

// @reach/router
function ExactNavLink(props) {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "active" } : {};
  };
  return <Link getProps={isActive} {...props} />;
}

// React Router v6
function ExactNavLink(props) {
  return (
    <Link
      // 如果你需要一个样式的激活状态而不是重写
      // 默认的 isActive 状态, 我们在函数中提供了一个
      // 命名的参数可以通过
      // `className` 或 `style` 属性被传递
      className={({ isActive }) =>
        isActive ? "active" : ""
      }
      {...props}
    />
  );
}

// 当前匹配的是路由本身或者其深层路由，这个 link 便是激活的

// @reach/router
function PartialNavLink(props) {
  const isPartiallyActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent
      ? { className: "active" }
      : {};
  };
  return <Link getProps={isPartiallyActive} {...props} />;
}

// React Router v6
function PartialNavLink(props) {
  // 添加通配符来匹配深层的 URL
  let match = useMatch(props.to + "/*");
  return (
    <Link className={match ? "active" : ""} {...props} />
  );
}
```

#### 理由

Prop getters 的方法是十分笨重的，几乎都可以使用 hooks 来进行替换。这还允许您使用其他钩子，例如： `useLocation`，通过一个搜索的字符串来激活连接，并执行更多自定义操作：

```jsx
function RecentPostsLink(props) {
  let match = useMatch("/posts");
  let location = useLocation();
  let isActive =
    match && location.search === "?view=recent";
  return (
    <Link className={isActive ? "active" : ""}>Recent</Link>
  );
}
```

### `useMatch`

在 React Router v6 中，`useMatch` 略有不同。

```jsx
// @reach/router
let {
  uri,
  path,

  // 用 uri 和 path 的对象来进行合并参数
  eventId
} = useMatch("/events/:eventId");

// React Router v6
let {
  url,
  path,

  // 参数获取他们自己的 key 来进行匹配
  params: { eventId }
} = useMatch("/events/:eventId");
```

另外，请注意 `uri -> url` 的更改

#### 理由

通过参数区分 URL 和 path 仅仅是觉得更加清晰一些而已。

并且，并没有人真正的了解 URL 和 URI 之间的真正区别, 因此我们并不想纠结于其咬文嚼字的争论。React Router 中常常称其为 URL，而且它也已经有了很多工业实践，因此我们使用 URL 而不是 URI。

### `<Match />`

在 React Router v6 中，将不会有 `<Match/>` 组件。过去，它使用 render props 来组合行为，但是现在，我们已经有了 hooks 的方案。

如果你真的喜欢它，或者不想更改你的代码，我们常常使用此方法来移植:

```jsx
function Match({ path, children }) {
  let match = useMatch(path);
  let location = useLocation();
  let navigate = useNavigate();
  return children({ match, location, navigate });
}
```

#### 理由

render props 的方法着实有点儿恶心 (呕!)，现在我们都用 hooks 了。

### `<ServerLocation />`

这里仅仅是做了重命名：

```jsx
// @reach/router
import { ServerLocation } from "@reach/router";

createServer((req, res) => {
  let markup = ReactDOMServer.renderToString(
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  req.send(markup);
});

// React Router v6
// 注意使用 import 的方法从 react-router-dom/server 中获取!
import { StaticRouter } from "react-router-dom/server";

createServer((req, res) => {
  let markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  req.send(markup);
});
```

## 反馈！

请让我们知道本指南是否有帮助:

**提交PR**: 请添加我们不曾涉及但您所需要的任何迁移

**一般反馈**: 在推特上 [@remix_run](https://twitter.com/remix_run) 私聊, 或者发邮件到 [hello@remix.run](mailto:hello@remix.run)

感谢!
