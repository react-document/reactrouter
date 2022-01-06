---
title: 懒加载
order: 6
---

# 懒加载示例
本例展示了懒加载：
- 单个路由元素
- 路由层级的整个部分            

按需使用`React.lazy()`和动态`import()`。通过这项技术，不需要在首页展示的页面可以抽离到其他包里面，因此可以降低首屏加载时间和改善性能。

## 预览
在[StackBlitz](https://stackblitz.com/)上打开示例：      

[![打开StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/github-xwwbou?file=src/App.tsx)      
