import { FC, useContext } from 'react';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { studentIdParser } from 'utils/common';
import { CoopStatus } from '@features/student/interfaces';
import { IStudent } from '@features/student/interfaces/Student';

interface AppliedStatusProps {
    studentData: IStudent;
}

const AppliedStatus: FC<AppliedStatusProps> = ({ studentData }) => {
    const { me } = useContext(AuthenticationContext);

    if (!studentData) {
        return <h1>ไม่พบข้อมูล</h1>;
    }

    const skills = () => {
        return studentData.skills.map((skill, key) => <p key={key}>{skill.skill_name}</p>);
    };

    const status = () => {
        if (studentData.coop_status === CoopStatus.APPLYING) {
            return <p className="px-6 py-2 bg-blue-50 text-blue-800">ส่งใบสมัครแล้ว</p>;
        } else if (studentData.coop_status === CoopStatus.PASSED) {
            return <p className="px-6 py-2 bg-green-50 text-green-800">ผ่านการคัดเลือก</p>;
        } else if (studentData.coop_status === CoopStatus.REJECTED) {
            return <p className="px-6 py-2 bg-red-50 text-red-800">ไม่ผ่านการคัดเลือก</p>;
        }
    };
    return (
        <div className="w-full mb-6 flex flex-col  ">
            <div className="grid grid-cols-4 w-[100%] py-4 min-h-full bg-white text-[20px] px-4  rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                    <p className="mb-4 mt-5 text-xl">สถานะการสมัคร</p>
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4 justify-start align-middle items-center">{status()}</div>
            </div>
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
                    <p>{studentData.name_th + ' ' + studentData.lastname_th}</p>
                    <p>{studentData.faculty?.faculty_name_th}</p>
                    <p>{studentData.department?.department_name_th}</p>
                    <p>{studentData.curriculum?.curriculum_name_th}</p>
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
                    <p>{studentData.citizen_id || '-'}</p>
                    <p>{studentData.gender || '-'}</p>
                    <p>{studentData.weight || '-'}</p>
                    <p>{studentData.height || '-'}</p>
                    <p>{studentData.birth_date || '-'}</p>
                    <p>{studentData.address || '-'}</p>
                    <p>{studentData.phone_number || '-'}</p>
                    <p>{studentData.religion || '-'}</p>
                    <p>{studentData.military_status === true ? 'ผ่าน/ได้รับยกเว้นการเกณฑ์หทาร' : 'อยู่ระหว่างผ่อนผัน/ยังไม่ผ่านการเกณฑ์หทาร' || '-'}</p>
                    <p>{studentData.driver_license === true ? 'มีใบอณุญาตขับขี่รถยนต์' : 'ไม่มีมีใบอณุญาตขับขี่รถยนต์' || '-'}</p>
                </div>
            </div>{' '}
            <p className="mb-4 mt-5 text-3xl">บุคคลที่ติดต่อได้ในกรณีฉุกเฉิน</p>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                    <p>ชื่อ-นามสกุล</p>
                    <p>เกี่ยวข้องเป็น</p>
                    <p>เบอร์ติดต่อ</p>
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">
                    <p>{studentData.emer_name + studentData.emer_lastname || '-'}</p>
                    <p>{studentData.emer_relation || '-'}</p>
                    <p>{studentData.emer_tel || '-'}</p>
                </div>
            </div>{' '}
            <p className="mb-4 mt-5 text-3xl">เอกสารที่แนบมา</p>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                    <p>ใบแสดงผลการเรียน (transcript)</p>
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">
                    {studentData.transcript ? (
                        <a href={studentData.transcript.url || ''} target="_blank" rel="noopener noreferrer">
                            <p>{studentData.transcript.current_name || '-'}</p>
                        </a>
                    ) : (
                        <p>{'-'}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppliedStatus;
