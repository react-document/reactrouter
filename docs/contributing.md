---
title: 贡献
order: 8
---

# 为React Router做出贡献

感谢做出贡献，真棒！

就开源项目而言，有多种方式为其做出贡献，所有的方式都有价值。以下的一些指南会在你准备的时候提供帮助。

## 起步

在对代码库做出贡献之前，你需要克隆当前的仓库。根据你所做的的贡献类型，该过程会有一些不同。
- 所有新功能、错误修复或 **任何涉及 `react-router` 代码的内容** 都应该从 `dev` 分支新建一个分支，再合并到 `dev` 分支。
- 只和文档有关的修改要先从`main`分支新建分支，然后再合并到`main`分支

参照下列步骤，开始为当前仓库做出贡献：
1.复制 (Fork)当前仓库（点击[这个页面](https://github.com/remix-run/react-router)右上角的<kbd>Fork</kbd>按钮）
2. 克隆自己的分支到本地

```bash 
# 打卡电脑终端，进入到克隆项目的父目录
git clone https://github.com/<your_github_username>/react-router.git
cd react-router
# 如果有 *任何* 的代码更改，确保切换到dev分支
git checkout dev
```
3. 安装依赖并构建项目。React Router使用[`yarn`（版本1）](https://classic.yarnpkg.com/lang/en/docs/install)，因此你也要用相同的版本。如果你用`npm`安装，会产生不必要的`package-lock.json`文件。

## 认为自己找到了一个Bug？
提问的格式要与问题模板保持一致，并提供示例代码，方便复现。最好是用失败的测试用例发起一个pull request。另一种方式是提供一个指向CodeSandbox或者代码仓库的链接，用以说明该Bug。

## 提议增加API或更改API？
在应用中，有哪些需要React Router提供的功能，请提供合理评论和代码示例。如果你能先告诉我们当前的API对你有哪些限制，再得出结论要修改或增加哪些API，这很有帮助。

就经验而言，功能单一的API通常更好，所以我们可能不愿意往API中添加功能，除非当前API有明显的限制。话虽如此，我们总是渴望听到我们之前没有考虑过的案例，所以请不要害羞！:)
## 问题没有得到关注?
如果你需要修复bug，并且没有人在进行修复，最好的办法是为其提供一个修复方案，并发起一个[pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)。开源代码属于我们所有人，推动其向前发展是我们所有人的责任。

## 发起一个Pull Request？
Pull request只需要两个或超过两个协作者同意就可以被合并；如果PR的作者是一个协作者，只需另一个协作者同意即可合并。

> **重要内容：** 在github中创建PR时，请确保为代码仓库设置正确的分支。如果你提交的PR与代码有关，对应的分支就是`dev`分支。创建PR时，在 "Compare changes" 标题下方的下拉菜单中，你可以设置base分支：
>
> <img src="https://raw.githubusercontent.com/remix-run/react-router/main/static/base-branch.png" alt="" width="460" height="350" />

### 测试
所有修复bug或增加功能的提交都需要测试。

`<blink>`没有测试，不能合并代码！`</blink>`

### 文档 + 示例
所有修改或增加API的提交必须在一个pull request中完成，并且要更新所有的代码示例和文档。

## 开发

### 包
React Router使用monorepo管理多个包的代码。这些包位于`packages`目录中。

我们使用[Yarn工作空间](https://classic.yarnpkg.com/en/docs/workspaces/)管理依赖的安装和多个脚本的运行。为安装好所有的包，确保你已经安装好了[Yarn（版本1）](https://classic.yarnpkg.com/lang/en/docs/install)，然后在仓库的根目录运行`yarn`或`yarn install`。

### 构建
根目录下执行`yarn build`就会开始构建，这应该只需要几秒就完成。把所有的包构建在一起很重要，因为`react-router-dom` 和 `react-router-native`都会把`react-router`当做一个依赖。

### 测试
运行测试用例之前，需要先构建。构建完成后，在根目录下执行`yarn test`命令，就会运行**每一个**包的测试用例。如果你想运行一个特定包的测试用例，使用命令`yarn test --projects packages/<package-name>`：

```bash
# 测试所有的包
yarn test

# 只测试 react-router-dom 包
yarn test --projects packages/react-router-dom
```

## 仓库分支
为了不同的目的，仓库维护独立的的多个分支。他们的功能如下：

```
- main   > 最新版本和当前文档
- dev    > 稳定版本之间正在积极开发的代码
- v5     > 特定主要版本的最新代码
```
可能还有其他分支用于各种功能和实验，但所有的问题都发生在这些分支上

## 新的发布版本

当发布新版本时，我们会根据发布的版本的类型，基于对应的分支策略，遵循其发布流程

### `react-router@next` 版本

我们从 `dev` 分支的当前状态创建实验版本。 可以使用 `@next` 标签安装它们：

```bash
yarn add react-router-dom@next
# 或者
npm install react-router-dom@next
```
这些版本都会被自动当做PR合并到`dev`分支。

### 最近的主版本

```bash
# 从dev分支开始
git checkout dev

# 合并main分支到dev分支，确保热修复(hotfixes)
# 更新当前版本的文档
git merge main

# 从dev分支创建一个新的版本分支
git checkout -b release/v6.1.0

# 创建一个新标签并更新整个代码库中的版本引用
yarn run version minor # | "patch" | "major"

# 将release分支与新的release标签一起推送
git push origin release/v6.1.0 --follow-tags


# 等待 GitHub actions运行所有测试。 如果测试通过，则release版本准备就绪！ 将release分支合并到 main 和 dev 中
git checkout main
git merge release/v6.1.0
git checkout dev
git merge release/v6.1.0

# 删除release分支
git branch -D release/v6.1.0
git push origin --delete release/v6.1.0

# 现在转到 GitHub 并从新标签创建release。 剩下的就交给 GitHub Actions 吧！
```

### 热修复发布版本
有时我们有一个非常严重的bug需要马上被修复。如果bug影响到了最近的版本，我们可以从`main`分支（或bug存在的相关的主要release分支）直接创建一个新的版本

```bash
# 在主分支中，确保在创建新版本之前运行构建命令，并运行所有测试用例
yarn && yarn build && yarn test

# 假设测试通过，创建发布标签并更新整个代码库中的版本引用。
yarn run version patch

# 将更改与新的发布标签一起推送
git push origin main --follow-tags

# 在github中，从新标签中创建版本，它将通过 GitHub Actions 发布

# 热修复完成后，将更改合并到 dev 并根据需要清理冲突
git checkout dev
git merge main
git push origin dev
```
