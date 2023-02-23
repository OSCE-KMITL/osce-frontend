// @ts-ignore
import { SubmitHandler, useForm } from 'react-hook-form';
import React from 'react';
import { ICurriculum, IDepartment, IFaculty } from '@constants/faculty-info/interfaces';
import { curriculums, departments, faculties } from '@constants/faculty-info';
import { useDispatch, useSelector } from 'react-redux';
import {
    facultyInfoStateSelector,
    handleBrithDateChange,
    handleCurriculumChange,
    handleDepartmentChange,
    handleFacultyChange,
} from '@features/register-coop/coopregister.slice';
import { AppDispatch } from '@store';

export function useFacultyState() {
    const { faculty, department, curriculum } = useSelector(facultyInfoStateSelector);
    const dispatch: AppDispatch = useDispatch();
    const faculties_option = faculties.map((item) => (
        <option className={'text-[18px]'} key={item.faculty_id} value={item.faculty_id}>
            {item.faculty_name_th}
        </option>
    ));

    const departments_option = departments
        .filter((item) => item.faculty_id === faculty.faculty_id)
        .map((item) => (
            <option className={'text-[18px]'} key={item.department_id} value={item.department_id}>
                {item.department_name_th}
            </option>
        ));

    const curriculum_option = curriculums
        .filter((item) => item.dept_id === department?.department_id && item.faculty_id === department?.faculty_id)
        .map((item) => (
            <option className="text-[18px]" key={item.curriculum_id} value={item.curriculum_id}>
                {item.curriculum_name_th}
            </option>
        ));

    const handleFacultyStateChange = (event) => {
        dispatch(handleFacultyChange(event.target.value));
    };

    const handleDepartmentStateChange = (event) => {
        dispatch(handleDepartmentChange(event.target.value));
    };

    const handleCurriculumStateChange = (event) => {
        dispatch(handleCurriculumChange(event.target.value));
    };
    const handleBrithDateStateChange = (value) => {
        dispatch(handleBrithDateChange(value));
    };

    return {
        faculties_option,
        handleFacultyStateChange,
        faculty,
        departments_option,
        handleDepartmentStateChange,
        department,
        curriculum_option,
        handleCurriculumStateChange,
        curriculum,
        handleBrithDateStateChange,
    };
}
