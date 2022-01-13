---
title: FAQs
order: 4
---

# 常见问题

以下是关于 React Router v6 的一些常见问题

## 为什么需要 withRouter？

这个问题通常源于你正在使用的类组件不支持 hooks 这一事实。在 React Router v6 中，我们完全采纳了 hooks，并利用 hooks 去共享路由的所有内部状态。但是，这并不意味着你不能使用路由。假设你能够使用 hooks (你采用的是 React 16.8+)，你需要的只是一层封装。

```js
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
```

## 为什么 `<Route>` 有一个叫 `element` 的属性，而不是叫 `render` 或者 `component`？

其实我们之前在这里回答过这个问题 从 v5 到 v6 的迁移指南, 但是我们需要在这里重复说明下.

在 React Router v6 里，我们从 v5 的 `<Route component>` 和 `<Route render>` 这个两个API切换为 `<Route element>`。为什么我们要这样做呢?

首先，我们注意到 React 本身就带头使用了 `<Suspense fallback={<Spinner />}>` 。这个 `fallback` 属性接受的是一个 React **元素**，而不是一个**组件**。这就使得你可以轻易地从父组件传递任何属性给 `<Spinner>`。 

使用元素而不是组件意味着我们不需要提供 `passProps` 这样类型的 API，因此，你可以给你的元素传递任何你需要的属性。举个例子，面对基于组件的 API，在 `<Route path=":userId" component={Profile} />` 匹配当前路由时，我们没有办法很好地向正在渲染的 `<Profile>` 元素传递属性。大多数React插件最终都会使用类似 `<Route component={Profile} passProps={{ animate: true }} />` 这样的一个 API，或者一个 render 属性，又或者一个高阶组件来解决这个问题。

而且，`Route` v5 的渲染 API 特别多。当我们基于 v4 或者 v5 开发的时候，我们通常会有下面的对话：

```js
// 啊，真是美观又简洁！
<Route path=":userId" component={Profile} />

// 等等，我要如何给 <Profile> 元素传递自定义属性呢？
// 唔, 也许我们这时候可以使用一个 render 属性？
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// 好的，现在我们有两种方法来渲染带有路由的组件 :/

// 等等，如果我们还想要在路由*不*匹配的时候
// 渲染些什么类似 Not Found 的页面呢？
// 也许我们可以使用另一种语法稍微不同的渲染属性？
<Route
  path=":userId"
  children={({ match }) => (
    match ? (
      <Profile match={match} animate={true} />
    ) : (
      <NotFound />
    )
  )}
/>

// 如果我想访问路由匹配属性，
// 又或者我需要重定向到更深层次的地方, 那我要怎么办呢？
function DeepComponent(routeStuff) {
  // 终于拿到 routeStuff 了, 哎!
}
export default withRouter(DeepComponent);

// 好吧，至少现在我们能够处理所有这些情况了
// ... *捂脸*🤦‍♀️🤦‍♂️
```

至少，让这个 API 的肆意扩展的部分原因在于React不给我们提供任何从 `<Route>` 传递信息给路由元素的方法，所以我们不得不想出一些取巧的方法去给你的元素传递路由数据**和**自定义的属性，比如：`component`、渲染属性、`passProps`、高阶组件......直到 **hooks** 问世！

现在，以上的对话将会变成这样：

```js
// 啊哈，美观又简洁的 API，和 <Suspense> API 几乎一样！
// 这里没什么可学的了。
<Route path=":userId" element={<Profile />} />

// 等等，我要如何给 <Profile> 传递自定义属性呢？
// 元素？噢对了，它就是一个元素。简单。
<Route path=":userId" element={<Profile animate={true} />} />

// 好的，但是我要如何访问路由的数据呢，就像URL查询参数
// 或者当前位置信息？
function Profile({ animate }) {
  let params = useParams();
  let location = useLocation();
}

// 如果是在更深层次的组件呢
function DeepComponent() {
  // 对，和其他地方一样
  let navigate = useNavigate();
}

// 终于！我们完成了。
```

在 v6 中使用 `element` 属性还有个重要的原因就是，我们保留了 `<Route children>` 给嵌套路由使用。如果你想要阅读更多相关知识，你可以浏览 v6 的 入门教程

## 我要如何在 react-router  v6 中添加一个 No Match(404) 的路由呢？

在 v4 中, 我们只需要移除 route 的 path 属性。在 v5 中，我们需要用一个带有 `path="*"` 的 Route 组件去封装我们的404元素。而在 v6 中，我们使用的是新的 element 属性，同时传入 `path="*"`：

```js
<Route path="*" element={<NoMatch />} />
```

## `<Route>` 不渲染了？我要如何组合使用呢？

在 v5 中，`<Route>` 组件只是一个普通的组件，它就类似 `if` 语句，仅当URL和其路径匹配时候才会被渲染。在 v6 中，`<Route>` 元素实际上并不会被渲染，它仅仅只是用来配置的。

在 v5 中，因为路由只是组件，所以当路径是“/my-route”的时候 `MyRoute` 将会被渲染。

```tsx filename=v5.js
let App = () => (
  <div>
    <MyRoute />
  </div>
);

let MyRoute = ({ element, ...rest }) => {
  return (
    <Route path="/my-route" children={<p>Hello!</p>} />
  );
};
```

但是，在 v6 中，`<Route>` 仅用来传递它的属性给 `<Routes>`，所以以下的代码将永远也不会渲染 `<p>Hello!</p>`，因为 `<MyRoute>` 里面没有提供 path 属性，从而 `<Routes>` 也就无法得到：

```tsx bad filename=v6-wrong.js
let App = () => (
  <Routes>
    <MyRoute />
  </Routes>
);

let MyRoute = () => {
  // 永远也不会被渲染，因为 path 属性在这里才被提供
  return (
    <Route path="/my-route" children={<p>Hello!</p>} />
  );
};
```

你可以通过下面的方式得到相同的效果：

- 仅仅只在 `<Routes>` 里渲染 `<Route>`
- 将组合渲染元素移到 `element` 属性里

```tsx filename=v6.js
let App = () => (
  <div>
    <Routes>
      <Route path="/my-route" element={<MyRoute />} />
    </Routes>
  </div>
);

let MyRoute = () => {
  return <p>Hello!</p>;
};
```

在 `<Routes>` 里能够通过完整的嵌套路由进行静态配置，这就使得在之后的小版本 `v6.x` 中，我们能够实现更多特性，所以，我们推荐你将路由放在最外层进行配置。如果你依然倾向于脱离其他组件，只要和URL匹配上了就渲染你的组件这种方式，那么你可以用以下方式创建一个类似 v5 的 `Route` 的组件：

```tsx
function MatchPath({ path, Comp }) {
  let match = useMatch(path);
  return match ? <Comp {...match} /> : null;
}

// 不管有没有被嵌套在 `<Routes>` 都能够响应匹配
<MatchPath path="/accounts/:id" Comp={Account} />;
```

## 我要如何在组件树的更底层实现嵌套路由呢？

在 v5 中，你可以在任何地方渲染 `<Route>` 或者 `<Switch>`。在 v6 中，你可以做相同的事情，但是你需要使用 `<Routes>`（`<Routes>` 没有”s“的话是没有效果的）。我们称之为“后代 `<Routes>`”

它看起来类似 v5 中的如下这段代码

```tsx filename=v5.js
// 在组件树的顶层
<Switch>
  <Route path="/users" component={Users} />
</Switch>;

// 在组件树的更深层级里
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Switch>
        <Route path="/users/account" component={Account} />
      </Switch>
    </div>
  );
}
```

在 v6 中，写法几乎一样：

- 注意这里，我们在父路由中使用 `*` 来匹配更具体的 URL，尽管当前父路由没有直系的子组件
- 你不再需要知道完整的子路由路径是什么，现在你可以只使用相对路由

```tsx filename=v6.js
// 在组件树的顶层
<Routes>
  <Route path="/users/*" element={<Users />} />
</Routes>;

// 在组件树的更深层级里
function Users() {
  return (
    <div>
      <h1>用户</h1>
      <Routes>
        <Route path="account" element={<Account />} />
      </Routes>
    </div>
  );
}
```

在 v5 中，如果你有一个“悬浮路由”（没有嵌套在 `<Switch>` 中），那么在 v6 中，你只需要把它嵌套在一个 `<Routes>` 中即可。

```tsx
// v5
<Route path="/contact" component={Contact} />

// v6
<Routes>
  <Route path="contact" element={<Contact />} />
</Routes>
```

## 正则路由路径做了什么改变？

正则路由路径由于以下两个原因被弃用了：

1. 正则表达式给 v6 中的路径匹配的排序带来了很多问题。你要如何对正则进行排序？

2. 我们能够摆脱对于（path-to-regexp）的所有依赖，并且能够极大地减小发送到你的用户的客户端的包的体积。如果我们把它添加回来，那么它将会占据 React Router 页面1/3的大小。

分析了大量的使用案例后，我们发现在没有直接提供对于正则路径的支持下，我们仍然会遇到这些问题，因此我们才做了这样的权衡，以此来极大地减小打包后的代码体积也同时规避了关于正则路由的排序问题。

大部分的正则路由仅仅只考虑一个 URL 分段，且只做以下两件事中的一件：

1. 匹配多个静态值
2. 用某种方式（是一个 number， 不是一个 number，等等）去验证参数

**全局匹配静态值**

我们经常在代码里看到一个用来匹配多语言的正则路由：

```tsx filename=v5-lang-route.js
function App() {
  return (
    <Switch>
      <Route path={/(en|es|fr)/} component={Lang} />
    </Switch>
  );
}

function Lang({ params }) {
  let lang = params[0];
  let translations = I81n[lang];
  // ...
}
```

这里实际上也就只有三个静态路由，因此在 v6 中，你可以创建三个路由，直接将 code 传递给组件。如果有大量的路由，你可以创建一个数组，然后 map 成路由来防止重复的代码。

```tsx filename=v6-lang-route.js
function App() {
  return (
    <Routes>
      <Route path="en" element={<Lang code="en" />} />
      <Route path="es" element={<Lang code="en" />} />
      <Route path="fr" element={<Lang code="en" />} />
    </Routes>
  );
}

function Lang({ lang }) {
  let translations = I81n[lang];
  // ...
}
```

**参数验证**

另一个常见的案例是确保参数是整型

```tsx filename=v5-userId-route.js
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)/} component={User} />
    </Switch>
  );
}

function User({ params }) {
  let id = params[0];
  // ...
}
```

在这个案例中，你必须在匹配的组件中做大量的工作去处理正则。

```tsx filename=v6-userId-route.js
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/*" component={NotFound} />
    </Routes>
  );
}

function ValidateUser() {
  let params = useParams();
  let userId = params.id.match(/\d+/);
  if (!userId) {
    return <NotFound />;
  }
  return <User id={params.userId} />;
}

function User(props) {
  let id = props.id;
  // ...
}
```

在 v5 中，如果当前路由不匹配正则，那么 `<Switch>` 将会寻找下一个能够匹配的路由：

```tsx filename=v5-switch.js
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)/} component={User} />
      <Route path="/users/new" exact component={NewUser} />
      <Route
        path="/users/inactive"
        exact
        component={InactiveUsers}
      />
      <Route path="/users/*" component={NotFound} />
    </Switch>
  );
}
```

看这个例子的时候，你可能会关注到在 v6 中，由于 `:userId` 的路由被放置在首位，那么剩下的路由就不会在 URL 匹配时候被渲染了。但是，感谢路由排序让我们不会遇到这种情况。那些”new“和”inactive“路由的优先级更高，因此能够在 URL 匹配时候被渲染。

```tsx filename=v6-ranked.js
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/new" element={<NewUser />} />
      <Route
        path="/users/inactive"
        element={<InactiveUsers />}
      />
    </Routes>
  );
}
```

事实上，在 v5 中，如果你胡乱排序你的路由，那么你会遇到各种各样的问题。而 v6 就能完全根除这个问题。

**Remix 用户**

如果你正在使用 [Remix](https://remix.run)，并且将这个项目加入到你的 loader 中，你就可以给客户端回复合适的40x的状态码。因为 loaders 只运行在服务端，所以这样可以减少发送给用户的代码量。

```tsx filename=remix-useLoaderData.js
import { useLoaderData } from "remix";

export async function loader({ params }) {
  if (!params.id.match(/\d+/)) {
    throw new Response("", { status: 400 });
  }

  let user = await fakeDb.user.find({
    where: { id: params.id }
  });
  if (!user) {
    throw new Response("", { status: 404 });
  }

  return user;
}

function User() {
  let user = useLoaderData();
  // ...
}
```

Remix 将会去渲染距离最近的 [catch boundary](https://docs.remix.run/v0.20/api/app/#catchboundary)，而不是渲染你的组件
