import React, { useEffect } from 'react';
import { Divider } from 'antd';
import { useGetStudents } from '@features/student/hooks/useGetStudents';

import StudentRegisterTable from '@components/Manager/CoopApply/StudentRegisterTable';
import { Link } from '@ui/Link';
import { ExportJsonToExcel } from '../../utils/ExportJsonToExcel';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { useGetMe } from '@features/auth/hooks/useGetMe';

const StudentInfo: React.FC = () => {
    const { data: student_data, loading, error } = useGetStudents();
    const { data: dataGetMe, loading: me_loading, error: me_error, refetch: refectch_me } = useGetMe();

    useEffect(() => {
        refectch_me();
    }, []);
    const committee_dep = dataGetMe?.getMe?.is_advisor?.department?.department_name_th;

    if (loading || me_loading) {
        return <p>loading</p>;
    }
    if (error || me_error) {
        return <p>{error.message}</p>;
    }

    // const sorted = student_data?.getStudentsApply?.sort((a, b) => parseInt(a.student_id) - parseInt(b.student_id));
    const sheet_payload = student_data.getStudentsApply.map((student) => {
        return {
            รหัสนักศึกษา: student.student_id,
            ชื่อ: `${student.name_prefix} ${student.name_th} ${student.lastname_th}`,
            อีเมล: student.account?.email,
            คณะ: student.faculty?.faculty_name_th,
            ภาควิชา: student.department?.department_name_th,
            หลักสุตร: student.curriculum?.curriculum_name_th,
            สถานะ: student.coop_status.toLowerCase(),
        };
    });
    return (
        <div>
            <div className={'w-full flex flex-row gap-x-6 items-center align-bottom'}>
                <h1>รายชื่อผู้สมัครสหกิจศึกษา</h1>
                <p className="px-4 py-2 rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">
                    ภาควิชา : {committee_dep ? committee_dep : '-'}
                </p>
            </div>{' '}
            <div className="flex justify-end mb-4">
                <Link onClick={() => ExportJsonToExcel(sheet_payload, 'รายชื่อนักศึกษาสมัครสหกิจ')} intent="primary">
                    <DocumentArrowDownIcon className="w-6 h-6 text-white mr-2" />
                    <p className="text-[14px] font-bold">Export to Excel</p>
                </Link>
            </div>
            <Divider />
            <StudentRegisterTable student_data={student_data.getStudentsApply} />
        </div>
    );
};

export default StudentInfo;
