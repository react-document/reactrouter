---
title: 主要概念
order: 4
---

# 主要概念

<docs-warning>本文档深入探讨了在 React Router 中路由实现的核心概念。全文较长，所以如果您正在寻找更实用的指南，请查看我们的 [快速入门教程](tutorial.md).</docs-warning>

可能想知道 React Router 到底做了什么。它如何帮助您构建应用程序？ **路由** 到底是什么？

如果您也有碰到过这些问题，或者您只想深入了解路由的基本部分，那么您来对地方了。 本文档包含在 React Router 中实现的路由背后的所有核心概念的详细解释。

不要担心看不懂本文档！对于日常使用来说，React Router 非常简单。你并不需要深入学习。

React Router 不仅仅是将 url 与函数或组件匹配：它是关于构建一个映射到 URL 的完整用户界面，因此它可能包含比您习惯的更多概念。我们将详细介绍 React Router 的三个主要功能：

1. 订阅和操作 [history stack](#history-stack)
2. 匹配 [URL](#url)  [routes](#route-config)
3. 根据路由的匹配[route matches](#matches) 来构建用户界面

## 定义

首先有一些定义，在前后端框架中有着不同的含义，有的时候一个词用在不同的上下文中也会有不同的含义。

以下是我们在谈论 React Router 中的一些常用词。本指南的其余部分将详细介绍他们。

- <a id="url">**URL**</a> - 地址栏中的 URl。 很多人把 "URL" and "route" 混用 , 但是在 React Router 中, URL 并不是路由，它只是一个 URL 。

- <a id="location">**Location**</a> - 这是基于内置浏览器的 `window.location` 对象的 React Router 特定对象.它代表“用户在哪里”。它主要是 URL 的对象表示，但比这更多。

- <a id="location-state">**Location State**</a> -与未在 [URL](#url) 中编码的 [location](#location) 保持一致的值。很像哈希或搜索参数（在 URL 中编码的数据），但不可见地存储在浏览器的内存中。

- <a id="history-stack">**History Stack**</a> - 当用户导航时，浏览器会跟踪堆栈中的每个 [location](#location)。如果您在浏览器中单击并按住后退按钮，您可以在那里看到浏览器的历史堆栈。

- <a id="csr">**Client Side Routing (CSR)**</a> - 一个纯 HTML 文档可以链接到其他文档，并且浏览器自己处理 [历史堆栈](#history-stack)。客户端路由使开发人员能够操作浏览器历史堆栈，而无需向服务器发出文档请求。
- <a id="history-object">**History**</a> - 一个对象，它允许 React Router 订阅 [URL](#url) 中的更改，并提供 API 以编程方式操作浏览器 [历史堆栈](#history-stack)。

- <a id="history-action">**History Action**</a> - `POP`、`PUSH` 或 `REPLACE` 之一。由于这三个原因之一，用户可以到达 [URL](#url)。将新条目添加到历史堆栈时的推送（通常是链接单击或程序员强制导航）。替换类似，只是它替换堆栈上的当前条目而不是推送新条目。最后，当用户单击浏览器 chrome 中的后退或前进按钮时，会发生弹出

- <a id="segment">**Segment**</a> - `/` 字符之间的 [URL](#url) 或 [path pattern](#path-pattern) 的一部分。例如，“/users/123”有两个段。

- <a id="path-pattern">**Path Pattern**</a> - 这些看起来像 URL，但可以包含用于将 URL 匹配到路由的特殊字符，例如 **动态段** (`"/users/:userId"`) 或 **星段** (`"/docs/*"`) .它们不是 URL，它们是 React Router 将匹配的模式。

- <a id="dynamic-segment">**Dynamic Segment**</a> - 动态路径模式的一段，这意味着它可以匹配该段中的任何值。例如，模式`/users/:userId`将匹配像`/users/123`这样的URL

- <a id="url-params">**URL Params**</a> - URL 中与 [动态段](#dynamic-segment) 匹配的解析值。

- <a id="router">**Router**</a> - 使所有其他组件和挂钩工作的有状态的顶级组件

- <a id="route-config">**Route Config**</a> - 一棵**路由对象**树，将针对当前位置进行排名和匹配（使用嵌套）以创建**路由匹配**的分支。

- <a id="route">**Route**</a> - 一个对象或路由元素，通常具有 { path, element } 或 <Route path element> 的形状。路径是路径模式。当路径模式与当前 URL 匹配时，将呈现该元素。

- <a id="route-element">**Route Element**</a> - Or `&lt;Route>`. <Routes> 读取该元素的 props 以创建路由，否则什么也不做。

- <a id="nested-routes">**Nested Routes**</a> - 因为路由可以有子路由，并且每个路由都定义了 [URL](#url) 到 [segments](#segment) 的一部分，所以单个 URL 可以匹配树的嵌套“分支”中的多个路由。这可以通过 [outlet](#outlet)、[relative links](#relative-links) 等实现自动布局嵌套。

- <a id="relative-links">**Relative links**</a> - 不以 `/` 开头的链接将继承渲染它们的最近路径。这使得链接到更深层的 URL 变得容易，而无需知道和构建整个路径。

- <a id="match">**Match**</a> -当路由匹配 URL 时保存信息的对象，例如匹配的 [url params](#url-params) 和路径名。

- <a id="matches">**Matches**</a> - 与当前 [location](#location) 匹配的路由数组（或 [route config](#route-config) 的分支）。此结构启用 [嵌套路由](#nested-routes)。

- <a id="parent-route">**Parent Route**</a> - 带有子路由的路由

- <a id="outlet">**Outlet**</a> -在一组 [matches](#match) 中呈现下一个匹配项的组件。


- <a id="index-route">**Index Route**</a> - 没有路径的子路由，在父 [URL](#url) 的父 [outlet](#outlet) 中呈现。

- <a id="layout-route">**Layout Route**</a> -没有路径的**父路由**，专门用于在特定布局内对子路由进行分组。
## History and Locations

在 React Router 做任何事情之前，它必须能够订阅浏览器 [history stack](#history-stack) 中的更改。

当用户浏览时，浏览器维护自己的历史堆栈。这就是后退和前进按钮的工作方式。在传统网站（没有 JavaScript 的 HTML 文档）中，每次用户单击链接、提交表单或单击后退和前进按钮时，浏览器都会向服务器发出请求。

例如，考虑用户：

1. clicks a link to `/dashboard`
2. clicks a link to `/accounts`
3. clicks a link to `/customers/123`
4. clicks the back button
5. clicks a link to `/dashboard`

历史堆栈将更改如下，其中 **加粗** 的条目表示当前的 [URL](#url)：

1. **`/dashboard`**
2. `/dashboard`, **`/accounts`**
3. `/dashboard`, `/accounts`, **`/customers/123`**
4. `/dashboard`, **`/accounts`**, `/customers/123`
5. `/dashboard`, `/accounts`, **`/dashboard`**

### History Object

借助**客户端路由**，开发人员能够以编程方式操作浏览器 [历史堆栈](#history-stack)。例如，我们可以编写一些这样的代码来更改 [URL](#url)，而不需要浏览器向服务器发出请求的默认行为

```jsx
<a
  href="/contact"
  onClick={event => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault();
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact");
  }}
/>
```

<docs-warning>这里仅做说明, 不要在 React Router 中直接使用 `window.history.pushState` </docs-warning>

此代码更改 [URL](#url) 但不会对 UI 执行任何操作。 我们需要编写更多代码来更改某处的某些状态，来更改相关页面的 UI 。 问题是，浏览器没有给我们一种“监听 URL”和订阅这样的变化的方法。

嗯，这并不完全正确。我们可以通过 [pop](#history-actions) 事件监听 URL 的变化

```jsx
window.addEventListener("popstate", () => {
  // URL changed!
});
```

但这仅在用户单击后退或前进按钮时触发。当程序员调用`window.history.pushState`或`window.history.replaceState`时没有事件。

这就是 React Router 特定的“history”对象发挥作用的地方。 它提供了一种方法来“侦听 [URL](#url)”更改 [history action](#history-actions) 是 **push**、**pop** 还是 **replace**。

```js
let history = createBrowserHistory();
history.listen((location, action) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
});
```

应用程序不需要设置自己的历史对象——这是`<Router>`的工作。 它设置这些对象之一，订阅[历史堆栈]（#history-stack）中的更改， 最后在 [URL](#url) 更改时更新其状态。 这会导致应用重新渲染并显示正确的 UI 。唯一需要做的事情就是在state 中放置一个 `location`，其他的都是从这个对象中获取的。

### Locations


浏览器在 `window.location` 上有一个 location 对象。 这个对象上含有 [URL](#url) 的信息，和一些改变 url 的方法：

```js
window.location.pathname; // /getting-started/concepts/
window.location.hash; // #location
window.location.reload(); // force a refresh w/ the server
// and a lot more
```

<docs-warning>用于说明。你通常不会在 React Router 应用程序中使用 `window.location`</docs-warning>

React Router 具有自己的  [location](#location) 来代替 `window.location`，使用起来更加简单。如下：


```js
{
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",
  state: null,
  key: "aefz24ie"
}
```

前三个：`{ pathname, search, hash }` 与 `window.location` 完全一样。如果您将这三个相加，您将获得用户在浏览器中看到的 [URL](#url)：

```js
location.pathname + location.search + location.hash;
// /bbq/pig-pickins?campaign=instagram#menu
```

最后两个，`{ state, key }`，是 React Router 特有的属性。

**Location Pathname**

Location Pathname 是 [URL](#url) 一个原始部分, 所以对于`https://example.com/teams/hotspurs`，路径名是`/teams/hostspurs`。这是路线匹配的位置的唯一部分。

**Location Search**

人们对 [URL] 的这一部分使用了很多不同的术语(#url):

- location search
- search params
- URL search params
- query string

在 React Router 中，我们称之为 "location search"。 但是, location search 是 [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)的序列化版本。 所以有时我们也可以称它为 “URL search params”。

```js
// given a location like this:
let location = {
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram&popular=true",
  hash: "",
  state: null,
  key: "aefz24ie"
};

// we can turn the location.search into URLSearchParams
let params = new URLSearchParams(location.search);
params.get("campaign"); // "instagram"
params.get("popular"); // "true"
params.toString(); // "campaign=instagram&popular=true",
```
精确时，将序列化的字符串版本称为“search”，将解析后的版本称为“search params”，但是当精度不重要时，通常可以互换使用这些术语。

**Location Hash**

我们可以使用哈希表示当前页面的滚动位置。 在引入 `window.history.pushState` API 之前, Web 开发人员专门使用 [URL](#url) 的哈希部分进行客户端路由，这是我们唯一可以在不向服务器发出新请求的情况下操作的部分。但是，今天我们可以将其用于其设计目的。

**Location State**

您可能想知道为什么 `window.history.pushState()` API 被称为  "push state". State? 我们不只是更改 [URL](#url) 吗？不应该是`history.push`吗？好吧，设计 API 时我们并不在房间里，所以我们不确定为什么“state”是焦点，但它仍然是浏览器的一个很酷的特性。
浏览器让我们通过将值传递给`pushState`来保存有关转换的信息。当用户单击返回时，`history.state` 上的值会更改为之前“推送”的值。

```js
window.history.pushState("look ma!", undefined, "/contact");
window.history.state; // "look ma!"
// user clicks back
window.history.state; // undefined
// user clicks forward
window.history.state; // "look ma!"
```

<docs-warning>For illustration. You don't read `history.state` directly in React Router apps</docs-warning>

React Router 利用这个浏览器特性，将其抽象化，并在“location”而不是“history”上显示值。


您可以像 `location.hash` 或 `location.search` 一样考虑`location.state`，除了将值放在 [URL](#url) 中之外，它是隐藏的——就像 URL 的超级秘密片段程序员知道。

location state 几个很好的用例：

- 告诉下一页用户来自哪里并分支 UI。这里最流行的实现是如果用户单击网格视图中的项目，则在模式中显示记录，但如果他们直接显示到 URL，则在其自己的布局中显示记录（pinterest，旧 instagram）。
- 将列表中的部分记录发送到下一个屏幕，以便它可以立即渲染部分数据，然后再获取其余数据。

你可以通过两个方式设置 location state : 在 `<Link>` 或者 `navigate`上:

```jsx
<Link to="/pins/123" state={{ fromDashboard: true }} />;

let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

在下一页你可以访问通过 `useLocation` 访问:

```jsx
let location = useLocation();
location.state;
```

<docs-info>Location state 的会被序列化, 所以像`new Date()`这样的值会被转化为一个字符串。</docs-info>

**Location Key**

每一个 location 会有唯一的Key。 这对于基于位置的滚动管理、客户端数据缓存等高级案例很有用。因为每个新位置都有一个唯一的键，所以您可以构建将信息存储在普通对象、`new Map()` 甚至`locationStorage` 中的抽象。

例如，一个非常基本的客户端数据缓存可以通过位置键（和 fetch [URL](#url)）存储值，并在用户点击返回时跳过获取数据：

```jsx
let cache = new Map();

function useFakeFetch(URL) {
  let location = useLocation();
  let cacheKey = location.key + URL;
  let cached = cache.get(cacheKey);

  let [data, setData] = useState(() => {
    // initialize from the cache
    return cached || null;
  });

  let [state, setState] = useState(() => {
    // avoid the fetch if cached
    return cached ? "done" : "loading";
  });

  useEffect(() => {
    if (state === "loading") {
      let controller = new AbortController();
      fetch(URL, { signal: controller.signal })
        .then(res => res.json())
        .then(data => {
          if (controller.aborted) return;
          // set the cache
          cache.set(cacheKey, data);
          setData(data);
        });
      return () => controller.abort();
    }
  }, [state, cacheKey]);

  useEffect(() => {
    setState("loading");
  }, [URL]);

  return data;
}
```

## Matching

在初始渲染时，当 [history stack](#history-stack) 发生变化时，React Router 会将 [location](#location) 与您的 [route config](#route-config) 进行匹配以得出一个集合的 [matches](#match) 进行渲染。

### Defining Routes

A route config is a tree of [routes](#route) that looks something like this:

```js
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

`<Routes>` 组件通过它的 `props.children` 进行递归，剥离它们的 props，并生成一个像这样的对象：

```js
let routes = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "teams",
        element: <Teams />,
        children: [
          {
            index: true,
            element: <LeagueStandings />
          },
          {
            path: ":teamId",
            element: <Team />
          },
          {
            path: ":teamId/edit",
            element: <EditTeam />
          },
          {
            path: "new",
            element: <NewTeamForm />
          }
        ]
      }
    ]
  },
  {
    element: <PageLayout />,
    children: [
      {
        element: <Privacy />,
        path: "/privacy"
      },
      {
        element: <Tos />,
        path: "/tos"
      }
    ]
  },
  {
    element: <Contact />,
    path: "/contact-us"
  }
];
```

事实上，你可以使用钩子 `useRoutes(routesGoHere)` 来代替 `<Routes>`。这就是 `<Routes>` 所做的一切。

如您所见，路由可以定义多个 [segments](#segment)，如 `:teamId/edit`，或仅定义一个，如 `:teamId`。 [route config](#route-config) 的分支下的所有段被添加在一起，以创建最终的 [path pattern](#path-pattern) 路线。

### Match Params

注意 `:teamId` 段。这就是我们所说的 [路径模式](#path-pattern) 的 [动态段](#dynamic-segment)，这意味着它不静态匹配 URL（实际字符），但它动态匹配它。 `:teamId` 可以填写任何值。 `/teams/123` 或 `/teams/cupcakes` 都将匹配。我们将解析后的值称为 [URL 参数](#url-params)。所以在这种情况下，我们的 `teamId` 参数将是 `"123"` 或 `"cupcakes"`。我们将在 [Rendering](#rendering) 部分了解如何在您的应用中使用它们。

### Ranking Routes

如果我们将 [route config](#route-config) 的所有分支的所有段相加，我们最终会得到我们的应用程序响应的以下路径模式：

```js
[
  "/",
  "/teams",
  "/teams/:teamId",
  "/teams/:teamId/edit",
  "/teams/new",
  "/privacy",
  "/tos",
  "/contact-us"
];
```

现在这是事情变得非常有趣的地方。考虑 [URL](#url) `/teams/new`。该列表中的哪个模式与 URL 匹配？

没错，就是两个！

```
/teams/new
/teams/:teamId
```

React Router 必须在这里做出决定，只能有一个。许多路由器，包括客户端和服务器端，将简单地按照定义的顺序处理模式。最先匹配的获胜。在这种情况下，我们将匹配 `/` 并渲染 `<Home/>` 组件。绝对不是我们想要的。这些类型的路由器要求我们完美地排序我们的路由以获得预期的结果。这就是 React Router 在 v6 之前的工作方式，但现在它更智能了。

查看这些模式，您直观地知道我们希望 `/teams/new` 匹配 URL `/teams/new`。这是一个完美的匹配！ React Router 也知道这一点。匹配时，它会根据路段数、静态路段、动态路段、星形模式等对您的路线进行排名，并选择最具体的匹配项。您永远不必考虑订购路线。

### Pathless Routes

You may have noticed the weird routes from earlier:

```jsx
<Route index element={<Home />} />
<Route index element={<LeagueStandings />} />
<Route element={<PageLayout />} />
```

连路都没有，怎么可能是路？这就是 React Router 中“路由”一词的使用非常松散的地方。 `<Home/>` 和 `<LeagueStandings/>` 是 [index routes](#index-route) 并且 `<PageLayout/>` 是 [layout route](#layout-route)。我们将在 [Rendering](#rendering) 部分讨论它们是如何工作的。两者都与匹配没有太大关系。

### Route Matches

当路由匹配 URL 时，它由 [match](#match) 对象表示。 `<Route path=":teamId" element={<Team/>}/>` 的匹配项如下所示：

```js
{
  pathname: "/teams/firebirds",
  params: {
    teamId: "firebirds"
  },
  route: {
    element: <Team />,
    path: ":teamId"
  }
}
```

`pathname` 保存与该路由匹配的 URL 部分（在我们的例子中就是全部）。 `params` 保存来自任何匹配的 [动态段](#dynamic-segment) 的解析值。请注意，参数的对象键直接映射到段的名称：`:teamId` 变为 `params.teamId`。

因为我们的路由是一棵树，所以单个 URL 可以匹配树的整个分支。考虑 URL `/teams/firebirds`，它将是以下路由分支：

```jsx [2,4,5]
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```


React Router 将根据这些路由和 url 创建一个 [matches](#match) 数组，以便它可以呈现与路由嵌套匹配的嵌套 UI。

```js
[
  {
    pathname: "/",
    params: null,
    route: {
      element: <App />,
      path: "/"
    }
  },
  {
    pathname: "/teams",
    params: null,
    route: {
      element: <Teams />,
      path: "teams"
    }
  },
  {
    pathname: "/teams/firebirds",
    params: {
      teamId: "firebirds"
    },
    route: {
      element: <Team />,
      path: ":teamId"
    }
  }
];
```

## Rendering


最后一个概念是渲染。考虑到您的应用程序的条目如下所示：

```jsx
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
      </Route>
      <Route path="contact-us" element={<Contact />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
```

让我们再次使用 `/teams/firebirds` URL 作为示例。`<Routes>` 会将 [location](#location) 匹配到你的 [route config](#route-config)，得到一组 [matches](#match)，然后像这样渲染一个 React 元素树：

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

在父路由元素内渲染的每个匹配都是一个非常强大的抽象。 大多数网站和应用程序都具有此特征: 层层嵌套, 每个都有一个导航部分，可以更改页面的子部分。

### Outlets

这个嵌套的元素树不会自动发生。 `<Routes>` 将为你呈现第一个匹配的元素（在我们的例子中是`<App/>`）。下一场比赛的元素是`<Teams>`。为了渲染它，`App` 需要渲染一个 [outlet](#outlet)。

```jsx [5]
function App() {
  return (
    <div>
      <GlobalNav />
      <Outlet />
      <GlobalFooter />
    </div>
  );
}
```

`Outlet` 组件将始终呈现下一个匹配项。这意味着`<Teams>` 也需要一个 outlet 来渲染`<Team/>`。

如果 URL 是 `/contact-us`，则元素树将更改为：

```jsx
<ContactForm />
```

因为联系表单不在主`<App>` 路由下。

如果 URL 是 `/teams/firebirds/edit`，则元素树将更改为：

```jsx
<App>
  <Teams>
    <EditTeam />
  </Teams>
</App>
```

插座将子路由替换为匹配的新的子路由，但父路由布局仍然存在。这很微妙，但在清理组件方面非常有效。


### Index Routes

Remember the [route config](#route-config) for `/teams`:
记住`/teams`的[路由配置](#route-config)：

```js
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
  <Route path="new" element={<NewTeamForm />} />
  <Route index element={<LeagueStandings />} />
</Route>
```

如果 URL 是 `/teams/firebirds`，元素树将是：

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

但是如果 URL 是 `/teams`，元素树将是：

```jsx
<App>
  <Teams>
    <LeagueStandings />
  </Teams>
</App>
```

联赛积分榜？ `<Route index element={<LeagueStandings>}/>` 到底是怎么出现的？连路都没有！原因是它是 [index route](#index-route)。索引路由在其父路由路径的 [outlet](#outlet) 中呈现。

这样想，如果你不在子路由的路径之一，`<Outlet>` 将不会在 UI 中呈现任何内容

```jsx
<App>
  <Teams />
</App>
```

如果所有团队都在左侧的列表中，那么空出口意味着您在右侧有一个空白页面！你的 UI 需要一些东西来填补空间：索引路线来救援。

考虑索引路由的另一种方式是，当父路由匹配但其子路由都不匹配时，它是默认子路由。

考虑索引路由的另一种方式是，当父路由匹配但其子路由都不匹配时，它是默认子路由。

根据用户界面，您可能不需要索引路由，但如果父路由中有任何类型的持久导航，您很可能希望索引路由在用户未单击其中一项时填充空间然而。

### Layout Routes


这是我们尚未匹配的路由配置的一部分：`/privacy`。让我们再次查看路由配置，突出显示匹配的路由


```jsx [2,11,12]
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

渲染的结果元素树将是：

```jsx
<App>
  <PageLayout>
    <Privacy />
  </PageLayout>
</App>
```

`PageLayout` 路由确实很奇怪。我们称它为 [layout route](#layout-route) 因为它根本不参与匹配（尽管它的子节点参与）。它的存在只是为了使在同一布局中包装多个子路由更简单。如果我们不允许这样做，那么您必须以两种不同的方式处理布局：有时您的路线会为您完成，有时您需要手动完成，并在整个应用程序中重复大量布局组件。

<docs-error>您可以这样做，但我们建议使用布局路线</docs-error>

```jsx bad lines=[14-16,22-24]
<Routes>
  <Routes path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route
    path="/privacy"
    element={
      <PageLayout>
        <Privacy />
      </PageLayout>
    }
  />
  <Route
    path="/tos"
    element={
      <PageLayout>
        <Tos />
      </PageLayout>
    }
  />
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

所以，是的，布局“路由”的语义有点傻，因为它与 URL 匹配无关，但它太方便了，不能禁止。

所以，是的，布局“路由”的语义有点愚蠢，因为它与 URL 匹配无关，但它太方便了，无法禁止

## Navigating

当 [URL](#url) 改变时，我们称之为 “navigation”。在 React Router 中有两种导航方式：

- `<Link>`
- `navigate`

### Link


这是导航的主要方式。渲染一个 `<Link>` 允许用户在点击它时更改 URL。 React Router 将阻止浏览器的默认行为，并告诉 [history](#history) 将新条目推送到 [history stack](#history-stack)。 [location](#location) 更改，新的 [matches](#match) 将呈现。

但是，链接是可访问的，因为它们：


- 仍然呈现 `<a href>` 以便满足所有默认的可访问性问题（如键盘、可聚焦性、SEO 等）
- 如果右键单击或命令/控制单击以“在新选项卡中打开”，请不要阻止浏览器的默认行为。

- 如果是右键单击或命令/控制单击以“在新选项卡中打开”，则不要阻止浏览器的默认行为
[嵌套路由](#nested-routes) 不仅仅是渲染布局；它们还启用“相对链接”。考虑我们之前的 `teams` 路线

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
</Route>
```

The `<Teams>` component can render links like:

```jsx
<Link to="psg" />
<Link to="new" />
```

它链接到的完整路径将是 `/teams/psg` 和 `/teams/new`。它们继承了渲染它们的路线。这使得您的路由组件不必真正了解应用程序中的其余路由。大量的链接只会更深入 [segment](#segment)。您可以重新排列整个 [route config](#route-config)，这些链接可能仍然可以正常工作。在开始构建站点并且设计和布局正在发生变化时，这非常有价值。

### Navigate Function

这个函数是从 `useNavigate` 钩子返回的，它允许程序员随时更改 URL。您可以在超时时执行此操作：

从 `useNavigate` 钩子返回返回一个函数，使用这个函数可以更改 URL。您可以在定时器里面执行此函数：

```js
let navigate = useNavigate();
useEffect(() => {
  setTimeout(() => {
    navigate("/logout");
  }, 30000);
}, []);
```

或者在提交表单后：

```js
<form onSubmit={event => {
  event.preventDefault();
  let data = new FormData(event.target)
  let urlEncoded = new URLSearchParams(data)
  navigate("/create", { state: urlEncoded })
}}>
```

Like `Link`, `navigate` works with nested "to" values as well.

```js
navigate("psg");
```

您应该有充分的理由使用 `navigate` 而不是 `<Link>`。这让我们非常难过

```js bad nonumber
<li onClick={() => navigate("/somewhere")} />
```

除了链接和表单之外，很少有交互会改变 URL，因为它引入了可访问性和用户期望的复杂性。

除了链接和表单之外，很少有交互应该更改 URL，因为它引入了围绕可访问性和用户期望的复杂性。

## 数据访问

最后，应用程序需要向 React Router 请求一些信息以构建完整的 UI。为此，React Router 有一堆钩子

```js
let location = useLocation();
let urlParams = useParams();
let [urlSearchParams] = useSearchParams();
```

## Review

让我们从头开始把它放在一起！

1. 渲染你的应用（App）

   ```jsx
   ReactDOM.render(
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<App />}>
           <Route index element={<Home />} />
           <Route path="teams" element={<Teams />}>
             <Route path=":teamId" element={<Team />} />
             <Route path="new" element={<NewTeamForm />} />
             <Route index element={<LeagueStandings />} />
           </Route>
         </Route>
         <Route element={<PageLayout />}>
           <Route path="/privacy" element={<Privacy />} />
           <Route path="/tos" element={<Tos />} />
         </Route>
         <Route path="contact-us" element={<Contact />} />
       </Routes>
     </BrowserRouter>,
     document.getElementById("root")
   );
   ```

2. `<BrowserRouter>` 创建一个 [history](#history)，将初始的 [location](#location) 放入 state，并订阅 [URL](#url)。

3. `<Routes>` 递归它的 [子路由](#child-route) 以构建 [路由配置](#route-config)，将这些路由与 [location](#location) 匹配，创建一些路由 [matches] (#match)，并呈现第一个匹配的路由元素

4. 您在每个 [父路由](#parent-route) 中渲染一个 [`<Outlet/>`](#outlet)。

5. The outlets render the next match in the route [matches](#match).

6. 用户点击链接

7. 链接调用 `navigate()`

8. [history](#history) 更改 URL 并通知 `<BrowserRouter>`。

9. `<BrowserRouter>` rerenders, start over at (2)!

而已！我们希望本指南能帮助您更深入地了解 React Router 中的主要概念。



