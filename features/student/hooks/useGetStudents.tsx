import { useMutation, gql, useQuery } from '@apollo/client';
import { RegisterCoopPayload } from '../interfaces';
import { IStudent } from '../interfaces/Student';

export const GET_STUDENTS = gql`
    query GetStudents {
        getStudents {
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
`;
interface GetStudentsReponse {
    getStudents: IStudent[];
}
export const useGetStudents = () => {
    return useQuery<GetStudentsReponse>(GET_STUDENTS, { pollInterval: 3000 });
};
