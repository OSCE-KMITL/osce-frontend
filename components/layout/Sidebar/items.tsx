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
                key: '/coopregister',
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
                key: '/student/report/',
            },
        ],
    },
    {
        label: 'ข้อมูลงาน',
        key: '03',
        type: 'group',
        children: [
            {
                label: 'งานที่เปิดรับ',
                key: '/student/job-list',
            },
            {
                label: 'งานที่สมัคร',
                key: '/student/job-applying',
            },
        ],
    },

    {
        label: 'การประเมินผล',
        key: '05',
        type: 'group',
        children: [
            {
                label: 'ประเมินสถานประกอบการ',
                key: '/assessment/company-assessment',
            },
            {
                label: 'ประเมินอาจารย์นิเทศ',
                key: '/assessment/advisor-assessment',
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
        key: '02',
        type: 'group',
        children: [
            {
                label: 'ข้อมูลบริษัท',
                key: '/company/profile',
            },
        ],
    },
    {
        label: 'จัดการนักศึกษา',
        key: '03',
        type: 'group',
        children: [
            {
                label: 'นักศึกษาที่สังกัดปัจจุบัน',
                key: '/company/my-students',
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
                key: '/manager/accounts',
            },
            {
                label: 'อาจารย์สหกิจ',
                key: '/manager/advisor-account',
            },
            {
                label: 'บริษัท',
                key: '/manager/company-account',
            },
        ],
    },
    {
        label: 'จัดการสหกิจ',
        key: '02',
        type: 'group',
        children: [
            {
                label: 'รายชื่อผู้สมัครสหกิจศึกษา',
                key: '/manager/coop-applying',
            },
            {
                label: 'กำหนดนักศึกษาให้อาจารย์',
                key: '/manager/advisor-assign',
            },
            {
                label: 'รวมคะแนนสหกิจ',
                key: '/manager/coop-score',
            },
        ],
    },

    {
        label: 'จัดการงานที่เปิดรับ',
        key: '03',
        type: 'group',
        children: [
            {
                label: 'งานที่เปิดรับ',
                key: '/jobs',
            },
            {
                label: 'เพิ่มงานที่เปิดรับ',
                key: '/jobs/new',
            },
            {
                label: 'งานที่บริษัทตอบรับ',
                key: '/manager/approve-job',
            },
            {
                label: 'กำหนดงานให้นักศึกษา',
                key: '/manager/assign-job',
            },
        ],
    },
];
