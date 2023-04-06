import { studentInfoStateSelector, studentStatusStateSelector, studentStepStateSelector } from '@features/student/student.slice';
import { FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { studentIdParser } from 'utils/common';
import { CoopStatus } from '@features/student/interfaces';
import {
    birthDateStateSelector,
    curriculumStateSelector,
    departmentStateSelector,
    facultyInfoStateSelector,
    facultyStateSelector,
    languageAbilitiesStateSelector,
    skillsStateSelector,
} from '@features/register-coop/coopregister.slice';
import { useCoopRegister } from '@features/student/hooks/useCoopRegister';
import NotificationService from '@lib/ant_service/NotificationService';
import { TranscriptState } from '@features/register-coop/interfaces';

interface AppliedStatusProps {
    transcript?: TranscriptState;
}

const MakeSure: FC<AppliedStatusProps> = ({ transcript }) => {
    const apply_status = useSelector(studentStatusStateSelector);
    const { registerCoopInput: studentData } = useSelector(studentInfoStateSelector);
    const info = useSelector(facultyInfoStateSelector);
    const faculties_obj = useSelector(facultyStateSelector);
    const departments_obj = useSelector(departmentStateSelector);
    const curriculums_obj = useSelector(curriculumStateSelector);
    const skills = useSelector(skillsStateSelector);
    const languages = useSelector(languageAbilitiesStateSelector);
    const birth_date_state = useSelector(birthDateStateSelector);
    const step = useSelector(studentStepStateSelector);
    const [register_coop, { data, error, loading }] = useCoopRegister();
    const notification = NotificationService.getInstance();
    const dispatch = useDispatch();
    const [transcriptFile, setTranscriptFile] = useState<TranscriptState>(null);

    const { me } = useContext(AuthenticationContext);
    if (!studentData) {
        return (
            <>
                <p>null</p>
            </>
        );
    }

    const skill_name = () => {
        if (skills) {
            return skills.map((skill, key) => (
                <>
                    <p key={key}>{skill.skill_name}</p>
                </>
            ));
        } else {
            return <p>-</p>;
        }
    };
    const skill_level = () => {
        if (skills) {
            return skills.map((skill, key) => (
                <>
                    <p key={key}>{skill.level}</p>
                </>
            ));
        } else {
            return <p>-</p>;
        }
    };
    const lang_name = () => {
        if (languages) {
            return languages.map((skill, key) => (
                <>
                    <p key={key}>{skill.name}</p>
                </>
            ));
        } else {
            return <p>-</p>;
        }
    };
    const lang_level = () => {
        if (languages) {
            return languages.map((skill, key) => (
                <>
                    <p key={key}>{skill.level}</p>
                </>
            ));
        } else {
            return <p>-</p>;
        }
    };

    return (
        <div className="w-full mb-6 flex flex-col  ">
            <div className="grid grid-cols-4 w-[100%] py-4 min-h-full bg-white text-[20px] px-4  rounded-md gap-x-6 gap-y-4 ">
                {/*       <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">
                    <p className="mb-4 mt-5 text-xl">ความครบถ้วนของข้อมูล</p>
                </div>
                <div className="col-span-3  flex items-center gap-x-4 justify-start align-middle items-center">
                    <div className="bg-gray-200  w-1/3 text-sm font-semibold border border-green-600 text-gray-800 inline-flex items-center rounded-xl ">
                        <p
                            className="bg-green-200 text-green-600  text-center shadow-sm px-5  font-semibold inline-flex items-center p-1.5 rounded-xl "
                            //style={{ width: `${checkIsCompleteInformation(studentData)}%` }}
                            style={{ width: '80%' }}
                        >
                            {checkIsCompleteInformation(studentData).toFixed(0)} %
                        </p>
                    </div>
                    <p className="bg-gray-100 text-gray-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        กรอกข้อมูลครบแล้ว
                    </p>
                </div>*/}
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
                    <p>{studentData.student_id}</p>
                    <p>{studentData.name_th + ' ' + studentData.lastname_th}</p>
                    <p>{faculties_obj?.faculty_name_th}</p>
                    <p>{departments_obj?.department_name_th}</p>
                    <p>{curriculums_obj?.curriculum_name_th}</p>
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
                    <p>{studentData.emer_name + ' ' + studentData.emer_lastname || '-'}</p>
                    <p>{studentData.emer_relation || '-'}</p>
                    <p>{studentData.emer_tel || '-'}</p>
                </div>
            </div>{' '}
            <p className="mb-4 mt-5 text-3xl">ความสามารถพิเศษ</p>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">{skill_name()}</div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">{skill_level()}</div>
            </div>
            <p className="mb-4 mt-5 text-3xl">ทักษะทางภาษา</p>
            <div className="grid grid-cols-4 w-[100%] min-h-full bg-white text-[20px] px-6 py-6 rounded-md gap-x-6 gap-y-4 ">
                <div className="col-span-1 grid grid-rows-1 gap-y-4 text-gray-600">{lang_name()}</div>
                <div className="col-span-3 grid grid-rows-1 gap-y-4">{lang_level()}</div>
            </div>
        </div>
    );
};

export default MakeSure;
