import { message } from 'antd';

export default class MessageService {
    private static instance: MessageService;
    public static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }

    public success(content: string) {
        message.success(content);
    }
    public error(content: string) {
        message.error(content);
    }
    public warning(content: string) {
        message.warning(content);
    }
    public info(content: string) {
        message.info(content);
    }
    public loading(content: string) {
        message.loading(content);
    }
}
