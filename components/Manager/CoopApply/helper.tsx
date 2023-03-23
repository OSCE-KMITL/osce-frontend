import { CoopStatus } from '@features/student/interfaces';

export class CommitteeCoopRegisterArgs {
    student_id: string;

    name_th: string;

    name_prefix: string;

    lastname_th: string;

    coop_status: CoopStatus;

    curriculum_id: string;

    curriculum_name_th: string;

    curriculum_name_en: string;

    level_id: string;

    faculty_id: string;

    faculty_name_th: string;

    faculty_name_en: string;

    department_id: string;

    department_name_en: string;

    department_name_th: string;
}
