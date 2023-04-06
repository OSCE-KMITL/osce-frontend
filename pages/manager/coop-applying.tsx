import React from 'react';
import { Divider } from 'antd';
import { useGetStudents } from '@features/student/hooks/useGetStudents';

import StudentRegisterTable from '@components/Manager/CoopApply/StudentRegisterTable';

const StudentInfo: React.FC = () => {
    const { data: student_data, loading, error } = useGetStudents();
    if (loading) {
        return <p>loading</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    // const sorted = student_data?.getStudentsApply?.sort((a, b) => parseInt(a.student_id) - parseInt(b.student_id));

    return (
        <div>
            <div className={'w-full flex flex-row gap-x-6 items-center align-bottom'}>
                <h1>รายชื่อผู้สมัครสหกิจศึกษา</h1>
                <p className="px-4 py-2 rounded-lg text-[25px] bg-white shadow-sm text-primary-500 font-semibold ">ภาควิชา : วิศวะกรรมคอมพิวเตอร์</p>
            </div>

            <Divider />
            <StudentRegisterTable student_data={student_data.getStudentsApply} />
        </div>
    );
};

export default StudentInfo;
