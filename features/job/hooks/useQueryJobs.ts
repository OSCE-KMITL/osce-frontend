import { ApolloError, gql, useQuery } from '@apollo/client';
import jobs from '../../../pages/jobs';

export const GET_JOBS = gql`
    query GetAllJob {
        getAllJob {
            id
            job_title
            required_major
            project_topic
            nature_of_work
            required_skills
            limit
            welfare
            compensation
            coop301_fileurl
        }
    }
`;

export const GET_JOB_BY_ID = gql`
    query GetJobById($jobId: String!) {
        getJobById(job_id: $jobId) {
            id
            job_title
            required_major
            project_topic
            nature_of_work
            required_skills
            limit
            welfare
            compensation
            coop301_fileurl
            createdAt
            updatedAt
            company_id {
                name
            }
        }
    }
`;

interface Result {
    loading: boolean;
    error: ApolloError | undefined;
    data: any;
}

export function useQueryJobs(): Result {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery(GET_JOBS);

    return { data, loading, error };
}

export function useQueryJob({jobId :string}): Result {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery(GET_JOB_BY_ID,{variables:{jobId :string} });

    return { data, loading, error };
}
