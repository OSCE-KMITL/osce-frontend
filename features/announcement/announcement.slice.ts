import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AnnouncementProps, GetAnnouncementsResponse } from './interfaces';
import { RootState } from '../../store';
import { ICurriculum, IDepartment, IFaculty } from '@constants/faculty-info/interfaces';

interface AnnouncementsState {
    announcements: AnnouncementProps[] | null;
}

const initial_state: AnnouncementsState = { announcements: null };

const announcement_slice = createSlice({
    name: 'counter',
    initialState: initial_state,
    reducers: {
        getAnnouncement: (state, action: PayloadAction<string>) => {
            state.announcements = state.announcements.filter((data) => data.id.includes(action.payload));
        },
        storeAnnouncement: (state, action: PayloadAction<GetAnnouncementsResponse>) => {
            if (action.payload) {
                state.announcements = [...action.payload.getAnnouncements];
            } else state.announcements = null;
        },
    },
});

export const { storeAnnouncement, getAnnouncement } = announcement_slice.actions;

// Other code such as selectors can use the imported `RootState` type

export default announcement_slice.reducer;
