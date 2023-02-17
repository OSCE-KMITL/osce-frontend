import { studentInfoStateSelector, studentStatusStateSelector } from '@features/student/student.slice';
import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationContext } from '../../context/AuthContextProvider';
import { studentIdParser } from 'utils/common';

interface AppliedStatusProps {}

const AppliedStatus: FC<AppliedStatusProps> = () => {
    const apply_status = useSelector(studentStatusStateSelector);
    const { registerCoopInput: student_data } = useSelector(studentInfoStateSelector);
    const { me } = useContext(AuthenticationContext);

    return (
        <div className="w-full mb-6 flex flex-col  ">
            {apply_status === 'APPLIED' && (
                <div className="grid grid-cols-4 w-[100%] py-4 min-h-full bg-white text-[20px] px-4  rounded-md gap-x-6 gap-y-4 ">
                    <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                        <h1 className="mb-4 mt-5 text-xl">สถานะการสมัคร</h1>
                    </div>
                    <div className="col-span-3 grid grid-rows-1 gap-y-4 justify-start align-middle items-center">
                        <h1 className="px-6 py-2 bg-blue-50 text-blue-800">ส่งใบสมัครแล้ว</h1>
                    </div>
                </div>
            )}
            <h1 className="mb-4 mt-5 text-3xl">ข้อมูลนักศึกษา</h1>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-800">
                    <h1>รหัสนักศึกษา</h1>
                    <h1>ชื่อ-นามสกุล</h1>
                    <h1>คณะ</h1>
                    <h1>ภาควิชา</h1>
                    <h1>หลักสูตร</h1>
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">
                    <h1>{studentIdParser(me?.email)}</h1>
                    <h1>{student_data.name_th + ' ' + student_data.lastname_th}</h1>
                    <h1>{student_data.faculty_name_th}</h1>
                    <h1>{student_data.department_name_th}</h1>
                    <h1>{student_data.curriculum_name_th}</h1>
                </div>
            </div>{' '}
            <h1 className="mb-4 mt-5 text-3xl">ข้อมูลส่วนตัว</h1>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                    <h1>เลขบัตรประจำตัวประชาชน</h1>
                    <h1>เพศ</h1>
                    <h1>น้ำหนัก (kg)</h1>
                    <h1>ส่วนสูง (cm)</h1>
                    <h1>วันเกิด</h1>
                    <h1>ที่อยู่ปัจจุบัน</h1>
                    <h1>เบอร์โทรศัพท์</h1>
                    <h1>ศาสนา</h1>
                    <h1>สถานะการเกณฑ์หทาร</h1>
                    <h1>ใบอนุญาติขับขี่รถยนต์</h1>
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">
                    <h1>{student_data.citizen_id}</h1>
                    <h1>{student_data.gender}</h1>
                    <h1>{student_data.weight}</h1>
                    <h1>{student_data.height}</h1>
                    <h1>{student_data.birth_date}</h1>
                    <h1>{student_data.address}</h1>
                    <h1>{student_data.phone_number}</h1>
                    <h1>{student_data.religion}</h1>
                    <h1>{student_data.military_status ? 'ผ่าน/ได้รับยกเว้นการเกณฑ์หทาร' : 'อยู่ระหว่างผ่อนผัน/ยังไม่ผ่านการเกณฑ์หทาร'}</h1>
                    <h1>{student_data.driver_license ? 'มีใบอณุญาตขับขี่รถยนต์' : 'ไม่มีมีใบอณุญาตขับขี่รถยนต์'}</h1>
                </div>
            </div>
        </div>
    );
};

export default AppliedStatus;
