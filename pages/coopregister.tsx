import React, { FunctionComponent, useEffect, useState } from 'react';
import Input from '@ui/Input';
import { useForm } from 'react-hook-form';
import { faculty } from '../constants/FacultyData/faculty';
import { DatePicker, Steps, theme } from 'antd';
import { department, IDepartment } from '../constants/FacultyData/department';
import { curriculum, ICurriculum } from '../constants/FacultyData/curriculum';

interface OwnProps {}

type Props = OwnProps;

export interface RegisterCoop {
    name: string;
    student_id: string;
    gpa: number;
    faculty: string;
    department: string;
    curriculum: string;
}
const CoopRegisterPage: FunctionComponent<Props> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterCoop>({ shouldUseNativeValidation: true, mode: 'onChange' });
    const [selectedFaculty, setSelectedFaculty] = useState<string | null | undefined>(null);
    const [selectedDept, setSelectedDept] = useState<string | null | undefined>(null);
    const [filteredDepartments, setFilteredDepartments] = useState<IDepartment[] | null | undefined>([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState<string | null | undefined>(null);
    const [filteredCurriculum, setFilteredCurriculum] = useState<ICurriculum[] | null | undefined>([]);

    useEffect(() => {
        if (selectedFaculty) {
            const filter = department.filter((dept) => dept.faculty_id === selectedFaculty);
            setFilteredDepartments([...filter]);
        }
    }, [selectedFaculty, selectedDept]);

    useEffect(() => {
        if (!selectedDept) {
            setFilteredCurriculum([]);
        }
        if (selectedDept) {
            const filter = curriculum.filter((curr) => {
                return curr.faculty_id === selectedFaculty && curr.dept_id === selectedDept;
            });
            setFilteredCurriculum([...filter]);
        }
    }, [selectedDept, selectedDept]);
    const description = 'This is a description.';
    return (
        <div className="flex flex-col align-middle  items-center max-w-full min-w-max min-h-screen   font-primary_noto ">
            <div className="w-full md:w-3/5 px-6 py-2 ">
                <Steps
                    responsive={true}
                    current={0}
                    className={'mb-6 font-primary_noto '}
                    items={[
                        {
                            title: 'กรอกใบสมัคร',
                            description,
                        },
                        ,
                        {
                            title: 'ความสามารถพิเศษ',
                            description,
                        },
                        {
                            title: 'แผนการเรียน',
                            description,
                        },
                        {
                            title: 'ตรวจสอบความถูกต้อง',
                            description,
                        },
                        ,
                        {
                            title: 'ยืนยันการส่งใบสมัคร',
                            description,
                        },
                    ]}
                />
            </div>{' '}
            <div className="w-3/5 w-full md:w-3/5 px-6  m-2  text-gray-800 ">
                <h1 className="font-semibold text-3xl  ">สมัครเข้าร่วมสหกิจศึกษา</h1>
                <h3 className="font-light text-xl  text-gray-600">โปรดตรวจสอบข้อมูลให้ถูกต้อง </h3>
            </div>
            <div className="w-full md:w-3/5 p-6 rounded-md bg-white">
                <h1 className="font-semibold text-xl my-2  ">ข้อมูลนักศึกษา</h1>
                <Input
                    name={'name'}
                    type="text"
                    label={'ชื่อ-นามสกุล'}
                    placeholder={'มีนา ใจดี'}
                    fullWidth
                    register={register}
                    isError={errors.name && true}
                    errors={errors}
                />
                <Input
                    name={'student_id'}
                    type="text"
                    label={'รหัสนักศึกษา'}
                    fullWidth
                    register={register}
                    isError={errors.student_id && true}
                    placeholder={'63010000'}
                    errors={errors}
                />
                <Input
                    name={'gpa'}
                    type="number"
                    label={'เกรดเฉลี่ย'}
                    fullWidth
                    register={register}
                    isError={errors.gpa && true}
                    errors={errors}
                    placeholder={'4.00'}
                />{' '}
                <div className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="countries" className="block text-sm font-medium text-gray-900 dark:text-white">
                            คณะ
                        </label>
                        <select
                            id="faculty"
                            onChange={(e) => setSelectedFaculty(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option selected>เลือกคณะ</option>
                            {faculty.map((faculty, index) => (
                                <>
                                    <option key={faculty.faculty_id} value={faculty.faculty_id}>
                                        {faculty.faculty_name_th}
                                    </option>
                                </>
                            ))}
                        </select>{' '}
                    </div>
                    <div>
                        {' '}
                        <label htmlFor="countries" className="block  text-sm font-medium text-gray-900 dark:text-white">
                            ภาควิชา
                        </label>
                        <select
                            id="department"
                            onChange={(event) => setSelectedDept(event.target.value)}
                            defaultValue={null}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {selectedFaculty ? (
                                <>
                                    <option selected>เลือกภาควิชา</option>
                                    {filteredDepartments.map((department, index) => (
                                        <>
                                            <option key={department.department_id} value={department.department_id}>
                                                {department.department_name_th}
                                            </option>
                                        </>
                                    ))}
                                </>
                            ) : (
                                <option selected>เลือกภาควิชา</option>
                            )}
                        </select>{' '}
                    </div>
                    <div>
                        {' '}
                        <label htmlFor="countries" className="block text-sm font-medium text-gray-900 dark:text-white">
                            หลักสูตร
                        </label>
                        <select
                            id="curriculum"
                            onChange={(event) => setSelectedCurriculum(event.target.value)}
                            defaultValue={null}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {filteredDepartments ? (
                                <>
                                    <option selected>เลือกหลักสูตร</option>
                                    {filteredCurriculum.map((curr, index) => (
                                        <>
                                            <option key={curr.curriculum_id} value={curr.curriculum_name_th}>
                                                {curr.curriculum_name_th}
                                            </option>
                                        </>
                                    ))}
                                </>
                            ) : (
                                <option selected>เลือกคณะ</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>{' '}
            <div className="w-full md:w-3/5 p-6 rounded-md bg-white">
                <div className="w-3/5 w-full md:w-3/5 my-2  text-gray-800 ">
                    <h1 className="font-semibold text-xl  ">ข้อมูลส่วนตัว</h1>
                </div>
                <Input
                    name={'name'}
                    type="text"
                    label={'เลขบัตรประจำตัวประชาชน 13 หลัก'}
                    placeholder={'เลขบัตรประจำตัวประชาชน 13 หลัก'}
                    fullWidth
                    register={register}
                    isError={errors.name && true}
                    errors={errors}
                />{' '}
                <Input
                    name={'address'}
                    type="text"
                    label={'ที่อยู่ปัจจุบัน'}
                    placeholder={'ที่อยู่ปัจจุบัน'}
                    fullWidth
                    register={register}
                    isError={errors.name && true}
                    errors={errors}
                />{' '}
                <div className="mb-4 ">
                    <label htmlFor="countries" className="block text-sm font-medium text-gray-900 dark:text-white">
                        วันเกิด
                    </label>
                    <DatePicker
                        className={'py-2 w-full'}
                        onChange={(data) => {
                            console.log(data);
                        }}
                    />
                </div>
                <div className=" flex flex-row w-full grid grid-cols-3 gap-4">
                    <div>
                        {' '}
                        <label htmlFor="relation" className="block  text-sm font-medium text-gray-900 dark:text-white">
                            เพศ
                        </label>
                        <select
                            id="relation"
                            defaultValue={null}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option selected>เลือกเพศ</option>
                            <option>ชาย</option>
                            <option>หญิง</option>
                            <option>LGBTQ+</option>
                            <option>อื่น ๆ</option>
                        </select>{' '}
                    </div>
                    <Input
                        name={'weight'}
                        type="number"
                        label={'น้ำหนัก'}
                        fullWidth
                        register={register}
                        isError={errors.gpa && true}
                        errors={errors}
                        placeholder={'175'}
                    />{' '}
                    <Input
                        name={'height'}
                        type="number"
                        label={'ส่วนสูง'}
                        fullWidth
                        register={register}
                        isError={errors.gpa && true}
                        errors={errors}
                        placeholder={'70'}
                    />{' '}
                </div>
                <div className=" mb-4  ">
                    {' '}
                    <label htmlFor="relation" className="block  text-sm font-medium text-gray-900 dark:text-white">
                        ศาสนา
                    </label>
                    <select
                        id="relation"
                        defaultValue={null}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option>พุทธ</option>
                        <option>อิสลาม</option>
                        <option>คริสต์</option>
                        <option>ฮินดู</option>
                        <option>อื่น ๆ</option>
                    </select>{' '}
                </div>
                <div className="flex items-center mb-4  ">
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        ผ่านการเกณฑ์ทหารแล้ว
                    </label>
                </div>{' '}
                <div className="flex items-center  ">
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        มีใบอนุญาติขับขี่รถยนต์
                    </label>
                </div>
            </div>
            <div className="w-full md:w-3/5 p-6 rounded-md bg-white ">
                <div className="w-3/5 w-full md:w-3/5 my-2  text-gray-800 ">
                    <h1 className="font-semibold text-xl  ">บุคคลที่ติดต่อได้ในกรณีฉุกเฉิน</h1>
                </div>
                <div className={'grid grid-cols-3 gap-4'}>
                    <Input
                        name={'parent'}
                        type="text"
                        label={'ชื่อ-สกุล'}
                        placeholder={'นานี สวยมาก'}
                        fullWidth
                        register={register}
                        isError={errors.name && true}
                        errors={errors}
                    />{' '}
                    <div>
                        {' '}
                        <label htmlFor="relation" className="block  text-sm font-medium text-gray-900 dark:text-white">
                            ความสัมพันธ์
                        </label>
                        <select
                            id="relation"
                            defaultValue={null}
                            placeholder={'เลือกความสัมพันธ์'}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option>บิดา-มารดา</option>
                            <option>พี่สาว-พี่ชาย</option>
                            <option>ญาติ</option>
                            <option>คู่สมรส</option>
                            <option>ผู้ปกครอง</option>
                            <option>อาจารย์-ครู</option>
                            <option>อื่นๆ </option>
                        </select>{' '}
                    </div>
                    <Input
                        name={'phone_number'}
                        type="text"
                        label={'เบอร์โทร'}
                        placeholder={'0612345678'}
                        fullWidth
                        register={register}
                        isError={errors.name && true}
                        errors={errors}
                    />{' '}
                </div>
                <div className="flex mt-6 gap-4 justify-end">
                    <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded-md text-sm hover:bg-gray-700 hover:text-white">ย้อนกลับ</button>
                    <button className="px-6 py-2 border border-primary-500 text-primary-500  rounded-md text-sm hover:bg-primary-500 hover:text-white ">
                        บันทึกข้อมูลนักศึกษา
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoopRegisterPage;
/*
<div className="flex mt-6 gap-4 justify-end">
    <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded-md text-sm hover:bg-gray-700 hover:text-white">ย้อนกลับ</button>
    <button className="px-6 py-2 border border-primary-500 text-primary-500  rounded-md text-sm hover:bg-primary-500 hover:text-white ">
        บันทึกข้อมูลนักศึกษา
    </button>
</div>;
*/
