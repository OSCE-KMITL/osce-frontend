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
        key: '02',
        type: 'group',
        children: [
            {
                label: 'งานที่เปิดรับ',
                key: '/company/myjob',
            },
            {
                label: 'งานที่สมัคร',
                key: '/student/jobApply',
            },
        ],
    },
    {
        label: 'การรายงานผลสหกิจศึกษา',
        key: '03',
        type: 'group',
        children: [
            {
                label: 'รายงานผลสหกิจ',
                key: 'coop report',
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
                key: 'company assessment',
            },
            {
                label: 'ประเมินอาจารย์นิเทศ',
                key: 'company advisor',
            },
        ],
    },
];

export const student_item: MenuProps['items'] = [
    {
        label: 'จัดการสหกิจ',
        key: '01',
        type: 'group',
        children: [
            {
                label: 'ใบสมัครงานสหกิจศึกษา',
                key: 'apply coop',
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
                key: 'coop report',
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
                key: '/student/jobApply',
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
        label: 'จัดการงานที่เปิดรับ',
        key: '01',
        type: 'group',
        children: [
            {
                label: 'งานที่เปิดรับ',
                key: '/company/myjob',
            },
            {
                label: 'เพิ่มงานที่เปิดรับ',
                key: '/jobs/new',
            },
        ],
    },
    {
        label: 'เกี่ยวกับบริษัท',
        key: '01',
        type: 'group',
        children: [
            {
                label: 'ข้อมูลบริษัท',
                key: '/coopregister',
            },
        ],
    },
    {
        label: 'จัดการนักศึกษา',
        key: '01',
        type: 'group',
        children: [
            {
                label: 'นักศึกษาที่สังกัดปัจจุบัน',
                key: '/coopregister',
            },
        ],
    },
];

export const itemsCommittee: MenuProps['items'] = [
    {
        label: 'จัดการผู้ใช้ในระบบ',
        key: '01',
        type: 'group',
        children: [
            {
                label: 'นักศึกษา',
                key: '/coopregister',
            },
            {
                label: 'อาจารย์สหกิจ',
                key: '/coopregister',
            },
            {
                label: 'บริษัทสหกิจ',
                key: '/coopregister',
            },
        ],
    },
    {
        label: 'จัดการสหกิจ',
        key: '02',
        type: 'group',
        children: [
            {
                label: 'กำหนดนักศึกษาให้อาจารย์',
                key: '/coopregister',
            },
            {
                label: 'รวมคะแนนสหกิจ',
                key: '/coopregister',
            },
        ],
    },
    {
        label: 'จัดการงานที่เปิดรับ',
        key: '02',
        type: 'group',
        children: [
            {
                label: 'เพิ่มงานที่เปิดรับ',
                key: '/jobs/new',
            },
        ],
    },
    {
        label: 'จัดการประกาศ',
        key: '02',
        type: 'group',
        children: [
            {
                label: 'เพิ่มประกาศ',
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
