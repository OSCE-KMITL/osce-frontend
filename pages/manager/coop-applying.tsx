import React from 'react';
import { Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import tableStyle from '../../styles/Table/table.module.scss';
import { useGetStudents } from '@features/student/hooks/useGetStudents';
import { IStudent } from '@features/student/interfaces/Student';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const StudentInfo: React.FC = () => {
    const { data: student_data, loading, error } = useGetStudents();
    const columns: ColumnsType<IStudent> = [
        {
            title: 'StudentID',
            dataIndex: 'student_id',
        },
        {
            title: 'Name',
            dataIndex: 'name_th',
            render: (value, { name_th, lastname_th, name_prefix }, index) => {
                return <>{name_prefix + '' + name_th + ' ' + lastname_th}</>;
            },
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            render: (value, { faculty }, index) => {
                return <>{faculty.faculty_name_th}</>;
            },
        },
        {
            title: 'Department',
            dataIndex: 'department',
            render: (value, { department }, index) => {
                return <>{department.department_name_th}</>;
            },
        },

        {
            title: 'Curriculum',
            dataIndex: 'curriculum',
            render: (value, { curriculum }, index) => {
                return <>{curriculum.curriculum_name_th}</>;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (value, { coop_status }, index) => {
                return <>{coop_status.toLowerCase()}</>;
            },
        },
        {
            title: 'Coop Files',
            dataIndex: 'coop_file',
            render: (value, { transcript }, index) => {
                return (
                    <div className={'flex flex-row gap-2'}>
                        <div className={'px-4 py-1 text-center bg-primary-100 text-primary-500  border border-primary-500 rounded-md cursor-pointer'}>102</div>
                        <div className={'px-4 py-1 text-center bg-primary-100 text-primary-500  border border-primary-500 rounded-md cursor-pointer '}>103</div>
                        <div className={'px-4 py-1 text-center bg-primary-100 text-primary-500  border border-primary-500 rounded-md cursor-pointer '}>
                            104
                        </div>{' '}
                        <div className={'px-4 py-1 text-center bg-primary-100 text-primary-500  border border-primary-500 rounded-md cursor-pointer '}>105</div>{' '}
                    </div>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, { transcript, student_id }, index) => {
                return (
                    <div className={'flex flex-row gap-4'}>
                        <Link href={'/student/' + student_id} className="cursor-pointer">
                            <MagnifyingGlassIcon className="w-6 h-6  text-gray-600 " />
                        </Link>
                        <div className="cursor-pointer">
                            <PencilSquareIcon className="w-6 h-6 text-gray-600 " />
                        </div>{' '}
                        <div className="cursor-pointer">
                            <TrashIcon className="w-6 h-6  text-gray-600 hover:text-red-600 " />
                        </div>
                    </div>
                );
            },
        },
    ];
    const rowClassname = (record, index) => {
        if (index % 2 !== 0) {
            return 'bg-[#f2f2f2]';
        }
    };
    if (loading) {
        return <p>loading</p>;
    }
    if (error) {
        return <p>error</p>;
    }
    return (
        <div>
            <h1>รายชื่อผู้สมัครสหกิจศึกษา</h1>
            <Divider />
            <Table
                bordered={true}
                size={'large'}
                rowClassName={rowClassname}
                className={tableStyle.customTable}
                columns={columns}
                dataSource={student_data.getStudents}
            />
        </div>
    );
};

export default StudentInfo;
