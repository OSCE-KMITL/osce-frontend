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
            company_id {
                name
                address
            }
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
                address
            }
        }
    }
`;

export interface JobProps {
    id: string;
    job_title: string;
    required_major: string;
    project_topic: string;
    nature_of_work: string;
    required_skills: string;
    limit: string;
    welfare: string;
    compensation: string;
    coop301_fileurl: string;
    company_id: {
        name: string;
        address: string;
    };
}
export interface JobResponse {
    getJobById: JobProps | null;
}

export interface JobResponses {
    getAllJob: JobProps[] | null;
}

export function useGetJobs() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery<JobResponses>(GET_JOBS);

    return { data, loading, error };
}

export function useGetJob({ jobId: string }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery<JobResponse>(GET_JOB_BY_ID, { variables: { jobId: string } });

    return { data, loading, error };
}
