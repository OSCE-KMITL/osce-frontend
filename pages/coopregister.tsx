import React, { FunctionComponent, useContext, useEffect } from 'react';
import RegisterForm from '@components/CoopRegister/RegisterForm';
import { AuthenticationContext } from '@context/AuthContextProvider';

import { Divider } from 'antd';
import { CoopStatus } from '@features/student/interfaces';
import { handleApplyStudentInfo, handleEditStudentInfo, studentStatusStateSelector } from '@features/student/student.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import withAuth from '@components/withAuth/WithAuth';

interface OwnProps {}

type Props = OwnProps;

const CoopRegisterPage: FunctionComponent<Props> = () => {
    const { me, getMeRefetch } = useContext(AuthenticationContext);
    const dispatch = useDispatch();
    const router = useRouter();
    const apply_status = useSelector(studentStatusStateSelector);

    useEffect(() => {
        getMeRefetch();
        if (me) {
            if (me.is_student) {
                if (me.is_student.coop_status !== CoopStatus.DEFAULT) {
                    dispatch(handleApplyStudentInfo());
                }
            } else {
                router.push('/');
            }
        }
    }, [me, router.pathname]);

    return (
        <>
            {' '}
            <div className="w-full flex flex-row justify-between align-bottom items-end cursor-pointer">
                <h1 className="">สมัครเข้าร่วมสหกิจศึกษา</h1>
                {me?.is_student?.coop_status === CoopStatus.SAVED && (
                    <p
                        onClick={() => dispatch(handleEditStudentInfo())}
                        className="px-4 flex flex-row py-2 bg-gray-500 text-gray-200 border border-gray-600 rounded-md"
                    >
                        <span>
                            <PencilSquareIcon className="w-6 h-6" />
                        </span>
                        แก้ไขใบสมัคร
                    </p>
                )}
            </div>
            <Divider></Divider>
            <RegisterForm />
        </>
    );
};

export default CoopRegisterPage;
