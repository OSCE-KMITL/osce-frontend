import { gql, useQuery } from '@apollo/client';
import { RoleOption } from '../../../constants/RoleOptions';

export interface GetMeResponse {
    getMe: {
        id: string;
        email: string;
        role: RoleOption;
        is_student?: {
            student_id: string;
            job: [
                {
                    id: string;
                    job_title: string;
                    internship_period: string;
                    company_id: {
                        id: string;
                        name_eng: string;
                    };
                }
            ];
        };
        is_company?: {
            company_id?: {
                id: string;
                job: [
                    {
                        id: string;
                        job_title: string;
                        internship_period: string;
                        createdAt: string;
                    }
                ];
            };
        };
    };
}

export const FETCH_ME = {
    query: ` 
    query Query {
        getMe {
            id
            email
            role
            is_company {
                company_id {
                  id
                }
              }
        }
    }`,
};

export const GET_ME = gql`
    query Query {
        getMe {
            id
            email
            role
            is_student {
                student_id
                name
                lastname
                job {
                    id
                    job_title
                    internship_period
                    company_id {
                        id
                        name_eng
                    }
                }
            }
            is_company {
                company_id {
                    id
                    job {
                        id
                        job_title
                        internship_period
                        createdAt
                    }
                }
            }
        }
    }
`;

export const useGetMe = () => {
    return useQuery<GetMeResponse>(GET_ME, { pollInterval: 2000 });
};
