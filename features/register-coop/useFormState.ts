// @ts-ignore
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IDepartment } from '../../constants/FacultyData/department';
import { ICurriculum } from '../../constants/FacultyData/curriculum';
export interface RegisterCoop {
    name: string;
    student_id: string;
    gpa: number;
    faculty: string;
    department: string;
    curriculum: string;
}
export function useRegisterFromState() {
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

    return {
        register,
        handleSubmit,
        errors,
        reset,
        selectedFaculty,
        setSelectedFaculty,
        selectedDept,
        setSelectedDept,
        filteredDepartments,
        setFilteredDepartments,
        selectedCurriculum,
        setSelectedCurriculum,
        filteredCurriculum,
        setFilteredCurriculum,
    };
}
