import { IStudent } from './../../student/interfaces/Student';
import { GET_JOBS } from './useGetJobs';
import { gql, useMutation } from '@apollo/client';

export const APPLY_JOB = gql`
    mutation ApplyJob($applyInfo: StudentApplyJobInput!) {
        applyJob(apply_info: $applyInfo) {
            student_id
            name_eng
        }
    }
`;

export interface ApplyResponse {
    applyJob: {
        student_id: string;
        name_eng: string;
    };
}
export interface ApplyJobInput {
    applyInfo: {
        job_id: string;
    };
}

export const useApplyJob = () => {
    return useMutation<ApplyResponse, ApplyJobInput>(APPLY_JOB, { refetchQueries: [GET_JOBS] });
};
