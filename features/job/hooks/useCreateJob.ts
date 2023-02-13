import { JobProps, GET_JOBS } from './useGetJobs';
import { gql, useMutation } from '@apollo/client';

export interface JobInputCommittee {
    job_title: string | null;
    compensation: string | null;
    coop301_fileurl: File | null;
    limit: string | null;
    nature_of_work: string | null;
    project_topic: string | null;
    required_major: string | null;
    required_skills: string | null;
    welfare: string | null;
    company_id: string | null;
    internship_period: string | null;
    work_period: string | null;
    coordinator_name: string | null;
    coordinator_job_title: string | null;
    coordinator_email: string | null;
    coordinator_phone_number: string | null;
    supervisor_name: string | null;
    supervisor_job_title: string | null;
    supervisor_email: string | null;
    supervisor_phone_number: string | null;
}

export interface JobInputCompany {
    job_title: string | null;
    compensation: string | null;
    coop301_fileurl: string | null;
    limit: string | null;
    nature_of_work: string | null;
    project_topic: string | null;
    required_major: string | null;
    required_skills: string | null;
    welfare: string | null;
    internship_period: string | null;
    work_period: string | null;
    coordinator_name: string | null;
    coordinator_job_title: string | null;
    coordinator_email: string | null;
    coordinator_phone_number: string | null;
    supervisor_name: string | null;
    supervisor_job_title: string | null;
    supervisor_email: string | null;
    supervisor_phone_number: string | null;
}

export interface CreateJobInputCommittee {
    jobInfo: JobInputCommittee;
}

export interface CreateJobInputCompany {
    jobInfo: JobInputCompany;
}

export const CREATE_JOB_BY_COMMITTEE = gql`
    mutation createJobByCommittee($jobInfo: JobInputByCommittee!) {
        createJobByCommittee(job_info: $jobInfo) {
            createdAt
            id
            job_title
            limit
            updatedAt
        }
    }
`;

export const CREATE_JOB_BY_COMPANY = gql`
    mutation createJobByCompany($jobInfo: JobInputByCompany!) {
        createJobByCompany(job_info: $jobInfo) {
            createdAt
            id
            job_title
            limit
            updatedAt
        }
    }
`;

export interface JobResponse {
    createJob: JobProps;
}

export const useCreateJobByCommittee = () => {
    return useMutation<JobResponse, CreateJobInputCommittee>(CREATE_JOB_BY_COMMITTEE, { refetchQueries: [GET_JOBS] });
};

export const useCreateJobByCompany = () => {
    return useMutation<JobResponse, CreateJobInputCompany>(CREATE_JOB_BY_COMPANY, { refetchQueries: [GET_JOBS] });
};
