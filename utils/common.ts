import { CoopStatus } from '@features/student/interfaces';

export function studentIdParser(email: string) {
    try {
        const extracted = email.split('@');
        return extracted[0];
    } catch (error) {
        console.log('cant not parse this email');
    }
}

/*
 * ผ่าน object เข้ามา
 * return เปอร์เซนต์ของ
 *
 * */
export function checkIsCompleteInformation(object): number {
    const totalProps = Object.keys(object).length;
    const nullProps = Object.values(object).filter((x) => x !== null).length;
    return (nullProps / totalProps) * 100;
}

interface IResolvedStatus {
    status: string;
    status_index: number;
}

function createResolvedStatusObj(value: string, index: number): IResolvedStatus {
    return { status: value, status_index: index };
}

export function ChangeCoopStatusToThaiFormat(coop_status: CoopStatus): IResolvedStatus {
    if (coop_status === CoopStatus.REJECTED) {
        return createResolvedStatusObj('ไม่ผ่านการคัดเลือก', 4);
    } else if (coop_status === CoopStatus.APPLYING) {
        return createResolvedStatusObj('ส่งใบสมัคร', 2);
    } else if (coop_status === CoopStatus.SAVED) {
        return createResolvedStatusObj('บันทึกใบสมัคร', 1);
    } else if (coop_status === CoopStatus.PASSED) {
        return createResolvedStatusObj('ผ่านการคัดเลือก', 3);
    } else {
        return createResolvedStatusObj('No action', 0);
    }
}
