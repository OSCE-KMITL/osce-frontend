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

const MonthMap = {
    JANUARY: 'มกราคม',
    FEBRUARY: 'กุมภาพันธ์',
    MARCH: 'มีนาคม',
    APRIL: 'เมษายน',
    MAY: 'พฤษภาคม',
    JUNE: 'มิถุนายน',
    JULY: 'กรกฎาคม',
    AUGUST: 'สิงหาคม',
    SEPTEMBER: 'กันยายน',
    OCTOBER: 'ตุลาคม',
    NOVEMBER: 'พฤศจิกายน',
    DECEMBER: 'ธันวาคม',
};

export function formatDateToThai(dateTimeString: string): string {
    const utcDate = new Date(dateTimeString);
    const localDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000); // add 7 hours for ICT time zone
    const month = localDate.toLocaleString('default', { month: 'long' });
    const thaiYear = localDate.getFullYear() + 543; // convert to Thai year
    const thaiMonth = MonthMap[month.toUpperCase()];
    const thaiDay = localDate.getDate();

    return `${thaiDay} ${thaiMonth} ${thaiYear}`;
}
