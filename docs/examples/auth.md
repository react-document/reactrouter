---
title: 鉴权
order: 2
---

# 鉴权样例
本例展示了怎么去限制未鉴权（authenticated）用户的访问。      

请注意以下特点：
- 无论是提交登录表单之后还是未鉴权用户访问某特定路由，`useNavigate()`钩子和`<Navigate>`组件的使用都是命令式的以及声明式的
- 使用`location.state`去保存之前的location，那么鉴权之后你就可以让用户重新跳转到那个页面
- 使用`navigate("...", { replace: true })`方法去替换浏览器history栈中的`/login`，就可以让用户无法通过点击“回退按钮”回退到登陆页面

# 预览
在[StackBlitz](https://stackblitz.com/edit/github-jmty92?file=src/App.tsx)上看样例。
