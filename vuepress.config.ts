import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { FileList } from './src/node/index.js'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: FileList([
    {path:"",user:"jianjianai",repository:"alist-github-releases-files"}
  ]),
  pagePatterns:[]
})