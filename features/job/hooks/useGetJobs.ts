import { IJob } from './../interfaces/index';
import { IStudent } from './../../student/interfaces/Student';
import { ApolloError, gql, useQuery } from '@apollo/client';
import jobs from '../../../pages/jobs';

export const GET_JOBS = gql`
    query GetAllJob {
        getAllJob {
            id
            job_title
            required_major
            project_topic
            nature_of_work
            required_skills
            limit
            welfare
            compensation
            internship_period
            work_period
            coordinator_name
            coordinator_job_title
            coordinator_email
            coordinator_phone_number
            supervisor_name
            supervisor_job_title
            supervisor_email
            supervisor_phone_number
            company_id {
                id
                name_th
                name_eng
                address
                sub_district
                district
                province
                postal_code
                company_persons {
                    full_name
                    company_person_id
                    job_title
                    is_coordinator
                    phone_number
                    email
                }
            }
            file_upload {
                id
                original_name
                current_name
                url
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_JOB_BY_ID = gql`
    query GetJobById($jobId: String!) {
        getJobById(job_id: $jobId) {
            id
            job_title
            required_major
            project_topic
            nature_of_work
            required_skills
            limit
            welfare
            compensation
            internship_period
            work_period
            coordinator_name
            coordinator_job_title
            coordinator_email
            coordinator_phone_number
            supervisor_name
            supervisor_job_title
            supervisor_email
            supervisor_phone_number
            created_at
            updated_at
            company_id {
                id
                name_th
                name_eng
                address
                sub_district
                district
                province
                postal_code
                phone_number
                website_url
                business_type
                created_at
                updated_at
                company_persons {
                    full_name
                    company_person_id
                    job_title
                    is_coordinator
                    phone_number
                    email
                }
            }
            file_upload {
                id
                original_name
                current_name
                url
                createdAt
                updatedAt
            }
            student_apply_job {
                id
                job_status
                student {
                    account {
                        email
                    }
                    student_id
                    name_eng
                    lastname_eng
                    name_prefix
                    name_th
                    lastname_th
                    coop_status
                    gpa
                    gender
                    religion
                    military_status
                    driver_license
                    citizen_id
                    weight
                    height
                    address
                    phone_number
                    emer_relation
                    emer_name
                    emer_lastname
                    emer_tel
                    birth_date
                    created_at
                    updated_at
                    skills {
                        id
                        level
                        skill_name
                    }
                    language_abilities {
                        id
                        level
                        name
                    }
                    # transcript {
                    #     id
                    #     current_name
                    #     original_name
                    #     updated_at
                    #     url
                    #     created_at
                    # }
                    department {
                        id
                        department_id
                        faculty_id
                        department_name_en
                        department_name_th
                    }
                    curriculum {
                        id
                        curriculum_id
                        faculty_id
                        dept_id
                        curriculum_name_en
                        curriculum_name_th
                        level_id
                    }
                    faculty {
                        faculty_id
                        faculty_name_en
                        faculty_name_th
                    }
                }
                job {
                    id
                }
                created_at
                updated_at
            }
        }
    }
`;

//student_apply_job
export interface IStudentApplyJob {
    id: string;
    job_status: string;
    student: IStudent;
    job: IJob;
    created_at: string;
    updated_at: string;
}

export interface JobProps {
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
    company_id: {
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
        updated_at: string;
        company_persons: [
            {
                full_name: string;
                company_person_id: string;
                job_title: string;
                is_coordinator: string;
                phone_number: string;
                email: string;
            }
        ];
        job: JobProps[] | null | undefined;
    };
    file_upload: [
        {
            id: string;
            original_name: string;
            current_name: string;
            url: string;
            createdAt: string;
            updatedAt: string;
        }
    ];
    students: IStudent[] | null | undefined;
    student_apply_job: IStudentApplyJob[] | null | undefined;
}
export interface JobResponse {
    getJobById: JobProps | null;
}

export interface JobResponses {
    getAllJob: JobProps[] | null;
}

export function useGetJobs() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error, refetch } = useQuery<JobResponses>(GET_JOBS);

    return { data, loading, error, refetch };
}

export function useGetJob({ jobId: string }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error, refetch } = useQuery<JobResponse>(GET_JOB_BY_ID, { variables: { jobId: string }, pollInterval: 2000 });

    return { data, loading, error, refetch };
}
