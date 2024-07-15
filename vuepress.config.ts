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
      mountPath:"",
      analysis:githubReleasesFilesAnalysis({ user:"jianjianai",repository:"alist-github-releases-files" }),
      downProxy:cloudflarePagesDownProxy(),
    }
  ])
})