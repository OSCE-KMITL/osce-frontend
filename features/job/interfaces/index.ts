import { IStudent } from '@features/student/interfaces/Student';
import { ICompany } from '@features/company/interfaces';
import { IStudentApplyJob } from '../hooks/useGetJobs';

export interface FileUpload {
    id: string;

    original_name: string;

    current_name: string;

    url: string;

    createdAt: Date;

    updatedAt: Date;

    job_id: IJob;
}

export interface IJob {
    id: string;

    job_title: string;

    required_major: string;

    project_topic: string;

    nature_of_work: string;

    required_skills: string;

    limit: string;

    welfare: string;

    compensation: string;

    internship_period: string;

    work_period: string;

    coordinator_name: string;

    coordinator_job_title: string;

    coordinator_email: string;

    coordinator_phone_number: string;

    supervisor_name: string;

    supervisor_job_title: string;

    supervisor_email: string;

    supervisor_phone_number: string;

    created_at: string;

    updated_at: string;

    company_id: ICompany;

    file_upload: FileUpload[];

    students: IStudent[];

    student_apply_job: IStudentApplyJob[] | null | undefined;
}
