import React, { FC } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import Icon from 'antd/es/icon';
import { FormOutlined } from '@ant-design/icons';
const SideBar: FC = () => {
    const { SubMenu } = Menu;
    return (
        <div className="static flex justify-center w-1/5 h-screen bg-white shadow-md py-8  ">
            <Menu className="w-full text-md font-medium gap-4 font-primary_noto px-8" mode={'inline'}>
                <Menu.ItemGroup key="g1" title={<span>จัดการสหกิจ</span>}>
                    <Menu.Item key="1">
                        <Link href={'/'}> ใบสมัครงานสหกิจศึกษา</Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="การรายงานผลสหกิจศึกษา">
                    <Menu.Item key="2">รายงานผลสหกิจ</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g3" title="งานที่เปิดรัย">
                    <Menu.Item key="3">รายการงานที่เปิดรับ</Menu.Item>
                    <Menu.Item key="4">งานที่ยื่นสมัคร</Menu.Item>
                </Menu.ItemGroup>{' '}
                <Menu.ItemGroup key="g4" title="การประเมิน">
                    <Menu.Item key="5">ประเมินสถานประกอบการ</Menu.Item>
                    <Menu.Item key="6">ประเมินอาจารย์นิเทศ</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        </div>
    );
};

export default SideBar;
