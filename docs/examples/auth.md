---
title: 鉴权
order: 2
---

# 鉴权示例
本例展示了如何规范已鉴权用户的路径访问权限。      

请注意以下特点：
- 无论是提交登录表单之后还是未鉴权用户访问某特定路由，`useNavigate()`钩子和`<Navigate>`组件的使用都是命令式的以及声明式的
- 使用`location.state`去保存之前的location，那么鉴权之后你就可以让用户重新跳转到那个页面
- 通过使用`navigate("...", { replace: true })`，可以用新路由记录替换浏览器history栈中的/login路由记录，来防止用户在登录后通过点击“回退按钮”回退到登陆页面使用     

## 预览
在[StackBlitz](https://stackblitz.com/)上打开示例：      

[![打开StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/github-jmty92?file=src/App.tsx)      
