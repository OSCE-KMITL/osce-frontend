import { gql, useMutation } from '@apollo/client';

export const CREATE_COMPANY_ASSESSMENT = gql`
    mutation CreateCompanyAssessment($companyAssessmentInfo: CreateCompanyAssessmentInput!) {
        createCompanyAssessment(company_assessment_info: $companyAssessmentInfo) {
            student_id
        }
    }
`;

export interface CreateCompanyAssessmentResponse {
    createCompanyAssessment: {
        student_id: string;
    };
}
export interface CreateCompanyAssessmentInput {
    companyAssessmentInfo: {
        company_id: string;

        student_id: string;

        assessment_obj: object;

        score: number;

        strength: string | null;

        improvement: string | null;
    };
}

export const useCreateCompanyAssessment = () => {
    return useMutation<CreateCompanyAssessmentResponse, CreateCompanyAssessmentInput>(CREATE_COMPANY_ASSESSMENT);
};
