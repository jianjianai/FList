# FList - 一个简洁的在线文件列表
将 GitHub Releases,文件下载url等,以类似网盘的形式展示在网页上，方便用户下载开源软件。
支持视频、音频、图片、PDF 等文件的在线预览。
![image](https://github.com/user-attachments/assets/1ec0bc23-6fdb-45c6-a58b-1db13864aed7)


## 为什么选择 FList
- **轻量**：静态页面生成，无需数据库，无需服务器，Cloudflare Pages、Github Pages、Vercel、Netlify等都可以轻松部署，完全免费。
- **便捷**：支持视频、音频、图片、PDF 文件的在线预览。
- **开箱即用**：只需简单配置，即可开箱即用，无需繁琐操作。
- **搜索引擎友好**：静态页面生成，这使得页面上的内容可被搜索引擎很好的抓取

## 体验
### 演示站
- https://flistd.pages.dev/
- https://demo.flist.jjaw.cn/


体验完之后，是不是想拥有自己的 ```FList``` 了呢，接下来就是教程时间啦！


# **拥有自己的 ```Flist``` 一共三步**
1. 配置：了解如何配置 ```FList``` 的配置文件
2. 编辑：使用自己喜欢的工具编辑配置文件并预览效果
3. 部署：部署到自己喜欢的平台


## 1. 配置

### 配置文源基础
一些必须要了解的东西
<details>
<summary>展开查看</summary>

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
</details>

### 挂载 GitHub Releases
将 GitHub Releases 挂载到网盘上
<details>
<summary>展开查看</summary>

#### 基础
将 ```jianjianai``` 的 ```FList``` 仓库挂载到根目录 ```/``` 下

- mountPath: 挂载路径,就是将文件源中的文件放到什么路径下
- analysis: 文件源分析器，这里使用的是 ```githubReleasesFilesAnalysis```，用于解析 GitHub Releases 中的文件
``` typescript
{
  mountPath:"/",
  analysis:githubReleasesFilesAnalysis({user:"jianjianai", repository:"FList"})
}
```
这样就把 ```jianjianai``` 的 ```FList``` 仓库挂载到了根目录 ```/``` 下了。

#### 配置代理
如果直接从GitHub下载速度可能不佳。 并且由于跨域的原因，PDF，TXT，这些文件无法预览，只能下载。（视频图片音频可以预览）。建议配置下载代理。

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

#### githubReleasesFilesAnalysis 特性
```githubReleasesFilesAnalysis``` 会将  ```GitHub Releases```
中的每个标签解析为一个目录，标签下发行的文件放到这个目录中。例如:
- ```v1.0``` -> ```/v1.0```
- ```v1.1``` -> ```/v1.1```

如果想要将文件放到```/```下可以将标签名称命名为 ```root```,在 ```root``` 标签下的文件会被放到 ```/``` 下。


如果想要将文件放到更深的目录下，则可以在标签中使用```/```。例如
- ```v1.0/test``` -> ```/v1.0/test```
- ```test/test2``` -> ```/test/test2```

</details>

### 挂载 URL 下载地址
如果拥有某个文件的加载地址，也可以将其挂载到 FList 上。
<details>
<summary>展开查看</summary>

#### 基础
将 ```https://example.com/test.jpg``` 的文件挂载到 ```/example``` 下,有两种配置文件分析器的的方式。

1. 将挂载路径设置到```/example```下，之后配置 ```fileUrlTreeAnalysis``` ,将文件放到 ```/``` 下。
``` typescript
{
  mountPath:"/example",
  analysis:fileUrlTreeAnalysis({
    "/test.jpg":"https://example.com/test.jpg"
  }),
}
```

2. 将挂载路径设置到```/```下，之后配置 ```fileUrlTreeAnalysis``` ,将文件放到 ```/example``` 下。
``` typescript
{
  mountPath:"/",
  analysis:fileUrlTreeAnalysis({
    "/example/test.jpg":"https://example.com/test.jpg"
  }),
}
```

```fileUrlTreeAnalysis``` 可以一次分析多个文件。

``` typescript
{
  mountPath:"/",
  analysis:fileUrlTreeAnalysis({
    "/example/test.jpg":"https://example.com/test.jpg",
    "/test1.jpg":"https://example.com/test1.jpg",
    "/test/test2.jpg":"https://example.com/test2.jpg",
    "/example/test3.jpg":"https://example.com/test3.jpg",
    "/example/test/test4.jpg":"https://example.com/test4.jpg",
    .....
  }),
}
```

#### 配置代理

如果您的文件下载地址访问速度不佳。 或者由于跨域的原因，PDF，TXT，这些文件无法预览，可以配置代理。

如果你使用 ```Cloudflare Pages``` 则可以直接使用 ```cloudflarePagesDownProxy()``` 他会自动完成全部配置，
并且在开发阶段也有很好的预览体验。

- downProxy: 下载代理，设计上可以支持各种不同的代理，但是目前只有 ```cloudflarePagesDownProxy```。
``` typescript
{
  mountPath:"/",
  analysis:fileUrlTreeAnalysis({
    "/example/test.jpg":"https://example.com/test.jpg",
    ....
  }),
  downProxy:cloudflarePagesDownProxy(),
}
```

如果只想代理部分文件，可以将文件分析器分为两个来配置
``` typescript
// 不需要代理的文件
{
  mountPath:"/",
  analysis:fileUrlTreeAnalysis({
    "/example/test.jpg":"https://example.com/test.jpg",
    ....
  }),
},
// 需要代理的文件
{
  mountPath:"/",
  analysis:fileUrlTreeAnalysis({
    "/example/test1.jpg":"https://example.com/test1.jpg",
    ....
  }),
  downProxy:cloudflarePagesDownProxy(),
}
```

</details>


## 2. 编辑配置文件
在编辑配置文件之前，首先需要 Fork 此仓库。

### 直接在GitHub上修改(容易写错配置文件(没有代码提示) 无法预览)
<details>
<summary>展开查看</summary>

在自己Fork的仓库打开配置文件
![image](https://github.com/user-attachments/assets/02d5c9f4-9636-4b4b-b021-2f01c25f29b8)

点击编辑按钮
![image](https://github.com/user-attachments/assets/287f1595-e14f-4f8a-8136-900f44502adb)

编辑好之后点击提交
![image](https://github.com/user-attachments/assets/07052290-2453-4247-b248-f3c890920bb0)

![image](https://github.com/user-attachments/assets/0a92a00c-a9df-4792-abdb-0c8212b099bd)


</details>

### 使用在线IDE编辑器修改(最推荐！没门槛)

<details>
<summary>展开查看</summary>

#### StackBlitz

<details>
<summary>展开查看</summary>
打开 StackBlitz 的主页 [https://stackblitz.com/](https://stackblitz.com/)

![image](https://github.com/user-attachments/assets/7e470478-617d-4507-a686-9aa89465a1fb)

![image](https://github.com/user-attachments/assets/f1294d54-d833-4439-b00f-fcff1b36a776)

![image](https://github.com/user-attachments/assets/b58f55f0-aa44-4f5c-938b-9788430e6bcf)

![image](https://github.com/user-attachments/assets/93bf3493-202d-4806-96b3-2d0e56c41e45)

等等项目加载，如果右边的等等部分出现红色则可能是因为网络原因失败了，这个时候刷新网页，重新加载。
![image](https://github.com/user-attachments/assets/664c53b1-d470-4b01-b08e-aeca6a2f3252)

直到右边出现预览则成功 (因为 StackBlitz 是运行在浏览器上的所以配置了代理的文件无法预览)
![image](https://github.com/user-attachments/assets/dce389fc-0eae-424a-9b8a-eecde75859b9)

打开配置文件编辑。
![image](https://github.com/user-attachments/assets/39a86ceb-b078-4922-9035-55c7a86743e1)

编辑好后按 Ctrl+S 保存当前文件即可马上预览效果。
![image](https://github.com/user-attachments/assets/cd205dec-f1cb-4301-abe8-a36624f19396)

注意红色的波浪线，这表示你的配置文件格式写错了，错误的配置文件会导致网页无法构建。下图的 ```mountPath``` 拼错了一个字母，被编辑器检查出来了。
![image](https://github.com/user-attachments/assets/efc007b7-5b9e-43e1-9d3c-e238dec114f7)

编辑完成之后就可以将文件推送到GitHub上了
![image](https://github.com/user-attachments/assets/6dbc7070-5ef5-4e7f-b7e7-ae9c1fa7d3a5)


</details>

#### Gitpod

<details>
<summary>展开查看</summary>
打开 Gitpod 主页 [https://gitpod.io/](https://gitpod.io/)

![image](https://github.com/user-attachments/assets/825489e1-5945-4b89-9df1-255fe6037844)

使用 GitHub 登录
![image](https://github.com/user-attachments/assets/374312ff-be37-47b6-b6c7-725081fff24d)

![image](https://github.com/user-attachments/assets/f75e6631-4ab2-4c67-8a1f-edcae028502e)

![image](https://github.com/user-attachments/assets/7cbe5f34-b8b5-4476-a302-142ed8e700a0)

打开仓库，很快就加载好了
![image](https://github.com/user-attachments/assets/fb73dbbc-ec98-4878-9669-c8fd1c4dc601)

按住 ctrl 点击链接可以打开新标签页预览
![image](https://github.com/user-attachments/assets/eb21a234-8873-4639-8b79-de019f97e102)

点击打开配置文件即可开始编辑
![image](https://github.com/user-attachments/assets/265fc70e-5fef-48d7-8a24-0178c519dbe7)

注意红色的波浪线，这表示你的配置文件格式写错了，错误的配置文件会导致网页无法构建。下图的 ```mountPath``` 拼错了一个字母，被编辑器检查出来了。
![image](https://github.com/user-attachments/assets/79f5fdc1-cc17-470b-88c8-4dd91f52a011)

编辑完成后提交文件
![image](https://github.com/user-attachments/assets/bcee629a-ae03-4a0b-ab9a-4c59d5dbe5b8)

提交之后再次点击即可将文件同步到 GitHub
![image](https://github.com/user-attachments/assets/adaf308e-e09c-4bf7-ac1e-dd53368ff7c1)


</details>

</details>

#### 下载代码本地修改(需要熟悉开发流程)



## 2. 部署
### Cloudflare Pages (推荐！最完整的功能)
<details>
<summary>展开查看</summary>

懂得小伙伴都懂，看这两行就够了。

- Build command
``` shell
pnpm run build
```
- Build output directory
``` shell
.vuepress/dist
```

### 详细教学
不懂的话展开详细教学吧。

#### 1.Fork此仓库

![image](https://github.com/user-attachments/assets/03ce03d2-0171-4731-9e9a-bcb4ed57356b)
![image](https://github.com/jianjianai/microsoft-copilot-porxy/assets/59829816/3a4be71a-bd12-4938-add8-00998c5ca0aa)





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
