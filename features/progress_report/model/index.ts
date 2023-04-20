import { IStudent } from '@features/student/interfaces/Student';

export class ProgressReport {
    progress_report_id: string;

    report_no: number;

    commute_score: number;

    advisement_score: number;

    work_score: number;

    current_res: string;

    mentor_name: string;

    mentor_position: string;

    mentor_email: string;

    mentor_tel: string;

    other_suggest: string;

    student_id: IStudent;

    created_at!: Date;

    updated_at!: Date;
}
