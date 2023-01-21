import { JobProps, GET_JOBS } from './useQueryJobs';
import { gql, useMutation } from '@apollo/client';

export interface JobInput {
    job_title: string;
    compensation: string;
    coop301_fileurl: string;
    limit: string;
    nature_of_work: string;
    project_topic: string;
    required_major: string;
    required_skills: string;
    welfare: string;
    company_id: string;
}

export interface CreateJobInput {
    jobInfo: JobInput;
}

export const CREATE_JOB = gql`
    mutation CreateJob($jobInfo: JobInput!) {
        createJob(job_info: $jobInfo) {
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

export const useCreateJob = () => {
    return useMutation<JobResponse, CreateJobInput>(CREATE_JOB, { refetchQueries: [GET_JOBS] });
};
