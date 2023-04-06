import { RoleOption } from '@constants/RoleOptions';
import { IStudent } from '@features/student/interfaces/Student';
import { IAdvisor } from '@features/advisor/interface';

export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    BAN = 'BAN',
    INACTIVE = 'INACTIVE',
}

export interface IAccount {
    id: string;

    email: string;

    password: string;

    role: RoleOption;

    is_student?: IStudent;

    is_advisor?: IAdvisor;

    status: AccountStatus;

    profile_image?: string;

    google_id?: string;

    created_at: Date;

    updated_at: Date;
}
