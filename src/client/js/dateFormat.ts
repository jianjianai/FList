
/**
 * 将时间格式化为 yyyy-mm-dd hh:mm
 * */
export function dateFormat(dateNumber: number|undefined): string {
    if(!dateNumber){
        return '未知';
    }
    const date = new Date(dateNumber);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
}
