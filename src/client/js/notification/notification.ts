import {reactive} from "vue";
import CircleCheckSvg from "../../imgs/ui/CircleCheckSvg.vue";

export class IconComponents {
    success = CircleCheckSvg;
}
export type NotificationType = keyof IconComponents;
export type Notification = {
    type: NotificationType;
    message: string;
}
export const notifications = reactive<{
    [key:number]:{
        notification:Notification;
        setTimeoutId:number;
    }
}>({});
export const iconComponents = new IconComponents();

let putNotificationId:number = 1;

/**弹出提示框*/
export function putNotification(notification:Notification){
    const thePutNotificationId = putNotificationId++;
    notifications[thePutNotificationId] = {
        notification:notification,
        setTimeoutId:setTimeout(()=>{
            delete notifications[thePutNotificationId];
        },3000) as any
    };
    return putNotificationId;
}

/**关闭提示框*/
export function closeNotification(putNotificationId:number){
    let the = notifications[putNotificationId];
    if(!the){
        return;
    }
    clearTimeout(the.setTimeoutId);
    delete notifications[putNotificationId];
}