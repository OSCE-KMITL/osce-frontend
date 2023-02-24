import React, { FC, useContext } from 'react';
import { Menu } from 'antd';
import { items, itemsCommittee, itemsCompany, student_item } from './items';
import { useRouter } from 'next/router';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { RoleOption } from '@constants/RoleOptions';

const SideBar: FC = () => {
    const { me } = useContext(AuthenticationContext);
    const router = useRouter();

    const roleChecking = () => {
        if (me?.role === RoleOption.STUDENT) {
            return student_item;
        } else if (me?.role === RoleOption.COMPANY) {
            return itemsCompany;
        } else if (me?.role === RoleOption.COMMITTEE) {
            return itemsCommittee;
        }
    };
    return (
        <Menu
            onSelect={(action) => {
                router.push(action.key);
            }}
            selectedKeys={[router.pathname]}
            className="w-full h-screen text-md font-medium gap-4  font-primary_noto px-8 flex flex-col py-32 "
            mode={'inline'}
            items={roleChecking()}
        ></Menu>
    );
};

export default SideBar;
