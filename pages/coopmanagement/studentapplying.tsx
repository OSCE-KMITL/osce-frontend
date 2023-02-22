import { useGetStudents } from '@features/student/hooks/useGetStudents';
import React, { FC } from 'react';
import MessageService from '../../lib/ant_service/MessageService';
import SkeletonLoading from '@ui/SkeletonLoading';
import NotificationService from '../../lib/ant_service/NotificationService';

const StudentApplying: FC = () => {
    const { data, loading, error } = useGetStudents();
    const message = NotificationService.getInstance();

    if (loading) {
        return <SkeletonLoading />;
    }
    if (error) {
        message.error('พบข้อผิดพลาด', error.message);
        return <SkeletonLoading />;
    }

    console.log(data);
    return (
        <div className="w-full">
            <div className="w-full font-primary_noto">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-white-800">รายชื่อผู้สมัครสหกิจศึกษา</p>
                    </div>
                </div>
                <div className="px-2 md:px-5 pb-5">
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap ">
                            <tbody>
                                {data.getStudents.map((student) => (
                                    <>
                                        <tr className="text-sm even:bg-gray-100 odd:bg-gray-200 text-gray-600 h-16 px-6 w-full">
                                            <td className="">
                                                <div className="flex items-center pl-16">
                                                    <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                                                        <p className="text-xl  font-bold leading-3 text-white">{student.name_th.charAt(0)}</p>
                                                    </div>
                                                    <div className="pl-4">
                                                        <p className="text-xl font-medium leading-none text-gray-800">
                                                            {student.name_th + ' ' + student.lastname_th}
                                                        </p>
                                                        <p className="text-xs leading-3 text-gray-600 mt-2">{student.student_id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-16">
                                                <p>{student.faculty.faculty_name_th}</p>
                                            </td>
                                            <td>
                                                <p>{student.department.department_name_th}</p>
                                            </td>
                                            <td>
                                                <p>{student.curriculum.curriculum_name_th}</p>
                                            </td>
                                            <td>
                                                <p className="pl-16">Profile</p>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentApplying;
