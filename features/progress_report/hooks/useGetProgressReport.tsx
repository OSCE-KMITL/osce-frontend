import { gql, useMutation } from '@apollo/client';
import { ProgressReport } from '@features/progress_report/model';

export const CREATE_PROGRESS_REPORT = gql`
    mutation Mutation($payload: ProgressReportInput!) {
        createProgressReport(progress_report_arg: $payload) {
            mentor_name
            mentor_email
            current_res
            created_at
            commute_score
            advisement_score
            mentor_position
            mentor_tel
            other_suggest
            progress_report_id
            report_no
            updated_at
            work_score
        }
    }
`;

export interface ProgressReportInput {
    advisement_score: number;
    commute_score: number;
    work_score: number;
    current_res: string;
    mentor_name: string | null;
    mentor_position: string | null;
    other_suggest: string;
    mentor_email: string | null;
    mentor_tel: string | null;
}
interface ProgressReportPayload {
    payload: ProgressReportInput;
}

interface CreateProgressReportResponse {
    createProgressReport: ProgressReport;
}
export const useCreateProgressReport = () => {
    return useMutation<CreateProgressReportResponse, ProgressReportPayload>(CREATE_PROGRESS_REPORT);
};
