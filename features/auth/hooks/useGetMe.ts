import { gql, useQuery } from '@apollo/client';
import { RoleOption } from '../../../constants/RoleOptions';
import { UserAuthData } from '../../../context/AuthContextProvider';

export interface GetMeResponse {
    getMe: UserAuthData;
}

export const GET_ME = gql`
    query Query {
        getMe {
            id
            email
            role
            profile_image
            is_student {
                address
                birth_date
                citizen_id
                coop_status
                created_at
                student_id
                department {
                    id
                    faculty_id
                    department_name_th
                    department_name_en
                    department_id
                }
            }
        }
    }
`;

export const useGetMe = () => {
    return useQuery<GetMeResponse>(GET_ME);
};
