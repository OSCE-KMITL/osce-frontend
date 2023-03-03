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

export const COMPANY_DISAPPROVE_JOB = gql`
    mutation CompanyDisapproveJob($companyDisapproveInfo: EditJobStateInput!) {
        companyDisapproveJob(company_disapprove_info: $companyDisapproveInfo) {
            id
        }
    }
`;

export const UNDO_COMPANY_DISAPPROVE_JOB = gql`
    mutation UndoCompanyDisapproveJob($undoCompanyDisapproveInfo: EditJobStateInput!) {
        undoCompanyDisapproveJob(undo_company_disapprove_info: $undoCompanyDisapproveInfo) {
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

export interface CompanyDisapproveJobResponse {
    companyDisapproveJob: {
        id: string;
    };
}
export interface CompanyDisapproveJobInput {
    companyDisapproveInfo: {
        student_apply_job_id: string;
    };
}

export interface UndoCompanyDisapproveJobResponse {
    undoCompanyDisapproveJob: {
        id: string;
    };
}

export interface UndoCompanyDisapproveJobInput {
    undoCompanyDisapproveInfo: {
        student_apply_job_id: string;
    };
}

export const useCompnayApproveJob = () => {
    return useMutation<CompanyApproveJobResponse, CompanyApproveJobInput>(COMPANY_APPROVE_JOB);
};

export const useUndoCompnayApproveJob = () => {
    return useMutation<UndoCompanyApproveJobResponse, UndoCompanyApproveJobInput>(UNDO_COMPANY_APPROVE_JOB);
};

export const useCompnayDisapproveJob = () => {
    return useMutation<CompanyDisapproveJobResponse, CompanyDisapproveJobInput>(COMPANY_DISAPPROVE_JOB);
};

export const useUndoCompnayDisapproveJob = () => {
    return useMutation<UndoCompanyDisapproveJobResponse, UndoCompanyDisapproveJobInput>(UNDO_COMPANY_DISAPPROVE_JOB);
};
