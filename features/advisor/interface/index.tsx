import { IStudent } from '@features/student/interfaces/Student';

export interface IAdvisor {
    advisor_id: string;

    name: string;

    name_prefix: string;

    last_name: string;

    faculty: string;

    department: string;

    students: IStudent[];

    is_committee: Boolean;

    created_at: Date;

    updated_at: Date;
}
