import { GET_STUDENT_APPLY_JOB } from './useGetStudentApplyJob';
import { GET_STUDENTS } from './../../student/hooks/useGetStudents';
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

export const COMMITTEE_APPROVE_JOB = gql`
    mutation CommitteeApproveJob($committeeApproveInfo: EditJobStateInput!) {
        committeeApproveJob(committee_approve_info: $committeeApproveInfo) {
            id
        }
    }
`;

export const UNDO_COMMITTEE_APPROVE_JOB = gql`
    mutation UndoCommitteeApproveJob($undoCommitteeApproveInfo: EditJobStateInput!) {
        undoCommitteeApproveJob(undo_committee_approve_info: $undoCommitteeApproveInfo) {
            id
        }
    }
`;

export const COMMITTEE_DISAPPROVE_JOB = gql`
    mutation CommitteeDisapproveJob($committeeDisapproveInfo: EditJobStateInput!) {
        committeeDisapproveJob(committee_disapprove_info: $committeeDisapproveInfo) {
            id
        }
    }
`;

export const UNDO_COMMITTEE_DISAPPROVE_JOB = gql`
    mutation UndoCommitteeDisapproveJob($undoCommitteeDisapproveInfo: EditJobStateInput!) {
        undoCommitteeDisapproveJob(undo_committee_disapprove_info: $undoCommitteeDisapproveInfo) {
            id
        }
    }
`;

export const COMMITTEE_ASSIGN_JOB = gql`
    mutation CommitteeAssignJob($committeeAssignjobInfo: AssignJobInput!) {
        committeeAssignJob(committee_assignjob_info: $committeeAssignjobInfo) {
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

export interface CommitteeApproveJobResponse {
    committeeApproveJob: {
        id: string;
    };
}

export interface CommitteeApproveJobInput {
    committeeApproveInfo: {
        student_apply_job_id: string;
    };
}

export interface UndoCommitteeApproveJobResponse {
    undoCommitteeApproveJob: {
        id: string;
    };
}

export interface UndoCommitteeApproveJobInput {
    undoCommitteeApproveInfo: {
        student_apply_job_id: string;
    };
}

export interface CommitteeDisapproveJobResponse {
    committeeDisapproveJob: {
        id: string;
    };
}
export interface CommitteeDisapproveJobInput {
    committeeDisapproveInfo: {
        student_apply_job_id: string;
    };
}

export interface UndoCommitteeDisapproveJobResponse {
    undoCommitteeDisapproveJob: {
        id: string;
    };
}

export interface UndoCommitteeDisapproveJobInput {
    undoCommitteeDisapproveInfo: {
        student_apply_job_id: string;
    };
}

export interface CommitteeAssignJobResponse {
    committeeAssignJob: {
        id: string;
    };
}

export interface CommitteeAssignJobInput {
    committeeAssignjobInfo: {
        job_id: string;
        student_id: string;
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

export const useCommitteeApproveJob = () => {
    return useMutation<CommitteeApproveJobResponse, CommitteeApproveJobInput>(COMMITTEE_APPROVE_JOB);
};

export const useUndoCommitteeApproveJob = () => {
    return useMutation<UndoCommitteeApproveJobResponse, UndoCommitteeApproveJobInput>(UNDO_COMMITTEE_APPROVE_JOB);
};

export const useCommitteeDisapproveJob = () => {
    return useMutation<CommitteeDisapproveJobResponse, CommitteeDisapproveJobInput>(COMMITTEE_DISAPPROVE_JOB);
};

export const useUndoCommitteeDisapproveJob = () => {
    return useMutation<UndoCommitteeDisapproveJobResponse, UndoCommitteeDisapproveJobInput>(UNDO_COMMITTEE_DISAPPROVE_JOB);
};

export const useCommitteeAssignJob = () => {
    return useMutation<CommitteeAssignJobResponse, CommitteeAssignJobInput>(COMMITTEE_ASSIGN_JOB, { refetchQueries: [GET_STUDENTS, GET_STUDENT_APPLY_JOB] });
};
