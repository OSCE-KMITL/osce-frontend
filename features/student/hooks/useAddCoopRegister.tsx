import { useMutation, gql } from '@apollo/client';
import { RegisterCoopPayload } from '../interfaces';
import { CommitteeCoopRegisterArgs } from '@components/Manager/CoopApply/helper';
import { IStudent } from '@features/student/interfaces/Student';

export const COMMITTEE_ADD_REGISTER_COOP = gql`
    mutation CommitteeAddRegisterStudent($committeeRegisterCoopInput: CommitteeCoopRegisterArgs!) {
        committeeAddRegisterStudent(committee_register_coop_input: $committeeRegisterCoopInput) {
            student_id
        }
    }
`;

interface CommitteeRegisterCoopInput {
    committeeRegisterCoopInput: CommitteeCoopRegisterArgs;
}

interface CommitteeRegisterResponse {
    committeeAddRegisterStudent: IStudent;
}

export const useAddCoopRegister = () => {
    return useMutation<CommitteeRegisterResponse, CommitteeRegisterCoopInput>(COMMITTEE_ADD_REGISTER_COOP);
};
