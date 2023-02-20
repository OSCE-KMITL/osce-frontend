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
            createdAt
            updatedAt
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
            }
            file_upload {
                id
                original_name
                current_name
                url
                createdAt
                updatedAt
            }
            students {
                student_id
                name
                lastname
            }
        }
    }
`;

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
    students: [
        {
            student_id: string;
            name: string;
            lastname: string;
        }
    ];
}
export interface JobResponse {
    getJobById: JobProps | null;
}

export interface JobResponses {
    getAllJob: JobProps[] | null;
}

export function useGetJobs() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery<JobResponses>(GET_JOBS);

    return { data, loading, error };
}

export function useGetJob({ jobId: string }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error, refetch } = useQuery<JobResponse>(GET_JOB_BY_ID, { variables: { jobId: string }, pollInterval: 2000 });

    return { data, loading, error, refetch };
}
