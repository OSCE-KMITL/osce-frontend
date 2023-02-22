import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { curriculums, departments, faculties } from '@constants/faculty-info';
import { RootState } from '@store';
import { ICurriculum, IDepartment, IFaculty } from '@constants/faculty-info/interfaces';
import { ILanguageAbility, ISkillState, IUserFacultyState } from '@features/register-coop/interfaces';
import { RegisterCoopPayload } from './interfaces/index';

type Status = 'SAVED' | 'APPLIED' | 'DEFAULT';
export type StudentInfoState = { payload?: RegisterCoopPayload | null; status: Status; step: number };

const initialState: StudentInfoState = {
    payload: null,
    status: 'DEFAULT',
    step: 0,
};

const student_info = createSlice({
    name: 'student_info',
    initialState: initialState,
    reducers: {
        handleSavedStudentInfo: (state, { payload }: PayloadAction<RegisterCoopPayload>) => {
            state.payload = payload;
            state.status = 'SAVED';
            state.step = 1;
        },
        handleApplyStudentInfo: (state, { payload }: PayloadAction<void>) => {
            state.status = 'APPLIED';
            state.step = 4;
        },
        increaseStep: (state, { payload }: PayloadAction<void>) => {
            state.step = state.step + 1;
        },
        decreaseStep: (state, { payload }: PayloadAction<void>) => {
            state.step = state.step - 1;
            state.status = 'DEFAULT';
        },
    },
});

export const { handleApplyStudentInfo, handleSavedStudentInfo, increaseStep, decreaseStep } = student_info.actions;

// Other code such as selectors can use the imported `RootState` type
// export common user selector
export const studentInfoStateSelector = (store: RootState) => store.studentState?.payload;
export const studentStatusStateSelector = (store: RootState) => store.studentState.status;
export const studentStepStateSelector = (store: RootState) => store.studentState.step;

export default student_info.reducer;
