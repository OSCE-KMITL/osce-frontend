import React from 'react';
import { Drawer } from 'antd';
import { useCreateAnnouncementDrawer } from './useCreateAnnouncementDrawer';
import CreateAnnouncementStep from './CreateStep/CreateAnnouncementStep';

const CreateAnnouncementDrawer: React.FC = () => {
    const { openDrawer, closeDrawer, openState } = useCreateAnnouncementDrawer();
    return (
        <>
            <p onClick={openDrawer} className=" bg-primary-500 text-white px-4 py-2 rounded-xl  cursor-pointer">
                + สร้างประกาศไหม่
            </p>
            <Drawer title={`Create Ann`} bodyStyle={{ backgroundColor: '#f8f8f8' }} placement="right" size={'large'} onClose={closeDrawer} open={openState}>
                <CreateAnnouncementStep />
            </Drawer>
        </>
    );
};

export default CreateAnnouncementDrawer;
