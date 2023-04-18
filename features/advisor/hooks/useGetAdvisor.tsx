import { gql, useQuery } from '@apollo/client';
import { IAdvisor } from '@features/company/interfaces';

export const GET_ADVISOR = gql`
    query GetAdvisor($getAdvisorId: String!) {
        getAdvisor(id: $getAdvisorId) {
            advisor_id
            name
            students {
                student_id
                name_prefix
                name_th
                lastname_th
                job {
                    job_title
                    internship_period
                    company_id {
                        name_th
                    }
                }
                advisor_assessment {
                    id
                }
                department {
                    department_name_th
                }
            }
            department {
                department_name_th
            }
        }
    }
`;
interface GetAdvisorResponse {
    getAdvisor: IAdvisor;
}
interface GetAdvisorArgs {
    getAdvisorId: string;
}

export const useGetAdvisor = (advisor_id: string) => {
    return useQuery<GetAdvisorResponse, GetAdvisorArgs>(GET_ADVISOR, { pollInterval: 2000, variables: { getAdvisorId: advisor_id } });
};
