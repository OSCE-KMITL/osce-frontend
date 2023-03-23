import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerErrorSchema } from '@features/register-coop/interfaces';
import { CommitteeCoopRegisterArgs } from '@components/Manager/CoopApply/helper';
import { useFacultyState } from '@features/register-coop/hooks/useFormState';
import { CoopStatus } from '@features/student/interfaces';
import { useSelector } from 'react-redux';
import { curriculumStateSelector, departmentStateSelector, facultyStateSelector } from '@features/register-coop/coopregister.slice';
import { useAddCoopRegister } from '@features/student/hooks/useAddCoopRegister';
import NotificationService from '@lib/ant_service/NotificationService';
import { GET_STUDENTS } from '@features/student/hooks/useGetStudents';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';

interface OwnProps {}

type Props = OwnProps;

const FooterInput: FC<Props> = (props) => {
    const [isAddStudent, setIsAddStudent] = useState(false);
    const [addCoopRegister, { data, loading, error }] = useAddCoopRegister();
    const {
        faculties_option,
        handleFacultyStateChange,
        departments_option,
        handleDepartmentStateChange,
        department,
        curriculum_option,
        curriculum,
        handleCurriculumStateChange,
    } = useFacultyState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CommitteeCoopRegisterArgs>({ mode: 'onChange' });
    const faculties_obj = useSelector(facultyStateSelector);
    const departments_obj = useSelector(departmentStateSelector);
    const curriculums_obj = useSelector(curriculumStateSelector);
    function handleToggleIsAddStudent() {
        setIsAddStudent((curr) => !curr);
    }

    return (
        <>
            {!isAddStudent && (
                <tr className="w-full flex flex-row justify-between gap-x-3">
                    <p className=""></p>
                    <div
                        onClick={handleToggleIsAddStudent}
                        className="px-4 py-2  text-primary-100 flex justify-center align-middle items-center bg-primary-500 font-bold rounded-md text-center cursor-pointer"
                    >
                        + เพิ่มนักศึกษา
                    </div>
                </tr>
            )}
            {isAddStudent && (
                <tr className="w-full flex flex-row justify-between gap-x-3">
                    <div>
                        <label htmlFor="student_id">รหัสนักศึกษา </label>
                        <input
                            className={'bg-white px-4 py-2 w-full border border-1 rounded-md '}
                            type={'text '}
                            id={'student_id'}
                            name={'student_id'}
                            placeholder={'รหัสนักศึกษา'}
                            {...register('student_id')}
                        />
                    </div>{' '}
                    <div>
                        <label htmlFor="relation" className="block text-[15px] font-medium text-gray-900 dark:text-white">
                            คำนำหน้า
                        </label>
                        <select
                            id="relation"
                            defaultValue={'DEFAULT'}
                            {...register('name_prefix', registerErrorSchema.name_prefix)}
                            className="bg-gray-50 border text-[16px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-2  "
                        >
                            <option value={'DEFAULT'} hidden disabled>
                                คำนำหน้า
                            </option>
                            <option key={'mr.'} value={'นาย'}>
                                นาย
                            </option>
                            <option key={'ms.'} value={'นางสาว'}>
                                นางสาว
                            </option>
                            <option key={'m.'} value={'นาง'}>
                                นาง
                            </option>
                        </select>{' '}
                    </div>
                    <div>
                        <label htmlFor="name_th">ชื่อ</label>
                        <input
                            className={'bg-white px-4 py-2 w-full border border-1 rounded-md '}
                            type={'text '}
                            id={'name_th'}
                            name={'name_th'}
                            placeholder={'กรอกชื่อจริง'}
                            {...register('name_th')}
                        />
                    </div>{' '}
                    <div>
                        <label htmlFor="lastname_th">นามสกุล</label>
                        <input
                            className={'bg-white px-4 py-2 w-full border border-1 rounded-md '}
                            type={'text '}
                            id={'lastname_th'}
                            name={'lastname_th'}
                            placeholder={'กรอกนามสกุล'}
                            {...register('lastname_th')}
                        />
                    </div>{' '}
                    <div>
                        <label htmlFor="faculty">คณะ</label>
                        <select
                            id="faculty"
                            required={true}
                            onChange={(event) => handleFacultyStateChange(event)}
                            className="bg-gray-50 text-[16px] border border-gray-300 overflow-hidden text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2  "
                        >
                            {faculties_option}
                        </select>
                    </div>{' '}
                    <div>
                        <label htmlFor="department">ภาควิชา</label>
                        <select
                            id="department"
                            defaultValue={''}
                            onChange={(event) => handleDepartmentStateChange(event)}
                            className="bg-gray-50 border border-gray-300 text-[16px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  px-4 py-2 "
                        >
                            {department === null && (
                                <option value={''} selected disabled hidden>
                                    เลือกภาควิชา
                                </option>
                            )}
                            {departments_option}
                        </select>
                    </div>{' '}
                    <div>
                        <label htmlFor="department">หลักสูตร</label>
                        <select
                            id="curriculums"
                            defaultValue={''}
                            onChange={(event) => handleCurriculumStateChange(event)}
                            className="bg-gray-50 border border-gray-300 text-[16px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  px-4 py-2"
                        >
                            {curriculum === null && (
                                <option value={''} selected disabled hidden>
                                    เลือกหลักสูตร
                                </option>
                            )}
                            <option value={''} selected disabled hidden>
                                เลือกหลักสูตร
                            </option>
                            {curriculum_option}
                        </select>
                    </div>{' '}
                    <div>
                        <label htmlFor="relation" className="block text-[16px] font-medium text-gray-900 dark:text-white">
                            สถานะ
                        </label>
                        <select
                            id="relation"
                            defaultValue={'DEFAULT'}
                            {...register('coop_status')}
                            className="bg-gray-50 border text-[16px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 "
                        >
                            <option value={'DEFAULT'} hidden disabled>
                                เลือกสถานะ
                            </option>
                            <option key={CoopStatus.SAVED} value={CoopStatus.SAVED}>
                                บันทึกใบสมัคร
                            </option>{' '}
                            <option key={CoopStatus.APPLYING} value={CoopStatus.APPLYING}>
                                ส่งใบสมัคร
                            </option>
                            <option key={CoopStatus.PASSED} value={CoopStatus.PASSED}>
                                ผ่านการคัดเลือก
                            </option>
                            <option key={CoopStatus.REJECTED} value={CoopStatus.REJECTED}>
                                ไม่ผ่านการคัดเลือก
                            </option>
                        </select>{' '}
                    </div>
                    <div className="flex flex-row gap-x-1  items-end ">
                        <div
                            onClick={handleToggleIsAddStudent}
                            className="px-4  py-2 flex justify-center align-middle items-center bg-gray-50 rounded-md text-center cursor-pointer"
                        >
                            ยกเลิก
                        </div>

                        <div
                            onClick={handleSubmit(async (data) => {
                                const payload: CommitteeCoopRegisterArgs = {
                                    ...data,
                                    level_id: curriculums_obj.level_id,
                                    curriculum_id: curriculums_obj.curriculum_id,
                                    curriculum_name_th: curriculums_obj.curriculum_name_th,
                                    curriculum_name_en: curriculums_obj.curriculum_name_en,
                                    faculty_id: faculties_obj.faculty_id,
                                    faculty_name_th: faculties_obj.faculty_name_th,
                                    faculty_name_en: faculties_obj.faculty_name_en,
                                    department_id: departments_obj.department_id,
                                    department_name_en: departments_obj.department_name_en,
                                    department_name_th: departments_obj.department_name_th,
                                };

                                await addCoopRegister({
                                    variables: { committeeRegisterCoopInput: payload },
                                    onCompleted: async (result) => {
                                        NotificationService.getInstance().success('Create Student Successfully', `ทำการเพิ่มนักศึกษาเสร็จสิ้น`);
                                        await reset();
                                        await setIsAddStudent(false);
                                    },
                                    onError: (error) => {
                                        NotificationService.getInstance().error('Error', error.message);
                                        console.log(JSON.stringify(error, null, 2));
                                    },
                                    refetchQueries: [GET_STUDENTS],
                                });
                            })}
                            className="px-4 py-2  text-green-500 flex justify-center align-middle items-center bg-green-100 border border-green-500 font-bold rounded-md text-center cursor-pointer"
                        >
                            {loading ? <LoadingSpinner /> : 'บันทึก'}
                        </div>
                    </div>
                </tr>
            )}
        </>
    );
};

export default FooterInput;
