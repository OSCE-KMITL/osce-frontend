import { gql, useMutation } from '@apollo/client';
import { IAdvisor } from '@features/advisor/interface';

export const ASSIGN_STUDENTS_TO_ADVISOR = gql`
    mutation Mutation($students: [String]!, $advisor_id: String!) {
        CommitteeAssignStudent(student_list: $students, advisor_id: $advisor_id) {
            name
            students {
                student_id
            }
        }
    }
`;

interface IAssignStudentToAdvisorInput {
    students: string[];
    advisor_id: string;
}
interface IAssignStudentToAdvisorResponse {
    CommitteeAssignStudent: IAdvisor;
}
export const useAssignStudentToAdvisor = () => {
    return useMutation<IAssignStudentToAdvisorResponse, IAssignStudentToAdvisorInput>(ASSIGN_STUDENTS_TO_ADVISOR);
};
