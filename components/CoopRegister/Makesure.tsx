import { studentInfoStateSelector, studentStatusStateSelector } from '@features/student/student.slice';
import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { studentIdParser } from 'utils/common';

interface AppliedStatusProps {}

const MakeSure: FC<AppliedStatusProps> = ({}) => {
    const apply_status = useSelector(studentStatusStateSelector);
    const { registerCoopInput: student_data } = useSelector(studentInfoStateSelector);
    const { me } = useContext(AuthenticationContext);
    if (!student_data) {
        return (
            <>
                <p>null</p>
            </>
        );
    }
    return (
        <div className="w-full mb-6 flex flex-col  ">
            {apply_status === 'APPLIED' && (
                <div className="grid grid-cols-4 w-[100%] py-4 min-h-full bg-white text-[20px] px-4  rounded-md gap-x-6 gap-y-4 ">
                    <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                        <p className="mb-4 mt-5 text-xl">สถานะการสมัคร</p>
                    </div>
                    <div className="col-span-3 grid grid-rows-1 gap-y-4 justify-start align-middle items-center">
                        <p className="px-6 py-2 bg-blue-50 text-blue-800">ส่งใบสมัครแล้ว</p>
                    </div>
                </div>
            )}
            <p className="mb-4 mt-5 text-3xl">ข้อมูลนักศึกษา</p>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-800">
                    <p>รหัสนักศึกษา</p>
                    <p>ชื่อ-นามสกุล</p>
                    <p>คณะ</p>
                    <p>ภาควิชา</p>
                    <p>หลักสูตร</p>
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">
                    <p>{studentIdParser(me?.email)}</p>
                    <p>{student_data.name_th + ' ' + student_data.lastname_th}</p>
                    <p>{student_data.faculty_name_th}</p>
                    <p>{student_data.department_name_th}</p>
                    <p>{student_data.curriculum_name_th}</p>
                </div>
            </div>{' '}
            <p className="mb-4 mt-5 text-3xl">ข้อมูลส่วนตัว</p>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                    <p>เลขบัตรประจำตัวประชาชน</p>
                    <p>เพศ</p>
                    <p>น้ำหนัก (kg)</p>
                    <p>ส่วนสูง (cm)</p>
                    <p>วันเกิด</p>
                    <p>ที่อยู่ปัจจุบัน</p>
                    <p>เบอร์โทรศัพท์</p>
                    <p>ศาสนา</p>
                    <p>สถานะการเกณฑ์หทาร</p>
                    <p>ใบอนุญาติขับขี่รถยนต์</p>
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">
                    <p>{student_data.citizen_id}</p>
                    <p>{student_data.gender}</p>
                    <p>{student_data.weight}</p>
                    <p>{student_data.height}</p>
                    <p>{student_data.birth_date}</p>
                    <p>{student_data.address}</p>
                    <p>{student_data.phone_number}</p>
                    <p>{student_data.religion}</p>
                    <p>{student_data.military_status ? 'ผ่าน/ได้รับยกเว้นการเกณฑ์หทาร' : 'อยู่ระหว่างผ่อนผัน/ยังไม่ผ่านการเกณฑ์หทาร'}</p>
                    <p>{student_data.driver_license ? 'มีใบอนุญาตขับขี่รถยนต์' : 'ไม่มีมีใบอนุญาตขับขี่รถยนต์'}</p>
                </div>
            </div>
        </div>
    );
};

export default MakeSure;
