import React, { FunctionComponent, useContext } from 'react';

import { Steps } from 'antd';

import { useRouter } from 'next/router';
import { AuthenticationContext } from '../context/AuthContextProvider';
import PersonalInformation from '../components/CoopRegister/PersonalInformation';
import EducationInformation from '../components/CoopRegister/EducationInformation';
import { step_items } from '../components/CoopRegister/steps';

interface OwnProps {}

type Props = OwnProps;

export interface RegisterCoop {
    name: string;
    student_id: string;
    gpa: number;
    faculty: string;
    department: string;
    curriculum: string;
}
const CoopRegisterPage: FunctionComponent<Props> = (props) => {
    const { me } = useContext(AuthenticationContext);
    const router = useRouter();

    return (
        <div className="flex flex-col max-w-full min-w-max min-h-screen font-primary_noto ">
            <div className="w-full  px-6 py-2 ">
                <Steps responsive={true} current={0} className={'mb-6 font-primary_noto'} items={step_items} />
            </div>{' '}
            <div className="w-3/5 w-full  m-2  text-gray-800">
                <h1 className="font-semibold text-3xl  ">สมัครเข้าร่วมสหกิจศึกษา</h1>
                <h3 className="font-light text-xl  text-gray-600">โปรดตรวจสอบข้อมูลให้ถูกต้อง </h3>
            </div>
            <EducationInformation />
            <PersonalInformation />
            <div className="w-full   ">
                <div className="flex gap-4 justify-end">
                    <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded-md text-sm hover:bg-gray-700 hover:text-white">ย้อนกลับ</button>
                    <button className="px-6 py-2 border border-primary-500 text-primary-500  rounded-md text-sm hover:bg-primary-500 hover:text-white ">
                        บันทึกข้อมูลนักศึกษา
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoopRegisterPage;
/*
<div className="flex mt-6 gap-4 justify-end">
    <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded-md text-sm hover:bg-gray-700 hover:text-white">ย้อนกลับ</button>
    <button className="px-6 py-2 border border-primary-500 text-primary-500  rounded-md text-sm hover:bg-primary-500 hover:text-white ">
        บันทึกข้อมูลนักศึกษา
    </button>
</div>;
*/
