import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { FileList } from './src/node/index.js'
import {githubReleasesFilesAnalysis} from "./src/node/analysis/GithubReleasesFilesAnalysis.js";
import {cloudflarePagesDownProxy} from "./src/node/proxy/cloudflarePages/cloudflarePages.js";

export default defineUserConfig({
  bundler: viteBundler(),
  pagePatterns:[],
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