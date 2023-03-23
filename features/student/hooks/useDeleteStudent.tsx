import { useMutation, gql } from '@apollo/client';
import { IStudent } from '@features/student/interfaces/Student';

export const DELETE_STUDENT = gql`
    mutation StudentDeleteById($studentId: String!) {
        studentDeleteById(student_id: $studentId) {
            name_th
        }
    }
`;

interface IDeleteStudentById {
    studentId: string;
}

interface IDeleteStudentByIdResponse {
    studentDeleteById: IStudent;
}

export const useDeleteStudent = () => {
    return useMutation<IDeleteStudentByIdResponse, IDeleteStudentById>(DELETE_STUDENT);
};
