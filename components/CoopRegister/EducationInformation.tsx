import React, { FC, useContext } from 'react';
import Input from '@ui/Input';
import { useFacultyState } from '@features/register-coop/hooks/useFormState';

import { RegisterForm } from './PersonalInformation';
import { registerErrorSchema } from '@features/register-coop/interfaces';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { RoleOption } from '@constants/RoleOptions';
import { studentIdParser } from '../../utils/common';

const EducationInformation: FC<RegisterForm> = ({ register, errors }) => {
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

    const { me } = useContext(AuthenticationContext);
    const student_id = () => {
        if (me?.role === RoleOption.STUDENT) {
            return studentIdParser(me.email);
        } else {
            return null;
        }
    };
    return (
        <>
            <div className="flex flex-col justify-between w-full p-6 rounded-md bg-white my-6">
                <div className="w-[30%]">
                    <p className="text-3xl mb-6 font-bold ">กรอกข้อมูลนักศึกษา</p>
                </div>
                <div className="grid grid-cols-3 gap-x-6 ">
                    <div className="col-span-1">
                        {' '}
                        <Input
                            name={'student_id'}
                            type="text"
                            label={'รหัสนักศึกษา'}
                            fullWidth
                            register={register}
                            isError={errors.student_id && true}
                            placeholder={me?.role === RoleOption.STUDENT ? student_id() : ' 63010000'}
                            errors={errors}
                        />
                    </div>
                    <div className="col-span-1 ">
                        {' '}
                        <Input
                            name={'name'}
                            type="text"
                            label={'ชื่อจริง (ภาษาไทย)'}
                            placeholder={' อาทิตย์ '}
                            fullWidth
                            register={register}
                            isError={errors.name && true}
                            validationSchema={registerErrorSchema.name}
                            errors={errors}
                        />{' '}
                    </div>{' '}
                    <div className="col-span-1 ">
                        {' '}
                        <Input
                            name={'lastname'}
                            type="text"
                            label={'นามสกุล (ภาษาไทย)'}
                            placeholder={' ใจดีมาก '}
                            fullWidth
                            register={register}
                            isError={errors.lastname && true}
                            validationSchema={registerErrorSchema.lastname}
                            errors={errors}
                        />{' '}
                    </div>
                    <div className="col-span-3 ">
                        <div className="grid grid-cols-4 gap-x-6 items-start">
                            <div className="w-full">
                                <label htmlFor="faculty" className="block text-[18px] font-medium text-gray-900 dark:text-white">
                                    คณะ
                                </label>
                                <select
                                    id="faculty"
                                    required={true}
                                    onChange={(event) => handleFacultyStateChange(event)}
                                    className="bg-gray-50 text-[18px] border border-gray-300 overflow-hidden text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    {faculties_option}
                                </select>
                            </div>
                            <div className=" w-full ">
                                {' '}
                                <label htmlFor="countries" className="block text-[18px] font-medium text-gray-900 dark:text-white">
                                    ภาควิชา
                                </label>
                                <select
                                    id="department"
                                    defaultValue={''}
                                    onChange={(event) => handleDepartmentStateChange(event)}
                                    className="bg-gray-50 border border-gray-300 text-[18px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    {department === null && (
                                        <option value={''} selected disabled hidden>
                                            เลือกภาควิชา
                                        </option>
                                    )}
                                    {departments_option}
                                </select>
                            </div>
                            <div className=" w-full">
                                {' '}
                                <label htmlFor="countries" className="block text-[18px] text-[16px] font-medium text-gray-900 dark:text-white">
                                    หลักสูตร
                                </label>
                                <select
                                    id="curriculums"
                                    defaultValue={''}
                                    onChange={(event) => handleCurriculumStateChange(event)}
                                    className="bg-gray-50 border border-gray-300 text-[18px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                            </div>
                            <Input
                                name={'gpa'}
                                type="number"
                                label={'เกรดเฉลี่ย'}
                                fullWidth
                                register={register}
                                isError={errors.gpa && true}
                                errors={errors}
                                placeholder={'3.25'}
                                step
                                validationSchema={registerErrorSchema.gpa}
                            />{' '}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EducationInformation;
