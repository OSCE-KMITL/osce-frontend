import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Steps } from 'antd';
import { useSelector } from 'react-redux';
import PersonalInformation from '@components/CoopRegister/PersonalInformation';
import EducationInformation from '@components/CoopRegister/EducationInformation';
import { step_items } from '@components/CoopRegister/steps';
import { RegisterCoopHookState } from '@features/register-coop/interfaces';
import { facultyInfoStateSelector } from '@features/register-coop/coopregister.slice';
import EmergencyContact from '@components/CoopRegister/EmergencyContact';
import PersonalSkill from '@components/CoopRegister/PersonalSkill';
import LanguageAbility from '@components/CoopRegister/LanguageAbility';
import TranscriptUpload from '@components/CoopRegister/TranscriptUpload';

interface OwnProps {}

type Props = OwnProps;

const CoopRegisterPage: FunctionComponent<Props> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterCoopHookState>({ shouldUseNativeValidation: true, mode: 'onChange' });
    const [step, setStep] = useState(0);
    let info = useSelector(facultyInfoStateSelector);
    const onSubmit = (data) => {
        const result = { ...data, ...info };
        setStep((step) => step + 1);
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-[100%] min-w-[80%] min-h-screen font-primary_noto ">
            <div className="flex items-center mb-6 w-full bg-primary-500 w-full h-[150px] m-2 rounded-md px-4  text-gray-800">
                <h1 className="font-semibold text-5xl text-white ">สมัครเข้าร่วมสหกิจศึกษา</h1>
            </div>
            <div className="flex items-center justify-center  px-6 py-2 ">
                <Steps responsive={true} current={step} className={'mb-6 font-primary_noto'} items={step_items} />
            </div>{' '}
            <EducationInformation register={register} errors={errors} />
            <PersonalInformation register={register} errors={errors} />
            <EmergencyContact register={register} errors={errors} />
            <PersonalSkill />
            <LanguageAbility />
            <TranscriptUpload />
            <div className="w-full   ">
                <div className="flex gap-4 justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 border text-[20px] border-primary-500 text-primary-500  rounded-md text-sm hover:bg-primary-500 hover:text-white "
                    >
                        บันทึก
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CoopRegisterPage;
