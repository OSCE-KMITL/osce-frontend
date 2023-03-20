import { gql, useQuery } from '@apollo/client';
import { IStudent } from '../interfaces/Student';

export const GET_STUDENTS = gql`
    query GetStudents {
        getStudents {
            address
            birth_date
            citizen_id
            coop_status
            created_at
            # transcript {
            #     current_name
            #     url
            # }
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
            student_apply_job {
                id
                job_status
                student {
                    student_id
                }
                job {
                    id
                    job_title
                    required_major
                    project_topic
                    nature_of_work
                    required_skills
                    limit
                    welfare
                    compensation
                    internship_period
                    work_period
                    coordinator_name
                    coordinator_job_title
                    coordinator_email
                    coordinator_phone_number
                    supervisor_name
                    supervisor_job_title
                    supervisor_email
                    supervisor_phone_number
                    company_id {
                        name_eng
                    }
                }
                created_at
                updated_at
            }
            job {
                id
                job_title
                company_id {
                    id
                    name_eng
                }
                limit
                students {
                    student_id
                }
            }
        }
    }
`;
interface GetStudentsResponse {
    getStudents: IStudent[];
}
export const useGetStudents = () => {
    return useQuery<GetStudentsResponse>(GET_STUDENTS, { pollInterval: 3000 });
};
