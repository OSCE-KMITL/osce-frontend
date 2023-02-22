import { GET_JOBS } from './useGetJobs';
import { gql, useMutation } from '@apollo/client';

export const UPDATE_JOB = gql`
    mutation UpdateJob($updateInput: UpdateJobInput!) {
        updateJob(update_input: $updateInput) {
            id
        }
    }
`;

export interface JobUpdateResponse {
    updateJob: {
        id: string;
    };
}

export interface UpdateJobInput {
    updateInput: {
        id: string | null;
        job_title: string | null;
        required_major: string | null;
        project_topic: string | null;
        nature_of_work: string | null;
        required_skills: string | null;
        limit: string | null;
        welfare: string | null;
        compensation: string | null;
        internship_period: string | null;
        work_period: string | null;
        coordinator_name: string | null;
        coordinator_job_title: string | null;
        coordinator_phone_number: string | null;
        coordinator_email: string | null;
        supervisor_name: string | null;
        supervisor_job_title: string | null;
        supervisor_phone_number: string | null;
        supervisor_email: string | null;
    };
}

export const useUpdateJob = () => {
    return useMutation<JobUpdateResponse, UpdateJobInput>(UPDATE_JOB, { refetchQueries: [GET_JOBS] });
};
