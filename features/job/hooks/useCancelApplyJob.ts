import { IJob } from './../interfaces/index';
import { GET_ME } from './../../auth/hooks/useGetMe';
import { gql, useMutation } from '@apollo/client';

export const CANCEL_APPLY_JOB = gql`
    mutation CancelApply($cancelApplyInfo: StudentApplyJobInput!) {
        cancelApply(cancel_apply_info: $cancelApplyInfo) {
            updated_at
        }
    }
`;

export interface CancelApplyResponse {
    cancelApply: {
        updated_at: string;
    };
}
export interface CancelApplyJobInput {
    cancelApplyInfo: {
        job_id: string;
    };
}

export const useCancelApplyJob = () => {
    return useMutation<CancelApplyResponse, CancelApplyJobInput>(CANCEL_APPLY_JOB, { refetchQueries: [GET_ME] });
};
