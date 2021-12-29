---
title: 查询参数
order: 10
---

# 查询参数样例
这个例子展示了如果通过`useSearchParams()`钩子读写URL的查询字符串，这个钩子的作用和`useNavigate()`非常接近，但它只作用于URL的[查询字符串](https://developer.mozilla.org/en-US/docs/Web/API/Location/search)部分。

在这个例子中，我们使用一个表单来搜索一个GitHub用户，并显示他们的个人简介。

## 预览
在[StackBlitz](https://stackblitz.com/)上打开这个[例子](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/search-params?file=src/App.tsx)