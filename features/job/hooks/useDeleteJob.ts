import { GET_JOBS } from './useGetJobs';
import { gql, useMutation } from '@apollo/client';

export const DELETE_JOB = gql`
    mutation DeleteJob($jobId: String!) {
        deleteJob(job_id: $jobId) {
            job_title
        }
    }
`;

export interface JobDeleteResponse {
    deleteJob: {
        job_title: string;
    };
}

export interface DeleteJobInput {
    jobId: string;
}

export const useDeleteJob = () => {
    return useMutation<JobDeleteResponse, DeleteJobInput>(DELETE_JOB, { refetchQueries: [GET_JOBS] });
};
