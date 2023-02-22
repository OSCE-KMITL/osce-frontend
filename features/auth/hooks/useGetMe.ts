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
            is_student {
                address
                birth_date
                citizen_id
                coop_status
                created_at
                department {
                    id
                    faculty_id
                    department_name_th
                    department_name_en
                    department_id
                }
                curriculum {
                    curriculum_id
                    curriculum_name_en
                    curriculum_name_th
                }
                driver_license
                emer_lastname
                emer_name
                emer_relation
                emer_tel
                faculty {
                    faculty_name_th
                    faculty_name_en
                    faculty_id
                }
                military_status
                name_eng
                name_th
                phone_number
                religion
                student_id
                updated_at
                weight
                lastname_th
                lastname_eng
                height
                gpa
                gender
            }
        }
    }
`;

export const useGetMe = () => {
    return useQuery<GetMeResponse>(GET_ME, { pollInterval: 2000 });
};
