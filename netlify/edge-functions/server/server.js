async function downloadProxy(request, proxyConfig2) {
  const requestUrl = new URL(request.url);
  let downUrlString = proxyConfig2[requestUrl.pathname];
  if (!downUrlString) {
    return new Response("not found", { status: 404 });
  }
  let downUrl;
  try {
    downUrl = new URL(downUrlString);
  } catch (error) {
    return new Response("url error: " + error, { status: 404 });
  }
  let headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("referer");
  headers.delete("origin");
  let res = await fetch(downUrl, {
    method: request.method,
    headers,
    body: request.body
  });
  return new Response(res.body, {
    headers: res.headers,
    status: res.status
  });
}
const proxyConfig = {"/api/netlifydown/2085881677/videoplayback.2.webm":"https://github.com/jianjianai/FList/releases/download/test2/deep/videoplayback.2.webm","/api/netlifydown/2114510828/videoplayback.3.webm":"https://github.com/jianjianai/FList/releases/download/test2/deep/videoplayback.3.webm","/api/netlifydown/-942376574/hahahah.txt":"https://github.com/jianjianai/FList/releases/download/test.tag/hahahah.txt","/api/netlifydown/1080457226/Venemy.Divercity.-.LUV.mp3":"https://github.com/jianjianai/FList/releases/download/test.tag/Venemy.Divercity.-.LUV.mp3","/api/netlifydown/1348309713/FList.1.mp4":"https://github.com/jianjianai/FList/releases/download/root/FList.1.mp4","/api/netlifydown/2045258915/FList.FList.mp3":"https://github.com/jianjianai/FList/releases/download/root/FList.FList.mp3","/api/netlifydown/2045258916/FList.FList.mp4":"https://github.com/jianjianai/FList/releases/download/root/FList.FList.mp4","/api/netlifydown/209410934/test.img.1.jpg":"https://github.com/jianjianai/FList/releases/download/root/test.img.1.jpg","/api/netlifydown/210334455/test.img.2.jpg":"https://github.com/jianjianai/FList/releases/download/root/test.img.2.jpg","/api/netlifydown/-336968624/test.markdown.1.md":"https://github.com/jianjianai/FList/releases/download/root/test.markdown.1.md","/api/netlifydown/113356839/test.music.1.mp3":"https://github.com/jianjianai/FList/releases/download/root/test.music.1.mp3","/api/netlifydown/1049209462/test.pdf.1.pdf":"https://github.com/jianjianai/FList/releases/download/root/test.pdf.1.pdf","/api/netlifydown/-1849018638/test.txt.1.txt":"https://github.com/jianjianai/FList/releases/download/root/test.txt.1.txt","/api/netlifydown/721015489/test.video.1.1080p.webm":"https://github.com/jianjianai/FList/releases/download/root/test.video.1.1080p.webm","/api/netlifydown/850098208/test.video.2.1080p.webm":"https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm","/api/netlifydown/31577074/test.video.3.1080p.mkv":"https://github.com/jianjianai/FList/releases/download/root/test.video.3.1080p.mkv","/api/netlifydown/-1765374285/test.video.4.1080p.mkv":"https://github.com/jianjianai/FList/releases/download/root/test.video.4.1080p.mkv","/api/netlifydown/-136742171/test.video.5.8K.mp4":"https://github.com/jianjianai/FList/releases/download/root/test.video.5.8K.mp4","/api/netlifydown/850098208/%E6%96%87%E4%BB%B6%E6%A0%91-%E6%B5%8B%E8%AF%95%E8%A7%86%E9%A2%911.mp4":"https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm"}
export default (req)=>downloadProxy(req,proxyConfig);