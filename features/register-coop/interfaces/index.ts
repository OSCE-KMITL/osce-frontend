import { RegisterOptions } from 'react-hook-form';
import { ICurriculum, IDepartment, IFaculty } from '@constants/faculty-info/interfaces';

export interface ISkillState {
    skill_name: string;
    leveL: string;
}
export interface LanguageAbility {
    skill_name: string;
    leveL: string;
}

type SkillsState = ISkillState[] | null;
type LanguageAbilityState = LanguageAbility[] | null;

export interface IUserFacultyState {
    faculty: IFaculty | null;
    department: IDepartment | null;
    curriculum: ICurriculum | null;
    birth_date: string | null;
    skills: SkillsState;
    Language_abilities: LanguageAbilityState;
}

export interface RegisterCoopHookState {
    name: string;
    lastname: string;
    student_id: string;
    gpa: string;
    faculty: string;
    department: string;
    curriculum: string;
    citizen_id: string;
    address: string;
    gender: string;
    religion: string;
    military_status: any;
    driver_license: any;
    emer_name: string;
    emer_tel: string;
    emer_relation: string;
    emer_lastname: string;
}

interface RegisterError {
    emer_name: RegisterOptions;
    emer_lastname: RegisterOptions;
    emer_tel: RegisterOptions;
    emer_relation: RegisterOptions;
    gender: RegisterOptions;
    religion: RegisterOptions;
    phone_number: RegisterOptions;
    lastname: RegisterOptions;
    weight: RegisterOptions;
    height: RegisterOptions;
    citizen_id: RegisterOptions;
    address: RegisterOptions;
    // curriculum: RegisterOptions;
    // department: RegisterOptions;
    // driver_license: RegisterOptions;
    // faculty: RegisterOptions;
    // gender: RegisterOptions;
    gpa: RegisterOptions;
    // military_status: RegisterOptions;
    name: RegisterOptions;
    // religion: RegisterOptions;
}

export const regExPattern = {
    gpa: new RegExp(/^[0-4]\.\d\d$/),
    only_thai: new RegExp('^[ก-๏s]+$'),
    student_id: new RegExp('[0-9]{8}'),
    phone_number: new RegExp('[0]{1}[0-9]{9}'),
};

const onSelected = (value: string) => {
    if (value === 'DEFAULT') {
        return 'กรุณาให้ข้อมูล';
    }
};

export const registerErrorSchema: RegisterError = {
    emer_relation: { validate: (value) => onSelected(value) },
    emer_tel: {
        required: 'กรุณากรอกเบอร์โทรศัพท์',
        pattern: { value: regExPattern.phone_number, message: 'รูปแบบไม่ถูกต้อง eg: 0612345678' },
        minLength: { value: 10, message: 'กรอกเบอร์โทร 10 หลัก' },
        maxLength: { value: 10, message: 'กรอกเบอร์โทร 10 หลัก' },
    },
    gender: { validate: (value) => onSelected(value) },
    religion: { validate: (value) => onSelected(value) },
    phone_number: {
        required: 'กรุณากรอกเบอร์โทรศัพท์',
        pattern: { value: regExPattern.phone_number, message: 'รูปแบบไม่ถูกต้อง eg: 0612345678' },
        minLength: { value: 10, message: 'กรอกเบอร์โทร 10 หลัก' },
        maxLength: { value: 10, message: 'กรอกเบอร์โทร 10 หลัก' },
    },
    height: {
        required: 'กรุณากรอกส่วนสูง',
        min: { value: 50, message: 'กรอกส่วนสูงไม่ต่ำกว่า 90 cm' },
        max: { value: 250, message: 'กรอกส่วนสูงไม่เกิน 250 cm' },
    },
    weight: {
        required: 'กรุณากรอกส่วนสูง',
        min: { value: 30, message: 'กรอกน้ำหนักไม่ต่ำกว่า 25 kg' },
        max: { value: 250, message: 'กรอกน้ำหนักไม่เกิน 250 kg' },
    },
    gpa: {
        required: { value: true, message: 'กรุณากรอกเกรดเฉลี่ย' },
        pattern: { value: regExPattern.gpa, message: 'รูปแบบไม่ถูกต้อง eg: 3.25' },
        maxLength: 4,
        max: { value: 4.0, message: 'เกรดไม่ควรมีค่ามากกว่า 4' },
        min: { value: 1, message: 'เกรดไม่ควรมีน้อยกว่า 1' },
    },
    emer_name: { required: 'กรุณากรอกชื่อ', pattern: { value: regExPattern.only_thai, message: 'กรอกชื่อภาษาไทย' }, maxLength: 50 },
    emer_lastname: { required: 'กรุณากรอกนามสกุล', pattern: { value: regExPattern.only_thai, message: 'กรอกนามสกุลภาษาไทย' }, maxLength: 50 },
    name: { required: 'กรุณากรอกชื่อ', pattern: { value: regExPattern.only_thai, message: 'กรอกชื่อภาษาไทย' }, maxLength: 50 },
    lastname: { required: 'กรุณากรอกนามสกุล', pattern: { value: regExPattern.only_thai, message: 'กรอกนามสกุลภาษาไทย' }, maxLength: 50 },
    citizen_id: {
        required: { value: true, message: 'กรอกรหัสบัตรประจำตัวประชาชน' },
        minLength: { value: 13, message: 'รหัสบัตรประจำตัวประชาชน 13 หลัก' },
        maxLength: { value: 13, message: 'รหัสบัตรประจำตัวประชาชน 13 หลัก' },
        pattern: { value: new RegExp('[0-9]{13}'), message: 'รูปแบบไม่ถูกต้อง' },
    },
    address: {
        required: true,
        maxLength: { value: 500, message: 'ข้อมูลที่อยู่จำนวนข้อความเยอะเกินไป' },
        minLength: { value: 10, message: 'ข้อมูลที่อยู่น้อยเกินไป' },
    },

    /*    curriculum: RegisterOptions,
    department: RegisterOptions,
    faculty: RegisterOptions,
    gender: RegisterOptions,
    gpa: RegisterOptions,

    military_status: RegisterOptions,
    name: RegisterOptions,
    religion: RegisterOptions,
    student_id: RegisterOptions,*/
};
