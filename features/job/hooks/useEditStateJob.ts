import { gql, useMutation } from '@apollo/client';

export const COMPANY_APPROVE_JOB = gql`
    mutation CompanyApproveJob($companyApproveInfo: EditJobStateInput!) {
        companyApproveJob(company_approve_info: $companyApproveInfo) {
            id
        }
    }
`;

export const UNDO_COMPANY_APPROVE_JOB = gql`
    mutation UndoCompanyApproveJob($undoCompanyApproveInfo: EditJobStateInput!) {
        undoCompanyApproveJob(undo_company_approve_info: $undoCompanyApproveInfo) {
            id
        }
    }
`;

export interface CompanyApproveJobResponse {
    companyApproveJob: {
        id: string;
    };
}

export interface CompanyApproveJobInput {
    companyApproveInfo: {
        student_apply_job_id: string;
    };
}

export interface UndoCompanyApproveJobResponse {
    undoCompanyApproveJob: {
        id: string;
    };
}

export interface UndoCompanyApproveJobInput {
    undoCompanyApproveInfo: {
        student_apply_job_id: string;
    };
}

export const useCompnayApproveJob = () => {
    return useMutation<CompanyApproveJobResponse, CompanyApproveJobInput>(COMPANY_APPROVE_JOB);
};

export const useUndoCompnayApproveJob = () => {
    return useMutation<UndoCompanyApproveJobResponse, UndoCompanyApproveJobInput>(UNDO_COMPANY_APPROVE_JOB);
};
