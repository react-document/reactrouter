---
title: 概述
order: 2
---

# 概述

如果您熟悉 JavaScript 生态系统、React 和 React Router，这可以作为 React Router v6 的快速概览，其中包含大量代码和最少的解释。

- 有关 React Router 的完整介绍，请参阅 [教程](tutorial.md)
- 有关每个 API 的大量文档，请参阅[ API 参考](../api.md)
- 要更深入地了解概念，请参阅[主要概念](concepts.md)

## 安装

```sh
npm install react-router-dom@6
```

## 配置路由

```jsx
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// 导入你的路由组件

render(
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
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
```

在以前版本的 React Router 中，当多个路由匹配一个不明确的 URL 时，你必须以某种方式对你的路由进行排序才能得到正确的渲染。V6 更加智能，将选择最具体的匹配，因此您无需再担心这一点。例如，URL `/teams/new` 匹配这两个路由:

```jsx
<Route path="teams/:teamId" element={<Team />} />
<Route path="teams/new" element={<NewTeamForm />} />
```

因为 `teams/new` 是比 `/teams/:teamId` 更具体的匹配, 所以显示的组件是 `<NewTeamForm />` 。
## 导航

使用 `Link` 来让用户更改 URL 或者使用 `useNavigate` 自己更改URL (如提交表单后):

```tsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="about">About</Link>
      </nav>
    </div>
  );
}
```

```tsx
import { useNavigate } from "react-router-dom";

function Invoices() {
  let navigate = useNavigate();
  return (
    <div>
      <NewInvoiceForm
        onSubmit={async event => {
          let newInvoice = await createInvoice(
            event.target
          );
          navigate(`/invoices/${newInvoice.id}`);
        }}
      />
    </div>
  );
}
```

## 读取 URL 参数

在您的路由路径中使用 `:style` 语法和 `useParams()` 来读取它们:

```tsx
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="invoices/:invoiceId"
        element={<Invoice />}
      />
    </Routes>
  );
}

function Invoice() {
  let params = useParams();
  return <h1>Invoice {params.invoiceId}</h1>;
}
```

请注意，路径片段 `:invoiceId` 和参数的键 `params.invoiceId` 匹配。

一个非常常见的用例是在组件呈现时获取数据：


```tsx
function Invoice() {
  let { invoiceId } = useParams();
  let invoice = useFakeFetch(`/api/invoices/${invoiceId}`);
  return invoice ? (
    <div>
      <h1>{invoice.customerName}</h1>
    </div>
  ) : (
    <Loading />
  );
}
```

## 嵌套路由

这是 React Router 最强大的功能之一，因此您不必处理复杂的布局代码。您的绝大多数布局都与 URL 片段相耦合，React Router 完全支持这一点。

路由可以相互嵌套，它们的路径也将嵌套（子级继承父级）。

```tsx
function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}
```

此路由配置定义了三个路由路径：

- `"/invoices"`
- `"/invoices/sent"`
- `"/invoices/:invoiceId"`

当 URL 为 `"/invoices/sent"` 时，此组件树将是：

```tsx
<App>
  <Invoices>
    <SentInvoices />
  </Invoices>
</App>
```

当 URL 为 `"/invoices/123"` 时，此组件树将是：

```tsx
<App>
  <Invoices>
    <Invoice />
  </Invoices>
</App>
```

请注意随 URL 变化的内部组件 (`<SentInvoices>` 和 `<Invoice>`)。父路由 (`<Invoices>`) 负责确保匹配的子路由使用 [`<Outlet>`](../api.md#outlet)呈现。下面是完整的示例：

```tsx [18]
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}

function Invoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <Outlet />
    </div>
  );
}

function Invoice() {
  let { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
}

function SentInvoices() {
  return <h1>Sent Invoices</h1>;
}
```

嵌套的 URL 段映射到嵌套的组件树。这非常适合创建在布局中具有持久导航且内部部分随 URL 变化的 UI。如果您环顾网络，您会注意到许多网站（尤其是网络应用程序）具有多层布局嵌套。

下面是另一个带有导航的根布局示例，该导航在内部页面与 URL 交换时仍然存在：

```tsx
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="invoices">Invoices</Link> |{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function Invoices() {
  return <h1>Invoices</h1>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

## 索引路由

索引路由可以被认为是“默认子路由”。当父路由有多个子路由，但 URL 仅在父路由的路径上时，您可能需要将某些内容呈现到 outlet 中。

考虑一下这个例子：

```tsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <GlobalNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

这个页面在 “/invoices” 和 “/activity” 上看起来很棒，但在 “/” 它只是一个空白页 <main> 因为那里没有子路由渲染。为此，我们可以添加一个索引路由：

```tsx [5]
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Activity />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
}
```

现在在 “/” 上 <Activity> 元素将在 outlet 内渲染。

您可以在路由层次结构的任何级别拥有一个索引路由，当父级匹配但其他子级都不匹配时，该索引路由将呈现。

```tsx
function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route
          path="invoices"
          element={<DashboardInvoices />}
        />
      </Route>
    </Routes>
  );
}
```

## 相关链接

相对的 `<Link to>` 值(不以 '/' 开头)是相对于呈现它们的路由的路径的。下面的两个链接将链接到 `/dashboard/invoices` 和 `/dashboard/team`，因为它们是在 `<Dashboard>` 内部呈现的。 当您更改父级的 URL 或重新排列您的组件时，这非常好，因为您的所有链接都会自动更新。

```tsx
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="invoices">Invoices</Link>{" "}
        <Link to="team">Team</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Invoices() {
  return <h1>Invoices</h1>;
}

function Team() {
  return <h1>Team</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  );
}
```

## “未找到”路由

当没有其他路由与 URL 匹配时，您可以使用 `path="*"` 渲染“未找到”路由。此路由将匹配任何 URL，但具有最弱的优先级，因此路由器仅在没有其他路由匹配时才会选择它。

```tsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

## 多组路由

尽管您在一个应用程序中只应该有一个 `<Router>`，但您可以根据需要拥有任意数量的 [`<Routes>`](../api.md#routes)，无论您在哪里需要它们。每 `<Routes>` 元素独立于其他元素运行，并选择一个子路由进行渲染。

```tsx
function App() {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<MainNav />} />
          <Route
            path="dashboard"
            element={<DashboardNav />}
          />
        </Routes>
      </Sidebar>

      <MainContent>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="invoices" element={<Invoices />} />
            <Route path="team" element={<Team />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
    </div>
  );
}
```

## 后代 `<Routes>`

你可以在任何你需要的地方渲染 [a `<Routes>` element](../api.md#routes)，包括在另一个 `<Routes>` 组件树的深处。 它们的工作方式与其他 `<Routes>` 一样，除了它们会在渲染它们的路由的路径上自动构建。如果你这样做，请确保在父路由的path_的末尾放一个 \*。否则，当父路由的长度大于父路由的路径时，父路由将不会匹配该URL，而你的后代 `<Routes>` 将永远不会出现。

```tsx [5]
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}
```

就只写这么多吧，我们并没有涵盖这里的所有 API，但这些绝对是您将要使用的最常见的 API。如果您想学习更多相关知识，请继续阅读[我们的教程]（tutorial.md）或浏览[完整 API 参考]。
