import React, { FunctionComponent, useContext, useEffect } from 'react';
import RegisterForm from '@components/CoopRegister/RegisterForm';
import { AuthenticationContext } from '@context/AuthContextProvider';

import { Divider } from 'antd';
import { CoopStatus } from '@features/student/interfaces';
import { handleApplyStudentInfo } from '@features/student/student.slice';
import { useDispatch } from 'react-redux';
interface OwnProps {}

type Props = OwnProps;

const CoopRegisterPage: FunctionComponent<Props> = () => {
    const { me } = useContext(AuthenticationContext);
    const dispatch = useDispatch();
    useEffect(() => {
        if (me) {
            if (me.is_student?.coop_status !== CoopStatus.DEFAULT) {
                dispatch(handleApplyStudentInfo());
            }
        }
    }, []);

    return (
        <>
            {' '}
            <h1 className="">สมัครเข้าร่วมสหกิจศึกษา</h1>
            <Divider></Divider>
            <RegisterForm />
        </>
    );
};

export default CoopRegisterPage;
