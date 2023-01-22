import React, { FC } from 'react';
import { Menu } from 'antd';
import { items } from './items';

const SideBar: FC = () => {
    return <Menu className="w-full h-screen text-md font-medium gap-4  font-primary_noto px-8 flex flex-col py-32 " mode={'inline'} items={items}></Menu>;
};

export default SideBar;
