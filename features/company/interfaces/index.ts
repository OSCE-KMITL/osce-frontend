import { IJob } from '@features/job/interfaces';

export interface ICompanyPerson {
    company_person_id: string;

    full_name: string;

    job_title: string;

    email: string;

    phone_number: string;

    is_coordinator: boolean;

    company_id: ICompany;

    created_at: Date;

    updated_at: Date;
}

export interface ICompany {
    id: string;

    name_th: string;

    name_eng: string;

    address: string;

    sub_district: string;

    district: string;

    province: string;

    postal_code: string;

    phone_number: string;

    website_url: string;

    business_type: string;

    created_at: string;

    updated_at: Date;

    company_persons: ICompanyPerson[];

    job: IJob[] | null | undefined;
}

export interface IAdvisor {
    advisor_id: string;
    name: string;
    last_name: string;
    faculty: string;
    department: string;
    is_committee: Boolean;
}

export interface ICompanyAssessment {
    id: string;

    improvement: string;

    score: number;

    strength: string;

    assessment_obj: object;
}
