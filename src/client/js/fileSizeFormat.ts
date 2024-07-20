
/**
 * 将文件大小格式化为 B KB MB GB TB 单位显示
 * */
export function fileSizeFormat(size: number|undefined): string {
  if(!size){
    return '未知';
  }
  if (size < 1024) {
    return size + 'B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB';
  } else if (size < 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB';
  } else {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + 'TB';
  }
}