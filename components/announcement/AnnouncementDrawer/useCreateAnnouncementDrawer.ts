import { useState } from 'react';

export const useCreateAnnouncementDrawer = () => {
    const [openState, setOpenState] = useState<boolean>(false);

    const openDrawer = (): void => {
        setOpenState(true);
    };
    const closeDrawer = (): void => {
        setOpenState(false);
    };

    return { openState, openDrawer, closeDrawer };
};
