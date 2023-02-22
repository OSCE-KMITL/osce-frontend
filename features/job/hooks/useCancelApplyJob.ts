import { GET_ME } from './../../auth/hooks/useGetMe';
import { gql, useMutation } from '@apollo/client';

export const CANCEL_APPLY_JOB = gql`
    mutation CancelApply($cancelApplyInfo: StudentApplyJobInput!) {
        cancelApply(cancel_apply_info: $cancelApplyInfo) {
            student_id
        }
    }
`;

export interface CancelApplyResponse {
    cancelApply: {
        student_id: string;
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
