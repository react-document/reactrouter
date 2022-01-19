---
title: 教程
order: 2
---

# 教程

## 介绍

[在此处查看完整的ReactRouter程序示例](https://stackblitz.com/edit/github-agqlf5?file=src/App.jsx).

React Router是为React（一个用于构建用户界面的 JavaScript 库）设计的一个功能齐全的可以用在客户端和服务端的路由库，它可以在React运行的地方运行，在web上，node.js在服务器上，以及React Native上。

如果您刚刚开始使用 React，我们建议您先查看官方文档中[优秀的入门指南](https://zh-hans.reactjs.org/)。那里有很多资料可以帮助您学习和使用。React Router 与 React >= 16.8 兼容。


本教程会快速入门React Router和介绍一些重点。到最后，你会知道React Router中常用的api。学完本教程之后，你可以深入研究其他的一些文档来获得更深入的了解。


在构建一个小簿记应用程序时，我们将介绍::

- 配置路由
- 使用Link做路由跳转
- 创建具有活动样式的链接
- 使用嵌套路由进行布局
- 以编程方式导航
- 使用 URL 参数加载数据
- 使用 URL 搜索参数
- 通过组合创建自己的行为
- 服务端渲染

## 安装

### 推荐使用: StackBlitz

要完成本教程，您需要一个可运行的 React 应用程序。我们建议跳过打包程序并在StackBlitz上使用[此演示在浏览器中](https://stackblitz.com/github/remix-run/react-router/tree/main/tutorial?file=src/App.jsx) 进行编码：
 

当您编辑文件时，本教程将实时更新。

### 使用打包工具

随意使用您选择的打包器，例如 [Create React App](https://create-react-app.dev/) or [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

```sh
# create react app
npx create-react-app router-tutorial

# vite
npm init vite@latest router-tutorial --template react
```

然后安装 React Router 依赖项：

```sh
cd router-tutorial
npm install react-router-dom@6 history@5
```

然后编辑你的App.js，让它变得很无聊:

```tsx filename=src/App.js
export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
    </div>
  );
}
```
事实上，那个“!”看起来一点也不无聊。这很让人激动。在经历了一场全球大流行后，我们改变了业务方向，于是我们在React Router v6测试版上待了一年多。这是我们最近做的最激动人心的事情!

最后，确认`index.js` or `main.jsx`（取决于你的打包工具）是可用的：

```tsx filename=src/main.jsx
import { render } from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

启动您的React应用：

```sh
# probably this
npm start

# or this
npm run dev
```

## 连接路由

首先，我们想把你的应用连接到路由: import ' BrowserRouter '，并用它包裹你的整个应用。

```tsx lines=[2,7-9] filename=src/main.jsx
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
```

应用程序中没有任何变化，但现在我们已准备好开始处理路由。

## 添加一些链接

打开 src/App.js、导入 Link 并添加一些全局导航。注：在本教程中不要对待样式太认真，我们只是为了方便而使用内联样式，你可以根据需要设置样式。

```tsx lines=[1,7-9] filename=src/App.js
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}
```

单击链接和后退/前进按钮（如果您使用的是 StackBlitz，则需要单击内嵌浏览器工具栏中的“在新窗口中打开”按钮）。React Router 现在正在控制 URL！

我们还没有在 URL 更改时呈现任何路由，但 Link 可以更改 URL，而不会导致整个页面重新加载。

## 添加一些路由

添加几个新文件：

- `src/routes/invoices.jsx`
- `src/routes/expenses.jsx`

(文件的位置并不重要，但是当你想要自动生成后端API，服务器渲染，代码分割或者更多的功能时，像这样命名你的文件可以很容易地将这个应用程序移植到其他项目，[Remix](https://remix.run)😉)

现在在文件中加入以下代码：

```tsx filename=src/routes/expenses.jsx
export default function Expenses() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Expenses</h2>
    </main>
  );
}
```

```tsx filename=src/routes/invoices.jsx
export default function Invoices() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
```

最后，让我们通过在`main.jsx`或者`index.js` 中创建我们的第一个“路由配置”来让 React Router 在不同的 URL 上呈现我们的界面。

```tsx lines=[2,4-5,13-19] filename=src/main.jsx
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
```

注意：当路由为"/"时它渲染App组件，在"/invoices"时它渲染Invoices组件。

<docs-info>请注意，如果您使用 StackBlitz 单击内嵌浏览器工具栏中的“在新窗口中打开”按钮，以便能够单击浏览器中的后退/前进按钮。</docs-info>

## 嵌套路由

你可能已经注意到，当点击链接时，“App”中的布局会消失。共享布局是一件令人头疼的事情。我们已经知道，大多数UI都是一系列嵌套布局，这些布局总会映射到URL上，所以这个思路被直接植入到React Router中。


```jsx lines=[15-18] filename=src/main.jsx
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
```

当路由有子节点时，它会做两件事：

1. 它嵌套了 URL (`"/" + "expenses"` 和 `"/" + "invoices"`)
2. 当子路由匹配时，它将嵌套共享布局的 UI 组件：

但是，为了使（2）生效，我们需要在App.jsx“父”路由中渲染一个<Outlet/>组件。

```jsx lines=[1,16] filename=src/App.jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

现在再次单击。父路由 ( App.js) 仍然存在，而 `<Outlet>` 在两个子路由 (`<Invoices>` 和 `<Expenses>`)之间切换！
正如我们稍后将看到的，这适用于路由层次结构的任何级别，并且非常强大。

## 列出发票

通常你会从某个地方的服务器获取数据，但在本教程中，让我们造一些数据，这样我们就可以专注于路由。

创建一个文件src/data.js并将其复制/粘贴到那里：

```js filename=src/data.js
let invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: "12/05/1995"
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "$8,000",
    due: "10/31/2000"
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "$9,500",
    due: "07/22/2003"
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "$14,000",
    due: "09/01/1997"
  },
  {
    name: "Wide Open Spaces",
    number: 1998,
    amount: "$4,600",
    due: "01/27/2998"
  }
];

export function getInvoices() {
  return invoices;
}
```

现在我们可以在发票路由中使用它。让我们也添加一些样式来获得侧边栏导航布局。随意复制/粘贴所有这些，但要特别注意 `<Link>` 组件需要 to 属性：

```js lines=[17] filename=src/routes/invoices.jsx
import { Link } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        {invoices.map(invoice => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

酷！现在单击发票链接，看看会发生什么。

😨😨😨

## 添加“无匹配”路由

如果您单击一些链接使页面变为空白，并没有像您预期​​的那样进行，那是因为我们定义的所有路由都匹配不到我们点击的 URL："/invoices/123"。

在我们继续之前，最好处理这种“不匹配”的情况。返回您的路由配置并添加以下内容：

```js lines=[5-12] filename=src/main.jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

"*"在这里有着特殊的意义。只有在没有其他路由匹配时才会匹配。

## 读取 URL 参数

好了，回到单个发票 URL。让我们为特定发票添加一个路由。我们刚刚访问了一些像"/invoices/1998"和"/invoices/2005"这样的 URL，让我们创建一个新组件 src/routes/invoice.jsx 来匹配这些 URL：

```js filename=src/routes/invoice.jsx
export default function Invoice() {
  return <h2>Invoice #???</h2>;
}
```

我们想渲染发票编号而不是"???"。通常在 React 中，您会将其作为 prop 传递<Invoice invoiceId="123" />，但目前无法控制 invoiceId ，因为它来自 URL。

让我们定义一个路由来匹配这些类型的 URL，并使我们能够从中获取发票编号。

在“发票”路由中创建一个新的 `<Route>` ，如下所示：

```js lines=[4-6] filename=src/main.jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

需要注意的几点：

- 我们刚刚创建了一个匹配“/invoices/2005”和“/invoices/1998”等 URL 的路由。:invoiceId路径的一部分是“URL 参数”，这意味着只要模式相同，它就可以匹配任何值。
- `<Route>` 在匹配时增加路由嵌套的第二层：`<App><Invoices><Invoice /></Invoices></App>` 。因为 `<Route>` 是嵌套的，所以 UI 也会被嵌套。

好了，现在点击一个发票链接，注意 URL 发生了变化，但新的发票组件还没有显示出来。你知道为什么吗？

那就对了！我们需要在父布局路由中添加一个出口（我们真的为你感到骄傲）。

```tsx lines=[1,24] filename=src/routes/invoices.jsx
import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        {invoices.map(invoice => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

好了，让我们结束这个循环。再次打开invoice组件，让我们从URL中获取:invoiceId参数:

```ts lines=[1,4] filename=src/routes/invoice.jsx
import { useParams } from "react-router-dom";

export default function Invoice() {
  let params = useParams();
  return <h2>Invoice: {params.invoiceId}</h2>;
}
```

注意' params '对象的参数key与路由路径中的动态参数一致:
Note that the key of the param on the `params` object is the same as the dynamic segment in the route path:

```
:invoiceId -> params.invoiceId
```

让我们使用这些信息来构建一个更有趣的发票页面。打开' src/data.js '，添加一个新函数来根据编号查找发票:

```js filename=src/data.js lines=[7-11]
// ...

export function getInvoices() {
  return invoices;
}

export function getInvoice(number) {
  return invoices.find(
    invoice => invoice.number === number
  );
}
```

现在回到 `invoice.jsx` 组件，我们使用参数来查找发票并显示更多信息:

```js filename=routes/invoice.jsx lines=[2,6]
import { useParams } from "react-router-dom";
import { getInvoice } from "../data";

export default function Invoice() {
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  );
}
```

注意我们对参数使用了' parseInt '。查找数据使用' number '类型是很常见的，但 URL 参数总是'字符串'。

## 索引路由

索引路由可能是React Router中最难理解的概念。因此，如果你之前有过困扰，我们希望能在这儿让你明白。

现在你可能正在看其中的一张发票。点击应用全局导航中的“ invoice ”链接。注意，此时主内容区域变成空白！这时我们可以用“ index ”路由来解决这个问题。

```jsx filename=src/main.jsx lines=[5-12]
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        }
      />
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

赞！现在索引路由填满了空白！

注意，它有' index '属性而不是' path '。这是因为索引路由共享父路由的路径。这就是重点——它没有路径。

也许你还在困惑。我们有几种方法来回答“什么是索引路由？”希望其中一条能给你答疑:

- 在父路由路径的出口出呈现索引路由
- 当父路由匹配但其他子路由都不匹配时，索引路由匹配。
- 索引路由是父路由的默认子路由。
- 当用户还没有单击导航列表中的项目之一时，索引路由会呈现。

## 动态链接

将链接显示为用户正在查看的状态是很常见的，尤其是在导航列表中。让我们将“ Link ”替换为“ NavLink ”，将这种方法添加到我们的发票列表中。

```jsx lines=[1,15-27] filename=src/routes/invoices.jsx
import { NavLink, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        {invoices.map(invoice => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : ""
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

我们在那里做了三件事：

1. 我们更改 Link 为 NavLink。
2. 我们style从一个简单的对象变成了一个返回一个对象的函数。
3. 我们通过传isActive的值给样式函数来更改链接的颜色NavLink。

你可以对“ NavLink ”上的“ className ”做同样的事情:

```jsx
// normal string
<NavLink className="red" />

// function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```

## 搜索参数

搜索参数类似于URL参数，但它们在URL中的位置不同。它们不是在由' / '分隔的普通URL段中，而是在' ? '后面。你在web上见过他们，比如 `"/login?success=1"` 或 `"/shoes?brand=nike&sort=asc&sortby=price"`。

React Router 通过' useSearchParams '使读取和操作搜索参数变得很容易。它的工作原理很像' React.useState() '，但存储和设置状态在 URL 的搜索参数中，而不是在内存中。

让我们通过在发票导航列表上添加一个小过滤器来看看它的作用。

```jsx filename=routes/invoices.jsx lines=[4,10,20-30,32-37]
import {
  NavLink,
  Outlet,
  useSearchParams
} from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={event => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter(invoice => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map(invoice => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : ""
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

看看这个，因为用户输入：

- `setSearchParams()` 将 `?filter=...` 搜索参数放在 URL 中并重新渲染路由器。
- `useSearchParams` 现在返回一个 [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 与 `"filter"` 作为其中的一个值。
- 我们将输入的值设置为过滤器搜索参数中的任何值(它就像' useState '，但用 URLSearchParams 代替!)
- 我们根据过滤器搜索参数过滤我们的发票列表。

## 自定义行为

如果您对列表进行过滤，然后单击链接，您会注意到列表不再被过滤，搜索参数从' `<input>` '和URL中清除。你可能想要这个，也可能不想!也许您想要过滤列表，并在 URL 中保留参数。

当我们点击一个链接时，我们可以通过将它添加到链接的href来持久化查询字符串。我们会将React Router 中的“ NavLink ”和“ useLocation ”组合成我们自己的“ QueryNavLink ”(也许还有更好的名字，但这就是我们今天要讲的)。

```js
import { useLocation, NavLink } from "react-router-dom";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}
```

你可以把这些代码放到你的应用中任何你想要的地方，然后在“ src/routes/invoice.jsx ”中替换你的  `NavLink`  with `QueryNavLink`，然后你就完成了。

像 `useSearchParams`， `useLocation` 返回一个位置，告诉我们关于 URL 的信息。一个位置看起来像这样:

```js
{
  pathname: "/invoices",
  search: "?filter=sa",
  hash: "",
  state: null,
  key: "ae4cz2j"
}
```

有了这些信息，`QueryNavLink` 中的任务非常简单:添加 `location.search` 在属性 `to`上。你可能会想，“天啊，这似乎应该是在React Router的内置组件还是什么？”好吧，让我们来看另一个例子。

如果您在电子商务网站上有这样的链接怎么办？

```jsx
<Link to="/shoes?brand=nike">Nike</Link>
<Link to="/shoes?brand=vans">Vans</Link>
```

然后您想在 url 搜索参数与品牌匹配时将它们设置为特定的样式？你可以用你在本教程中学到的东西来快速的制作一个这样的组件：

```jsx
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?brand=${brand}`}
      {...props}
    />
  );
}
```

当URL为 "/shoes?brand=nike"以及"/shoes?brand=nike&brand=vans"时都是匹配的。也许您希望它在仅选择一个品牌时处于匹配状态：

```js
let brands = params.getAll("brand");
let isActive =
  brands.includes(brand) && brands.length === 1;
// ...
```

或者，您可能希望链接是可添加的（点击 Nike，然后 Vans 将两个品牌都添加到搜索参数中）而不是替换品牌：

```jsx [4-6,10]
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}
```

或者，也许您希望它添加品牌（如果它已经不存在）并在再次单击时将其删除！

```jsx [7-12]
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  } else {
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== "brand" || value !== brand
      )
    );
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}
```

如您所见，即使在这个相当简单的示例中，您也可能需要许多有效的行为。React Router 并没有尝试解决我们直接听说过的每个用例。相反，我们为您提供组件和钩子来组合您需要的任何行为。

## 以编程方式导航

好了，回到我们的应用程序。坚持住，你快完成了！

大多数情况下，URL 更改是响应用户单击链接。但有时您，程序员，想要更改 URL。一个非常常见的用例是在数据更新之后，例如创建或删除记录。

让我们添加一个按钮，将发票标记为已付款，然后导航到索引路径。

首先，您可以复制我们虚假数据存储中删除发票的此函数然后粘贴：

```js filename=src/data.js
export function deleteInvoice(number) {
  invoices = invoices.filter(
    invoice => invoice.number !== number
  );
}
```

现在让我们添加删除按钮，调用我们的新函数，并导航到索引路由：

```js lines=[1-2,5,17-24] filename=src/routes/invoice.jsx
import { useParams, useNavigate } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  let navigate = useNavigate();
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
```

## 获得帮助

恭喜！你已经完成了本教程。我们希望它可以帮助您了解 React Router。

如果您遇到问题，请查看[资源](/resources)页面以获取帮助。祝你好运！
