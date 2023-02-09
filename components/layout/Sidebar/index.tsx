import React, { FC } from 'react';
import { Menu } from 'antd';
import { items } from './items';
import { useRouter } from 'next/router';

const SideBar: FC = () => {
    const router = useRouter();
    return (
        <Menu
            onSelect={(action) => {
                router.push(action.key);
            }}
            className="w-full h-screen text-md font-medium gap-4  font-primary_noto px-8 flex flex-col py-32 "
            mode={'inline'}
            items={items}
        ></Menu>
    );
};

export default SideBar;
