import { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
    {
        label: 'จัดการสหกิจ',
        key: '01',
        type: 'group',
        children: [
            {
                label: 'ใบสมัครงานสหกิจศึกษา',
                key: '/coopregister',
            },
        ],
    },
    {
        label: 'งานที่เปิดรับ',
        key: '03',
        type: 'group',
        children: [
            {
                label: 'งานที่เปิดรับ',
                key: '/jobs',
            },
            {
                label: 'งานที่สมัคร',
                key: '/applying',
            },
        ],
    },
    {
        label: 'การรายงานผลสหกิจศึกษา',
        key: '02',
        type: 'group',
        children: [
            {
                label: 'รายงานผลสหกิจ',
                key: '/coopreport',
            },
        ],
    },

    {
        label: 'การประเมินผล',
        key: '04',
        type: 'group',
        children: [
            {
                label: 'ประเมินสถานประกอบการ',
                key: '/companyassessment',
            },
            {
                label: 'ประเมินอาจารย์นิเทศ',
                key: '/advisorassessment',
            },
        ],
    },
];
export const itemsCompany: MenuProps['items'] = [
    {
        label: 'จัดการสหกิจ',
        key: '01',
        type: 'group',
        children: [
            {
                label: 'ใบสมัครงานสหกิจศึกษา',
                key: '/coopregister',
            },
        ],
    },
];
{
    /*            <Menu.ItemGroup key="g1" title={<span>จัดการสหกิจ</span>}>
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
            </Menu.ItemGroup>*/
}
