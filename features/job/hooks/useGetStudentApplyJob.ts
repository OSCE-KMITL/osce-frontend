import { IJob } from '../interfaces/index';
import { IStudent } from '../../student/interfaces/Student';
import { ApolloError, gql, useQuery } from '@apollo/client';
import jobs from '../../../pages/jobs';

export const GET_STUDENT_APPLY_JOB = gql`
    query GetStudentApplyJob {
        getAllStudentApplyJob {
            id
            job_status
            student {
                student_id
                name_prefix
                name_th
                lastname_th
                curriculum {
                    curriculum_name_th
                }
                student_apply_job {
                    id
                    job_status
                }
            }
            job {
                id
                job_title
                required_major
                limit
                company_id {
                    name_eng
                }
                students {
                    student_id
                }
            }
            created_at
            updated_at
        }
    }
`;

export interface StudentApplyJobProp {
    id: string;
    job_status: string;
    student: {
        student_id: string;
        name_prefix: string;
        name_th: string;
        lastname_th: string;
        curriculum: {
            curriculum_name_th: string;
        };
    };
    job: {
        job_title: string;
        required_major: string;
        company_id: {
            name_eng: string;
        };
        students: IStudent[] | null | undefined;
    };
    created_at;
    updated_at;
}

export interface StudentApplyJobResponses {
    getAllStudentApplyJob: StudentApplyJobProp[] | null;
}

export function useGetStudentApplyJob() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error, refetch } = useQuery<StudentApplyJobResponses>(GET_STUDENT_APPLY_JOB);

    return { data, loading, error, refetch };
}
