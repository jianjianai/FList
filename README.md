# FList - 一个简洁的在线文件列表
将 GitHub Releases 以类似网盘的形式展示在网页上，方便用户下载开源软件。
支持视频、音频、图片、PDF 等文件的在线预览。

## 为什么选择 FList
- **轻量**：静态页面生成，无需数据库，无需服务器，Cloudflare Pages、Github Pages、Vercel、Netlify等都可以轻松部署，完全免费。
- **便捷**：支持视频、音频、图片、PDF 文件的在线预览。
- **开箱即用**：只需简单配置，即可开箱即用，无需繁琐操作。
- **搜索引擎友好**：静态页面生成，这使得页面上的内容可被搜索引擎很好的抓取

## 体验
### 演示站
- https://flistd.pages.dev/
- https://demo.flist.jjaw.cn/

## 部署
### Cloudflare Pages (推荐！最完整的功能)
<details>
<summary>展开查看</summary>

- Build command
``` shell
pnpm run build
```
- Build output directory
``` shell
.vuepress/dist
```

</details>


## 配置

### 配置文源
所有的配置文件都在 [vuepress.config.ts](vuepress.config.ts) 文件中，你可以根据自己的需求进行修改。


所有有关网盘的配置都在 ```FileList``` 函数的参数中。```FileList``` 接收一个文件数组，可以配置挂载多个文件源。


***注意，每个对象都要用```{}```包裹，每个对象之间用```,```隔开。*** 例：
``` typescript
export default defineUserConfig({
    ....
    theme: FileList([
        {...},
        {...},
        {...},
        {...}
    ]),
    .....
});
```
下面的所有配置示例都是 ```FileList``` 函数的参数数组中的一个对象的示例。

#### 挂载 GitHub Releases

<details>
<summary>展开查看</summary>

将 ```jianjianai``` 的 ```FList``` 仓库挂载到根目录 ```/``` 下

- mountPath: 挂载路径,就是将文件源中的文件放到什么路径下
- analysis: 文件源分析器，这里使用的是 ```githubReleasesFilesAnalysis```，用于解析 GitHub Releases 中的文件
``` typescript
{
  mountPath:"/",
  analysis:githubReleasesFilesAnalysis({user:"jianjianai", repository:"FList"})
}
```
这样就把 ```jianjianai``` 的 ```FList``` 仓库挂载到了根目录 ```/``` 下了。但是如果直接从GitHub下载速度可能不佳。
并且由于跨域的原因，PDF，TXT，这些文件无法预览，只能下载。（视频图片音频可以预览）。建议配置下载代理。

如果你使用 ```Cloudflare Pages``` 则可以直接使用 ```cloudflarePagesDownProxy()``` 他会自动完成全部配置，
并且在开发阶段也有很好的预览体验。

- downProxy: 下载代理，设计上可以支持各种不同的代理，但是目前只有 ```cloudflarePagesDownProxy```。
``` typescript
{
  mountPath:"/",
  analysis:githubReleasesFilesAnalysis({user:"jianjianai", repository:"FList"}),
  downProxy:cloudflarePagesDownProxy(),
}
```

</details>



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
