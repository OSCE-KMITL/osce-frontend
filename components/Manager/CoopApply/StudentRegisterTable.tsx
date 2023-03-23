import React, { FC, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { IStudent } from '@features/student/interfaces/Student';
import { curriculums, departments, faculties } from '@constants/faculty-info';
import { LiteralUnion } from 'antd/es/_util/type';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import { ChangeCoopStatusToThaiFormat } from '../../../utils/common';
import { Modal, Table, Tag } from 'antd';
import { CoopStatus } from '@features/student/interfaces';
import Link from 'next/link';
import { DocumentTextIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import tableStyle from '../../../styles/Table/table.module.scss';
import { GET_STUDENTS } from '@features/student/hooks/useGetStudents';
import { useDeleteStudent } from '@features/student/hooks/useDeleteStudent';
import { ExclamationCircleFilled } from '@ant-design/icons';
import NotificationService from '@lib/ant_service/NotificationService';
import { useSetCoopStatus } from '@features/student/hooks/useSetCoopStatus';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import FooterInput from '@components/Manager/CoopApply/FooterInput';

interface StudentRegisterTableProps {
    student_data: IStudent[];
}

type StudentRegisterTableType = StudentRegisterTableProps;

const StudentRegisterTable: FC<StudentRegisterTableType> = ({ student_data }) => {
    const { confirm } = Modal;

    const [delete_student, { data, loading, error }] = useDeleteStudent();

    const [editingKey, setEditingKey] = useState('');

    const showDeleteModal = (student_id: string) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleFilled />,
            content: `คุณต้องการที่จะลบนักศึกษา "${student_id}" ใช่หรือไม่ ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                return new Promise((resolve, reject) => {
                    delete_student({
                        variables: { studentId: student_id },
                        onCompleted: (result) => {
                            NotificationService.getInstance().success('Deleted successfully', 'deleted successfully');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 50);
                        },
                        onError: (error) => {
                            NotificationService.getInstance().error('Error', '');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 50);
                        },
                        refetchQueries: [GET_STUDENTS],
                    });
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    };

    const rowClassname = (record, index) => {
        if (index % 2 !== 0) {
            return 'bg-[#f2f2f2]';
        }
    };

    const [status, setStatus] = useState<CoopStatus | null>();

    const [setCoopStatus, { loading: set_coop_lading }] = useSetCoopStatus();

    function handleStatusChange(e) {
        e.preventDefault();
        setStatus(e.target.value);
    }

    async function handleSubmit(student_id: string, status: CoopStatus) {
        const current_student = { student_id: student_id, status: status };
        //setStatus(null);
        try {
            await setCoopStatus({
                variables: current_student,
                refetchQueries: [GET_STUDENTS],
                onError: (error) => {
                    NotificationService.getInstance().error('พบข้อผิดพลาด !', error.message);
                },
                onCompleted: () => {
                    NotificationService.getInstance().success('แก้ไขสถานะสำเร็จ !', `แก้ใขสถานะของรหัสนักศึกษา ${student_id} เสร็จสิ้น`);
                    setStatus(null);
                    setEditingKey('');
                },
            });
        } catch (e) {
            console.log(JSON.stringify(e));
        }
        console.log(current_student);
    }

    const student_apply_column: ColumnsType<IStudent> = [
        {
            align: 'center',
            title: 'รหัสนักศึกษา',
            dataIndex: 'student_id',
            width: 180,
            sorter: (a, b) => parseInt(a.student_id) - parseInt(b.student_id),
            filters: student_data.map((student) => {
                return { value: student.student_id, text: student.student_id };
            }),
            onFilter: (value: string, record) => record.student_id.includes(value),
            filterSearch: true,
        },
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name_th',
            render: (value, { name_th, lastname_th, name_prefix }, index) => {
                return <>{name_prefix + '' + name_th + ' ' + lastname_th}</>;
            },
        },
        // {
        //     title: 'ภาควิชา',
        //     dataIndex: 'department',
        //     render: (value, { department }, index) => {
        //         return <>{department.department_name_th}</>;
        //     },
        //     onFilter: (value: string, record) => record.department.department_name_th.includes(value),
        //     filters: faculties.map((fac) => {
        //         return {
        //             value: fac.faculty_name_th,
        //             text: fac.faculty_name_th,
        //             children: departments
        //                 .filter((dept) => dept.faculty_id === fac.faculty_id)
        //                 .map((dept) => {
        //                     return { value: dept.department_name_th, text: dept.department_name_th };
        //                 }),
        //         };
        //     }),
        // },
        {
            title: 'หลักสูตร',
            dataIndex: 'curriculum',
            render: (value, { curriculum }, index) => {
                return <>{curriculum.curriculum_name_th}</>;
            },
            onFilter: (value: string, record) => record.curriculum.curriculum_name_th.includes(value),
            filters: faculties.map((fac) => {
                return {
                    value: fac.faculty_name_th,
                    text: fac.faculty_name_th,
                    children: departments
                        .filter((dept) => dept.faculty_id === fac.faculty_id)
                        .map((dept) => {
                            return {
                                value: dept.department_name_th,
                                text: dept.department_name_th,
                                children: curriculums
                                    .filter((curr) => curr.faculty_id === fac.faculty_id && dept.department_id === curr.dept_id)
                                    .map((curr) => {
                                        return {
                                            value: curr.curriculum_name_th,
                                            text: curr.curriculum_name_th,
                                        };
                                    }),
                            };
                        }),
                };
            }),
        },
        {
            title: 'ปีที่สมัคร',
            dataIndex: 'created_at',
            // sorter: (a, b) => a.created_at.toString().length - b.created_at.toString().length,
            filters: [
                { text: '2566', value: 2566 },
                { text: '2565', value: 2565 },
                { text: '2564', value: 2564 },
                { text: '2563', value: 2563 },
            ],
            onFilter: (value: number, record) => {
                const d = new Date(record.created_at.toString()).getFullYear() + 543;
                return d === value;
            },

            render: (value, { created_at, student_id }, index) => {
                const d = new Date(created_at.toString()).getFullYear();
                return <div>{d + 543}</div>;
            },
        },
        {
            title: 'เอกสาร',
            dataIndex: 'coop_file',
            render: (value, { transcript, student_id, coop_status }, index) => {
                return (
                    <div className={'flex flex-row gap-2'}>
                        <Link
                            href={'/student/' + student_id}
                            className={
                                'px-2 py-1 text-center border  border-gray-800 bg-gray-100 text-gray-500 shadow-sm rounded-md cursor-pointer flex flex-row items-center gap-x-1'
                            }
                        >
                            <DocumentTextIcon className="w-5 h-5  text-gray-600 " />
                            ใบสมัคร
                        </Link>{' '}
                        {transcript ? (
                            <a
                                href={transcript.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className={'px-3 py-1 text-center border  border-gray-800 bg-gray-100 text-gray-500 shadow-sm rounded-md cursor-pointer '}
                            >
                                Transcript
                            </a>
                        ) : null}{' '}
                        <Link
                            href={'/student/' + student_id}
                            className={
                                'px-3 py-1 text-center border  border-gray-800 bg-gray-100 text-gray-500 shadow-sm rounded-md cursor-pointer flex flex-row items-center gap-x-1'
                            }
                        >
                            101
                        </Link>{' '}
                    </div>
                );
            },
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            className: 'max-w-[160px] min-w-[160px]',
            render: (value, { coop_status, student_id }, index) => {
                const tag_color: LiteralUnion<PresetStatusColorType>[] = ['default', 'warning', 'processing', 'success', 'error'];
                const resolved_status_object = ChangeCoopStatusToThaiFormat(coop_status);
                return (
                    <>
                        {editingKey === student_id ? (
                            <>
                                <select
                                    id="status"
                                    name="status"
                                    onChange={(e) => handleStatusChange(e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-1 py-1  "
                                >
                                    <option selected hidden value={coop_status}>
                                        {resolved_status_object.status}
                                    </option>
                                    {/*<option value={CoopStatus.APPLYING}>บันทึกใบสมัคร</option>*/}
                                    <option value={CoopStatus.SAVED}>บันทึกใบสมัคร</option>
                                    <option value={CoopStatus.APPLYING}>ส่งใบสมัคร</option>
                                    <option value={CoopStatus.PASSED}>ผ่านการคัดเลือก</option>
                                    <option value={CoopStatus.REJECTED}>ไม่ผ่านการคัดเลือก</option>
                                </select>
                            </>
                        ) : (
                            <Tag color={tag_color[resolved_status_object.status_index]}>
                                {<p className="text-[15px] px-2 py-1 ">{resolved_status_object.status}</p>}
                            </Tag>
                        )}
                    </>
                );
            },
            filters: [
                { text: 'บันทึกใบสมัคร', value: CoopStatus.SAVED },
                { text: 'ส่งใบสมัคร', value: CoopStatus.APPLYING },
                { text: 'ผ่านการคัดเลือก', value: CoopStatus.PASSED },
                { text: 'ไม่ผ่านการคัดเลือก', value: CoopStatus.REJECTED },
            ],
            onFilter: (value: string, record) => record.coop_status.indexOf(value) === 0,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 140,
            className: 'flex justify-between ',
            render: (value, { transcript, student_id, coop_status }, index) => {
                return (
                    <div className={'flex flex-row gap-4 '}>
                        {editingKey === student_id ? (
                            <div className={'flex flex-row gap-x-1'}>
                                {set_coop_lading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <div className="flex flex-row items-center align-middle w-full gap-x-3 justify-center cursor-pointer">
                                        {' '}
                                        <p className={'text-[16px] '} onClick={() => setEditingKey('')}>
                                            ยกเลิก
                                        </p>
                                        <p
                                            className={
                                                'text-[16px] bg-blue-200 px-4 py-1 rounded-md border border-blue-600 text-blue-600 font-bold cursor-pointer '
                                            }
                                            onClick={() => handleSubmit(student_id, status ? status : coop_status)}
                                        >
                                            บันทึก
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href={'/student/' + student_id} className="cursor-pointer"></Link>
                                <div onClick={() => setEditingKey(student_id)} className="cursor-pointer">
                                    <PencilIcon className="w-6 h-6 text-gray-600 " />
                                </div>{' '}
                                <div className="cursor-pointer" onClick={() => showDeleteModal(student_id)}>
                                    <TrashIcon className="w-6 h-6  text-gray-600 hover:text-red-600 " />
                                </div>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            {' '}
            <Table
                bordered={true}
                size={'large'}
                rowClassName={rowClassname}
                className={tableStyle.customTable}
                columns={student_apply_column}
                dataSource={student_data}
                // footer={() => <FooterInput />}
            />
        </>
    );
};

export default StudentRegisterTable;

//
