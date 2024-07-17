import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { FileList } from './src/node/index.js'
import {githubReleasesFilesAnalysis} from "./src/node/analysis/GithubReleasesFilesAnalysis.js";
import {cloudflarePagesDownProxy} from "./src/node/proxy/cloudflarePages/cloudflarePages.js";

/**
 * 站点配置文件，没有注释的选项如果不知道有什么作用不建议修改，有注释的选项可以根据注释修改
 * */
export default defineUserConfig({
  bundler: viteBundler(),
  pagePatterns:[],
  lang: 'zh-CN',
  public: `./public`,
  // 网站标题，标题颜色可在 src/client/css/main.css 中修改
  title: 'FList',
  // 网站的简介，有助于搜索引擎收录
  description: 'FList - 将 GitHub Releases 以类似网盘的形式展示在网页上，方便用户下载开源软件。 支持视频、音频、图片、PDF 等文件的在线预览。',
  // 页面 <head> 标签内添加的额外标签。 不要修改/logo.png可以替换掉这个文件，删除logo.png会导致构建出错。
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  // 页面预加载，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做。
  // 简单来说就是，如果你的文件不多就可以打开这个选项，可以大大提高页面切换的速度，如果文件非常多就不建议打开。
  shouldPrefetch: true,
  theme: FileList([
    {
      // 挂载路径
      mountPath:"/KnapsackToGo4下载",
      // 文件解析器，目前只有一个 就是githubReleasesFilesAnalysis,可以解析github的release文件
      analysis:githubReleasesFilesAnalysis({
        // 仓库所有者的用户名
        user:"jianjianai",
        // 仓库所有者的仓库名
        repository:"KnapsackToGo4"
      }),
      // 代理，目前只有一个 就是 cloudflarePagesDownProxy,可以使用cloudflare Pages代理下载
      // 这个是为了解决github的国内下载慢的问题，和跨域问题，建议配置，不然pdf，txt，md等文件因为跨域无法预览
      // 如果你使用的不是 cloudflare Pages 部署需要删掉这一行，因为如果不是cloudflare Pages部署，这个代理是无法正常工作的
      downProxy:cloudflarePagesDownProxy(),
    },
    {
      mountPath:"/BewlyBewly下载",
      analysis:githubReleasesFilesAnalysis({user:"BewlyBewly", repository:"BewlyBewly"}),
    },
    {
      mountPath:"/",
      analysis:githubReleasesFilesAnalysis({user:"jianjianai", repository:"FList"}),
      downProxy:cloudflarePagesDownProxy(),
    }
    // ... 可以配置多个挂载路径和仓库，以此类推
  ])
})