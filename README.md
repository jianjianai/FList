# FList - 一个简洁的在线文件列表 
将 GitHub Releases,Hugging Face,文件url等，渲染成类似网盘的文件列表显示在网页上，方便用户下载开源软件。
支持视频、音频、图片、PDF 等文件的在线预览。
![image](https://github.com/user-attachments/assets/1ec0bc23-6fdb-45c6-a58b-1db13864aed7)


### 演示站
- Cloudflare Pages -> [https://demo.flist.jjaw.cn/](https://demo.flist.jjaw.cn/)
- Vercel -> [https://demo1.flist.jjaw.cn/](https://demo1.flist.jjaw.cn/)
- Netlify -> [https://demo2.flist.jjaw.cn/](https://demo2.flist.jjaw.cn/)

### 创建自己的Flist
[-> 点击前往 <-](https://jjaw.cn/2024/8/3/flist-fast-start/)

## 为什么选择 FList
- 💵 **低成本**：无需数据库，无需服务器，Cloudflare Pages、GitHub Pages、Vercel、Netlify 等都可以轻松部署，**使用成本几乎为零**。
- 🧰 **丰富**：支持视频、音频、图片、PDF 文件的在线预览。
- 📦 **开箱即用**：只需简单配置，即可开箱即用，无需繁琐操作。
- 🔎 **搜索引擎友好**：静态页面生成，这使得页面上的内容可被搜索引擎很好的抓取

> [!tip]
> FList 正在积极开发，支持更多平台。

## 支持情况
### 挂载文件
直接将这些平台的文件挂载到 FList 列表中。

- [X] GitHub Releases
- [X] GitHub Repos
- [X] Gitee 发行版
- [X] Hugging Face Datasets
- [X] URL 下载链接

### 部署
支持部署到这些平台上。

- [X] Cloudflare Pages
- [X] Vercel
- [X] Netlify
- [X] GitHub Pages

### 下载代理
支持从这些平台代理下载文件

- [X] Cloudflare Pages
- [X] Vercel
- [X] Netlify

## 他是如何工作的?
Flist 的工作原理很像是一个爬虫，它可以获取各个平台上的文件下载链接，之后将这些文件渲染成 HTML 静态页面，当用户下载文件时实际上会从原站下载。

由于某些平台的下载速度不佳，所以 Flist 还可以配置下载代理，当用户需要下载或者预览时可以通过代理链接下载。

Flist 本质是一个 [VuePress](https://vuepress.vuejs.org/zh/guide/) 的主题。也因此具有非常好的加载性能和搜索引擎优化（SEO）。

## 为什么不是...?
### Alist
Alist 支持挂载的网盘比 Flist 要丰富得多，但是 Alist 部署和使用成本要比 Flist 高太多。
Alist 是一个程序，需要在可执行的平台上运行，还需要搭配一个数据库使用。
而 Flist 就是为**零成本**，**长期分享**而生的，可以在任何边缘服务器上运行。例如 Cloudflare，Vercel，GitHub Pages等，这些平台都是免费的。

### zfile
ZFile 是一个适用于个人的在线网盘程序，需要java运行环境才能运行，和 Alist 部署和使用成本要比 Flist 高太多。
而 Flist 就是为**零成本**，**长期分享**而生的，可以在任何边缘服务器上运行。例如 Cloudflare，Vercel，GitHub Pages等，这些平台都是免费的。

## 交流社区
- qq群：[768230849](https://qm.qq.com/q/aQxQYRVNaE)

## 鸣谢
#### 以下是用到的工具或库，感谢这些项目的作者们的辛苦付出
- [Vue.js](https://github.com/vuepress/core) -- 渐进式 JavaScript 框架
- [VuePress](https://github.com/vuepress/core) -- 一款基于 `Vue` 的静态网站生成器
- [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) -- 一款基于 `HTML5` 的视频播放器
- [APlayer](https://github.com/DIYgod/APlayer) -- 一款开源的音乐播放器
- [v-viewer](https://github.com/mirari/v-viewer) -- `Vue3` 图片浏览组件
- [pdf-vue3](https://github.com/hymhub/pdf-vue3) -- `Vue3` PDF 组件
- [iconshock](https://www.iconshock.com/) -- 图标库
- [@vuepress/plugin-nprogress](https://www.npmjs.com/package/@vuepress/plugin-nprogress) -- 在切换到另一个页面时会展示进度条。
