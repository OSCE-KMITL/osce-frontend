import { IStudent } from '@features/student/interfaces/Student';
import { IDepartment, IFaculty } from '@constants/faculty-info/interfaces';

export interface IAdvisor {
    advisor_id: string;

    name_prefix: string;

    name: string;

    name_en?: string;

    last_name_en?: string;

    last_name: string;

    faculty: IFaculty;

    department: IDepartment;

    students: IStudent[];

    is_committee: boolean;

    created_at: Date;

    updated_at: Date;
}
