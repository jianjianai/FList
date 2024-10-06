import { DownProxy } from "../../base/AllAnalysis.js";
import { writeFileSync, mkdirSync } from "fs";
import { downloadProxy } from "../cloudflarePagesDownProxy/worker/cloudflarePagesDownloadPorxy.js";
import { onExtendsBundlerOptions, onGenerated } from "../../base/eventManager.js";
import { ProxyOptions } from "vite";

/**
 * 生成一个字符串的hashcode
 * */
function hashCode(string: string): number {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const proxyConfig: { [path: string]: string } = {}


async function netlifyReleaseConfigurationFile(destPath: string) {
    mkdirSync("./.netlify/edge-functions/server", { recursive: true });
    writeFileSync("./.netlify/edge-functions/server/server.js", `${downloadProxy.toString()}\nconst proxyConfig = ${JSON.stringify(proxyConfig)}\nexport default (req)=>downloadProxy(req,proxyConfig);`);
    writeFileSync("./.netlify/edge-functions/manifest.json", JSON.stringify({
        "version": 1,
        "functions": [
            {
                "path": "/api/netlifydown/*",
                "name": "flist server handler",
                "function": "server"
            }
        ]
    }));
}

/**
 * 如果被引用了就注册生成配置文件的事件
 * */
onGenerated(async (app) => netlifyReleaseConfigurationFile(app.dir.dest()));
/**
 * 配置dev代理和netlify一样工作
 * */
onExtendsBundlerOptions(async (options, app) => {
    if (app.options.bundler.name === '@vuepress/bundler-vite') {
        const proxy: Record<string, string | ProxyOptions> = {};
        for (const proxyConfigKey in proxyConfig) {
            const proxyConfigValue = proxyConfig[proxyConfigKey];
            proxy[proxyConfigKey] = {
                target: new URL(proxyConfigValue).toString(),
                changeOrigin: true,
                rewrite: () => "",
                followRedirects: true,
            };
        }
        options.viteOptions ??= {};
        options.viteOptions.server ??= {};
        options.viteOptions.server.proxy = { ...options.viteOptions.server.proxy, ...proxy };
    }
});

async function netlifyDownProxyInner(sourceUrl: string, fileName: string, contentType?: string): Promise<string> {
    const downProxyPath = `/api/netlifydown/${hashCode(sourceUrl)}/${encodeURIComponent(fileName)}`;
    proxyConfig[downProxyPath] = sourceUrl;
    return downProxyPath;
}


/**
 * 使用netlify的下载代理
 * */
export function netlifyDownProxy(): DownProxy {
    return (sourceUrl, fileName, contentType) => netlifyDownProxyInner(sourceUrl, fileName, contentType);
}




