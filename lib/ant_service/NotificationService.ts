import { notification } from 'antd';

export default class NotificationService {
    private static instance: NotificationService;
    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }

        return NotificationService.instance;
    }

    public success(title: string, description: string) {
        notification.success({
            message: title,
            description: description,
        });
    }
    public error(title: string, description: string) {
        notification.error({
            message: title,
            description: description,
        });
    }

    public warn(title: string, description: string) {
        notification.warning({
            message: title,
            description: description,
        });
    }

    public info(title: string, description: string) {
        notification.info({
            message: title,
            description: description,
        });
    }
}
