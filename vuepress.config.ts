import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { FileList } from './src/node/index.js'
import {cloudflarePagesDownProxy} from "./src/node/proxy/cloudflarePages/cloudflarePages.js";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: FileList([
    {type:"githubReleases",mountPath:"",downProxy:cloudflarePagesDownProxy,config:{user:"jianjianai",repository:"alist-github-releases-files"}}
  ]),
  pagePatterns:[]
})