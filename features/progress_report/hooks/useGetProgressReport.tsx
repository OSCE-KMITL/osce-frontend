import { gql, useMutation } from '@apollo/client';

export const CREATE_PROGRESS_REPORT = gql`
    mutation Mutation($progressReportArg: ProgressReportInput!) {
        createProgressReport(progress_report_arg: $progressReportArg) {
            mentor_name
            current_res
            report_no
            advisement_score
            commute_score
            createdAt
            mentor_lastname
            mentor_position
            other_suggest
            progress_report_id
            updatedAt
            work_score
        }
    }
`;

export const useCreateProgressReport = () => {
    return useMutation(CREATE_PROGRESS_REPORT);
};
