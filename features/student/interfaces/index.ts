import { ISkillState, ILanguageAbility, TranscriptState } from '@features/register-coop/interfaces';
import { UploadFileInput } from '@features/upload/hooks/useUploadFile';

export interface CoopStudentInfo {
    level_id: string;
    curriculum_id: string;
    curriculum_name_th: string;
    curriculum_name_en: string;
    name_th: string;
    lastname_th: string;
    gpa: string;
    gender: string;
    religion: string;
    military_status: boolean;
    driver_license: boolean;
    citizen_id: string;
    weight: string;
    height: string;
    address: string;
    phone_number: string;
    emer_relation: string;
    emer_name: string;
    emer_lastname: string;
    emer_tel: string;
    birth_date: string;
    faculty_id: string;
    faculty_name_th: string;
    faculty_name_en: string;
    department_id: string;
    department_name_en: string;
    department_name_th: string;
    name_prefix: string;
}

export enum CoopStatus {
    DEFAULT = 'DEFAULT',
    APPLYING = 'APPLYING',
    PASSED = 'PASSED',
    REJECTED = 'REJECTED',
}

export type RegisterCoopPayload = {
    registerCoopInput: CoopStudentInfo;
    languageAbilities?: ILanguageAbility[];
    skills?: ISkillState[];
    transcriptFile: UploadFileInput;
};

export interface IAccount {
    email: string;
}
