import { JobProps } from './../../job/hooks/useGetJobs';
import { ICurriculum, IDepartment, IFaculty } from '@constants/faculty-info/interfaces';
import { ILanguageAbility, ISkillState } from '@features/register-coop/interfaces';
import { CoopStatus } from './index';
import { ProgressReport } from '@features/progress_report/model';
import { IAdvisor } from '@features/advisor/interface';

export interface ITranscriptFileUpload {
    id: string;
    original_name: string;
    current_name: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

export interface IStudent {
    student_id: string;

    name_eng: string;

    name_prefix: string;

    advisor?: IAdvisor | null | undefined;

    transcript: ITranscriptFileUpload | null | undefined;

    faculty: IFaculty;

    department: IDepartment;

    curriculum: ICurriculum;

    progress_report: ProgressReport[];

    language_abilities: ILanguageAbility[];

    skills: ISkillState[];

    lastname_eng: string;

    name_th: string;

    lastname_th: string;

    coop_status: CoopStatus;

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

    created_at: Date;

    updated_at: Date;

    job: JobProps[] | null | undefined;
}
