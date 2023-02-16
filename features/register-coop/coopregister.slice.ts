import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { curriculums, departments, faculties } from '@constants/faculty-info';
import { RootState } from '@store';
import { ICurriculum, IDepartment, IFaculty } from '@constants/faculty-info/interfaces';
import { ILanguageAbility, ISkillState, IUserFacultyState } from '@features/register-coop/interfaces';

export type UserFacultyState = IUserFacultyState;

const initialState: UserFacultyState = {
    faculty: faculties[0],
    department: null,
    curriculum: null,
    birth_date: null,
    skills: [],
    Language_abilities: [],
};

const facultyInfo = createSlice({
    name: 'facultyInfo',
    initialState: initialState,
    reducers: {
        handleFacultyChange: (state, { payload }: PayloadAction<string>) => {
            state.faculty = faculties.find((item) => item.faculty_id === payload);
            state.curriculum = null;
            state.department = null;
        },
        handleDepartmentChange: (state, { payload }: PayloadAction<string>) => {
            state.department = departments.find((item) => item.department_id === payload && item.faculty_id === state.faculty.faculty_id);
            state.curriculum = null;
        },
        handleCurriculumChange: (state, { payload }: PayloadAction<string>) => {
            state.curriculum = curriculums.find(
                (item) => item.curriculum_id === payload && item.dept_id === state.department.department_id && item.faculty_id === state.faculty.faculty_id
            );
        },
        handleBrithDateChange: (state, { payload }: PayloadAction<string>) => {
            state.birth_date = payload;
        },
        handleAddSkill: (state, { payload }: PayloadAction<ISkillState>) => {
            const already = state.skills.find((skill) => skill.skill_name === payload.skill_name);
            if (!already) {
                state.skills.push(payload);
            } else {
                console.error('This skill has already exist');
            }
        },
        handleDiscardSkill: (state, { payload }) => {
            state.skills = state.skills.filter((skill) => skill.skill_name !== payload);
        },
        handleAddLanguageAbilities: (state, { payload }: PayloadAction<ILanguageAbility>) => {
            const already = state.Language_abilities.find((obj) => obj.name === payload.name);
            if (!already) {
                state.Language_abilities.push(payload);
            } else {
                console.error('This skill has already exist');
            }
        },
        handleDiscardLanguageAbilities: (state, { payload }: PayloadAction<string>) => {
            state.Language_abilities = state.Language_abilities.filter((lang) => lang.name !== payload);
        },
    },
});

export const {
    handleFacultyChange,
    handleDepartmentChange,
    handleCurriculumChange,
    handleBrithDateChange,
    handleAddSkill,
    handleDiscardSkill,
    handleAddLanguageAbilities,
    handleDiscardLanguageAbilities,
} = facultyInfo.actions;

// Other code such as selectors can use the imported `RootState` type
// export common user selector
export const facultyInfoStateSelector = (store: RootState) => store.facultyState;
export const facultyStateSelector = (store: RootState): IFaculty => store.facultyState.faculty;
export const departmentStateSelector = (store: RootState): IDepartment => store.facultyState.department;
export const curriculumStateSelector = (store: RootState): ICurriculum => store.facultyState.curriculum;
export const skillsStateSelector = (store: RootState): ISkillState[] => store.facultyState.skills;
export const languageAbilitiesStateSelector = (store: RootState): ILanguageAbility[] => store.facultyState.Language_abilities;
export const birthDateStateSelector = (store: RootState): string => store.facultyState.birth_date;

export default facultyInfo.reducer;
