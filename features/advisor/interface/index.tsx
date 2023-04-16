import { IStudent } from '@features/student/interfaces/Student';
import { IDepartment } from '@constants/faculty-info/interfaces';

export interface IAdvisor {
    advisor_id: string;

    name: string;

    name_prefix: string;

    last_name: string;

    faculty: IDBFactory;

    department: IDepartment;

    students: IStudent[];

    is_committee: Boolean;

    created_at: Date;

    updated_at: Date;
}
