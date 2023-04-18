import { gql, useMutation } from '@apollo/client';

export const SET_SCORE_STUDENT = gql`
    mutation SetScoreStudent($setScoreInfo: EditScoreInput!) {
        setScoreStudent(set_score_info: $setScoreInfo) {
            student_id
        }
    }
`;

export interface SetScoreStudentResponse {
    setScoreStudent: {
        student_id: string;
    };
}

export interface SetScoreStudentInput {
    setScoreInfo: {
        student_id: string;
        score_advisor: number;
        score_company: number;
        score_presentation: number;
    };
}

export const useSetScoreStudent = () => {
    return useMutation<SetScoreStudentResponse, SetScoreStudentInput>(SET_SCORE_STUDENT);
};
