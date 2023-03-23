import { gql, useMutation } from '@apollo/client';
import { IStudent } from '@features/student/interfaces/Student';

export const SET_COOP_STATUS = gql`
    mutation CommitteeChangeCoopStatus($status: String!, $student_id: String!) {
        committeeChangeCoopStatus(status: $status, student_id: $student_id) {
            student_id
            coop_status
        }
    }
`;

export interface ISetCoopStatusArg {
    status: string;
    student_id: string;
}
export interface ISetCoopStatusResponse {
    committeeChangeCoopStatus?: IStudent;
}

export const useSetCoopStatus = () => {
    return useMutation<ISetCoopStatusResponse, ISetCoopStatusArg>(SET_COOP_STATUS);
};
