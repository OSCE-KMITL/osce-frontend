import { gql, useQuery } from '@apollo/client';
import { IStudent } from '../interfaces/Student';

export const GET_STUDENT = gql`
    query GetStudent($studentId: String!) {
        getStudent(student_id: $studentId) {
            address
            birth_date
            citizen_id
            coop_status
            created_at
            skills {
                level
                skill_name
            }
            progress_report {
                report_no
                other_suggest
                progress_report_id
                mentor_position
                mentor_name
                mentor_lastname
                current_res
                createdAt
                commute_score
                advisement_score
                updatedAt
                work_score
            }

            language_abilities {
                level
                name
            }
            transcript {
                current_name
                url
            }
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
            name_prefix
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
interface GetStudentsResponse {
    getStudent: IStudent;
}
interface GetStudentsArgs {
    studentId: string;
}

export const useGetStudent = (student_id: string) => {
    return useQuery<GetStudentsResponse, GetStudentsArgs>(GET_STUDENT, { pollInterval: 2000, variables: { studentId: student_id } });
};
