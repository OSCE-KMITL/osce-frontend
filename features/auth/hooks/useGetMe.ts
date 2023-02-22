import { gql, useQuery } from '@apollo/client';
import { UserAuthData } from '@context/AuthContextProvider';

export interface GetMeResponse {
    getMe: UserAuthData;
}

export const GET_ME = gql`
    query Query {
        getMe {
            id
            email
            password
            role
            is_student {
                student_id
                name_eng
                lastname_eng
                name_th
                lastname_th
                coop_status
                gpa
                gender
                religion
                military_status
                driver_license
                citizen_id
                weight
                height
                address
                phone_number
                emer_relation
                emer_name
                emer_lastname
                emer_tel
                birth_date
                created_at
                updated_at
                department {
                    id
                    department_id
                    faculty_id
                    department_name_en
                    department_name_th
                }
                curriculum {
                    id
                    curriculum_id
                    faculty_id
                    dept_id
                    curriculum_name_en
                    curriculum_name_th
                    level_id
                }
                faculty {
                    faculty_id
                    faculty_name_en
                    faculty_name_th
                }
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
            is_advisor {
                advisor_id
                name
                last_name
                faculty
                is_committee
                announcements {
                    id
                    title
                    description
                    createdAt
                    updatedAt
                }
                created_at
                updated_at
            }
            is_company {
                company_id {
                    id
                    job {
                        id
                        job_title
                        internship_period
                        created_at
                    }
                }
            }
            status
            profile_image
            created_at
            updated_at
        }
    }
`;

export const useGetMe = () => {
    return useQuery<GetMeResponse>(GET_ME, { pollInterval: 2000 });
};
