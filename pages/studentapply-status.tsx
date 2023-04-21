import { Divider } from 'antd';
import { useGetStudents } from '@features/student/hooks/useGetStudents';
import { Link } from '@ui/Link';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import StudentApplyStatusTable from '@components/Manager/CoopApply/StudentApplyStatusTable';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { useGetMe } from '@features/auth/hooks/useGetMe';

const StudentApplyStatus: React.FC = () => {
    const { data: dataGetMe, refetch } = useGetMe();
    const { data: student_data, loading, error } = useGetStudents();
    const student_id = dataGetMe?.getMe?.is_student?.student_id;
    const { data: student, loading: student_loading, error: student_error } = useGetStudent(student_id);
    const student_curriculum = student?.getStudent?.curriculum?.curriculum_id;
    const year_now = new Date().getFullYear() + 543;
    useEffect(() => {
        refetch();
    }, []);
    const filter_student = student_data?.getStudentsApply
        ?.filter((i) => i.curriculum?.curriculum_id === student_curriculum && new Date(i.created_at.toString()).getFullYear() + 543 === year_now)
        .sort((a, b) => parseInt(a?.student_id) - parseInt(b?.student_id));

    if (loading) {
        return <p>loading</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div className="w-[80%]">
            <div className={'w-full flex flex-row gap-x-6 items-center align-bottom'}>
                <h1>รายชื่อผู้สมัครสหกิจศึกษา</h1>
            </div>{' '}
            <div className="flex gap-8 mt-8">
                <p className="px-4 py-2 w-fit rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">
                    ภาควิชา : {student?.getStudent?.department?.department_name_th ? student?.getStudent?.department?.department_name_th : '-'}
                </p>
                <p className="px-4 py-2 w-fit rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">
                    หลักสูตร : {student?.getStudent?.curriculum?.curriculum_name_th ? student?.getStudent?.curriculum?.curriculum_name_th : '-'}
                </p>
                <p className="px-4 py-2 w-fit rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">ปีการศึกษา : {year_now}</p>
            </div>
            <Divider />
            <StudentApplyStatusTable student_data={filter_student} />
        </div>
    );
};

export default StudentApplyStatus;
