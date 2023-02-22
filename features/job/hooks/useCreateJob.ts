import { UploadFileInput } from './../../upload/hooks/useUploadFile';
import { JobProps, GET_JOBS } from './useGetJobs';
import { gql, useMutation } from '@apollo/client';

export interface JobInputCommittee {
    job_title: string | null;
    compensation: string | null;
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
    file: UploadFileInput;
}

export interface CreateJobInputCommitteeNoFile {
    jobInfo: JobInputCommittee;
}

export interface CreateJobInputCompany {
    jobInfo: JobInputCompany;
    file: UploadFileInput;
}

export interface CreateJobInputCompanyNoFile {
    jobInfo: JobInputCompany;
}

export const CREATE_JOB_BY_COMMITTEE = gql`
    mutation CreateJobByCommittee($file: Upload!, $jobInfo: JobInputByCommittee!) {
        createJobByCommittee(file: $file, job_info: $jobInfo) {
            createdAt
            id
            job_title
            limit
            updatedAt
        }
    }
`;

export const CREATE_JOB_BY_COMMITTEE_NO_FILE = gql`
    mutation CreateJobByCommitteeNoFile($jobInfo: JobInputByCommittee!) {
        createJobByCommitteeNoFile(job_info: $jobInfo) {
            createdAt
            id
            job_title
            limit
            updatedAt
        }
    }
`;

export const CREATE_JOB_BY_COMPANY = gql`
    mutation createJobByCompany($file: Upload!, $jobInfo: JobInputByCompany!) {
        createJobByCompany(file: $file, job_info: $jobInfo) {
            createdAt
            id
            job_title
            limit
            updatedAt
        }
    }
`;

export const CREATE_JOB_BY_COMPANY_NO_FILE = gql`
    mutation createJobByCompanyNoFile($jobInfo: JobInputByCompany!) {
        createJobByCompanyNoFile(job_info: $jobInfo) {
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

export const useCreateJobByCommitteeNoFile = () => {
    return useMutation<JobResponse, CreateJobInputCommitteeNoFile>(CREATE_JOB_BY_COMMITTEE_NO_FILE, { refetchQueries: [GET_JOBS] });
};

export const useCreateJobByCompany = () => {
    return useMutation<JobResponse, CreateJobInputCompany>(CREATE_JOB_BY_COMPANY, { refetchQueries: [GET_JOBS] });
};

export const useCreateJobByCompanyNoFile = () => {
    return useMutation<JobResponse, CreateJobInputCompanyNoFile>(CREATE_JOB_BY_COMPANY_NO_FILE, { refetchQueries: [GET_JOBS] });
};
