import { useState } from 'react';
import { StepProps } from 'antd';

export const useCreateAnnouncementStep = () => {
    const [step, setStep] = useState(0);
    const itemsStep: StepProps[] = [
        {
            title: 'รายละเอียด',
        },
        {
            title: 'ไฟล์ที่เกี่ยวข้อง',
        },
        {
            title: 'ขอบเขตประกาศ',
        },
        {
            title: 'ยืนยัน',
        },
    ];
    const nextStep = (): void => {
        if (step <= itemsStep.length - 2) {
            setStep(step + 1);
        }
    };
    const prevStep = (): void => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return { itemsStep, step, nextStep, prevStep };
};
