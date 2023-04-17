import { gql, useMutation } from '@apollo/client';

export const CREATE_ADVISOR_ASSESSMENT = gql`
    mutation CreateAdvisorAssessment($advisorAssessmentInfo: CreateAdvisorAssessmentInput!) {
        createAdvisorAssessment(advisor_assessment_info: $advisorAssessmentInfo) {
            student_id
        }
    }
`;

export interface CreateAdvisorAssessmentResponse {
    CreateAdvisorAssessment: {
        student_id: string;
    };
}
export interface CreateAdvisorAssessmentInput {
    advisorAssessmentInfo: {
        advisor_id: string;

        student_id: string;

        assessment_obj: object;

        score: number;
    };
}

export const useCreateAdvisorAssessment = () => {
    return useMutation<CreateAdvisorAssessmentResponse, CreateAdvisorAssessmentInput>(CREATE_ADVISOR_ASSESSMENT);
};
