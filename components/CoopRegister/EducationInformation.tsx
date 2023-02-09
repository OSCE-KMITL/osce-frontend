import React, { FC, useEffect } from 'react';
import Input from '@ui/Input';
import { faculty } from '../../constants/FacultyData/faculty';
import { useRegisterFromState } from '../../features/register-coop/useFormState';
import { department } from '../../constants/FacultyData/department';
import { curriculum } from '../../constants/FacultyData/curriculum';

const EducationInformation: FC = () => {
    const {
        register,
        errors,
        selectedFaculty,
        setSelectedFaculty,
        selectedDept,
        setSelectedDept,
        filteredDepartments,
        setFilteredDepartments,
        setSelectedCurriculum,
        filteredCurriculum,
        setFilteredCurriculum,
    } = useRegisterFromState();

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
    return (
        <>
            {' '}
            <div className="flex flex-row justify-between w-full p-6 rounded-md bg-white my-6">
                <div className="w-[30%]">
                    <p className="text-[18px] font-bold">ข้อมูลนักศึกษา</p>
                    <p className="text-[16px] text-gray-400 font-secondary_sarabun">กรอกนักศึกษาปัจจุบันเพื่อใช้ในการสร้างใบสมัครอัตโนมัติ</p>
                </div>
                <div className="w-[70%] ">
                    <Input
                        name={'name'}
                        type="text"
                        label={'ชื่อ-นามสกุล'}
                        placeholder={'มีนา ใจดี'}
                        fullWidth
                        register={register}
                        isError={errors.name && true}
                        errors={errors}
                    />{' '}
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
                    <div className="flex flex-row gap-6">
                        <div className=" w-[30%]">
                            <label htmlFor="faculty" className="block text-[16px] font-medium text-gray-900 dark:text-white">
                                คณะ
                            </label>
                            <select
                                id="faculty"
                                onChange={(e) => setSelectedFaculty(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            >
                                <option disabled hidden>
                                    เลือกคณะ
                                </option>
                                {faculty.map((faculty) => (
                                    <option key={faculty.faculty_id} value={faculty.faculty_id}>
                                        {faculty.faculty_name_th}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className=" w-[30%]">
                            {' '}
                            <label htmlFor="countries" className="block text-[16px] font-medium text-gray-900 dark:text-white">
                                ภาควิชา
                            </label>
                            <select
                                id="department"
                                onChange={(event) => setSelectedDept(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            >
                                {selectedFaculty ? (
                                    <>
                                        <option hidden>เลือกภาควิชา....</option>
                                        {filteredDepartments.map((department) => (
                                            <option key={department.department_id} value={department.department_id}>
                                                {department.department_name_th}
                                            </option>
                                        ))}
                                    </>
                                ) : (
                                    <option>เลือกภาควิชา</option>
                                )}
                            </select>
                        </div>
                        <div className=" w-[30%]">
                            {' '}
                            <label htmlFor="countries" className="block text-[16px] font-medium text-gray-900 dark:text-white">
                                หลักสูตร
                            </label>
                            <select
                                id="curriculum"
                                onChange={(event) => setSelectedCurriculum(event.target.value)}
                                className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            >
                                {filteredDepartments ? (
                                    <>
                                        <option>เลือกหลักสูตร</option>
                                        {filteredCurriculum.map((curr) => (
                                            <option key={curr.curriculum_id} value={curr.curriculum_name_th}>
                                                {curr.curriculum_name_th}
                                            </option>
                                        ))}
                                    </>
                                ) : (
                                    <option>เลือกคณะ</option>
                                )}
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
                            placeholder={'4.00'}
                        />{' '}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EducationInformation;
