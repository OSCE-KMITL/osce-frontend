import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Steps, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PersonalInformation from '@components/CoopRegister/PersonalInformation';
import EducationInformation from '@components/CoopRegister/EducationInformation';
import { step_items } from '@components/CoopRegister/steps';
import { RegisterCoopHookState } from '@features/register-coop/interfaces';
import { birthDateStateSelector, curriculumStateSelector, facultyInfoStateSelector, facultyStateSelector } from '@features/register-coop/coopregister.slice';
import EmergencyContact from '@components/CoopRegister/EmergencyContact';
import PersonalSkill from '@components/CoopRegister/PersonalSkill';
import LanguageAbility from '@components/CoopRegister/LanguageAbility';
import TranscriptUpload from '@components/CoopRegister/TranscriptUpload';
import { departmentStateSelector, skillsStateSelector, languageAbilitiesStateSelector } from '../features/register-coop/coopregister.slice';
import { CoopStudentInfo, RegisterCoopPayload } from '../features/student/interfaces/index';
import { REGISTER_COOP, useCoopRegister } from '../features/student/hooks/useCoopRegister';
import NotificationService from '../lib/ant_service/NotificationService';
import LoadingSpinner from '../components/common/Spinner/LoadingSpinner';
import { useMutation } from '@apollo/client';
import { decreaseStep, handleApplyStudentInfo, handleSavedStudentInfo, increaseStep, studentStatusStateSelector } from '@features/student/student.slice';
import { studentStepStateSelector } from '../features/student/student.slice';
import AppliedStatus from '../components/CoopRegister/AppliedStatus';

interface OwnProps {}

type Props = OwnProps;

const CoopRegisterPage: FunctionComponent<Props> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterCoopHookState>({ shouldUseNativeValidation: true, mode: 'onChange' });
    const info = useSelector(facultyInfoStateSelector);
    const faculties_obj = useSelector(facultyStateSelector);
    const departments_obj = useSelector(departmentStateSelector);
    const curriculums_obj = useSelector(curriculumStateSelector);
    const skills = useSelector(skillsStateSelector);
    const languages = useSelector(languageAbilitiesStateSelector);
    const birth_date_state = useSelector(birthDateStateSelector);
    const step = useSelector(studentStepStateSelector);
    const [register_coop, { data, error, loading }] = useCoopRegister();
    const notification_instanst = NotificationService.getInstance();
    const dispatch = useDispatch();

    const apply_status = useSelector(studentStatusStateSelector);

    const onSubmit = async (data: RegisterCoopHookState) => {
        const result: CoopStudentInfo = {
            level_id: curriculums_obj.level_id,
            curriculum_id: curriculums_obj.curriculum_id,
            curriculum_name_th: curriculums_obj.curriculum_name_th,
            curriculum_name_en: curriculums_obj.curriculum_name_en,
            name_th: data.name,
            lastname_th: data.lastname,
            gpa: data.gpa,
            gender: data.gender,
            religion: data.religion,
            military_status: data.military_status,
            driver_license: data.driver_license,
            citizen_id: data.citizen_id,
            weight: data.weight,
            height: data.height,
            address: data.address,
            phone_number: data.phone_number,
            emer_relation: data.emer_relation,
            emer_name: data.emer_name,
            emer_lastname: data.lastname,
            emer_tel: data.emer_tel,
            birth_date: birth_date_state,
            faculty_id: faculties_obj.faculty_id,
            faculty_name_th: faculties_obj.faculty_name_th,
            faculty_name_en: faculties_obj.faculty_name_en,
            department_id: departments_obj.department_id,
            department_name_en: departments_obj.department_name_en,
            department_name_th: departments_obj.department_name_th,
        };

        const payload: RegisterCoopPayload = {
            registerCoopInput: { ...result },
            skills: skills,
            languageAbilities: languages,
        };

        // Check Context state is eequl to saved ?
        // If state not equal to SAVED just saved to redux
        // if state is SAVED will call doRegister()
        if (apply_status !== 'SAVED') {
            dispatch(handleSavedStudentInfo(payload));
        } else {
            await register_coop({
                variables: {
                    ...payload,
                },
                onCompleted: (result) => {
                    notification_instanst.success('ทำการสมัครเสร็จสิ้น', 'โปรดรอติดตามการประกาศผลการสมัคร');
                    dispatch(handleApplyStudentInfo());
                    dispatch(increaseStep());
                },
                onError(error, clientOptions) {
                    notification_instanst.error('พบข้อผิดพลาก', error.message);
                    console.log(JSON.stringify(error, null, 2));
                    dispatch(decreaseStep());
                },
            });
        }
    };

    return (
        <div className="flex flex-col max-w-[100%] min-w-[80%] min-h-screen font-primary_noto ">
            <div className="flex items-center mb-6 w-full bg-primary-500  h-[150px] m-2 rounded-md px-4  text-gray-800">
                <h1 className="font-semibold text-5xl text-white ">สมัครเข้าร่วมสหกิจศึกษา</h1>
            </div>
            <div className="flex items-center justify-center  px-6 py-2 ">
                <Steps size="default" responsive={true} current={step} className={'mb-6 font-primary_noto text-[20px] '} items={step_items} />
            </div>{' '}
            {apply_status === 'SAVED' || apply_status === 'APPLIED' ? (
                <AppliedStatus />
            ) : (
                <>
                    <form>
                        <EducationInformation register={register} errors={errors} />
                        <PersonalInformation register={register} errors={errors} />
                    </form>
                    <EmergencyContact register={register} errors={errors} />
                    <PersonalSkill />
                    <LanguageAbility />
                    <TranscriptUpload />
                </>
            )}
            {apply_status !== 'APPLIED' && (
                <div className="w-full  flex flex-col justify-end items-end gap-y-4 ">
                    <div className="flex gap-4 justify-end items-center">
                        {step == 1 && (
                            <>
                                <button
                                    onClick={() => dispatch(decreaseStep())}
                                    disabled={loading && true}
                                    className="px-6 py-3  text-[21px] rounded-md underline  "
                                >
                                    {loading ? <LoadingSpinner /> : 'ย้อนกลับ'}
                                </button>
                            </>
                        )}
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading && true}
                            className={`px-6 py-3 border text-xl border-primary-500  rounded-md ${
                                apply_status !== 'SAVED'
                                    ? 'text-primary-500  hover:bg-primary-500 hover:text-white'
                                    : 'text-white bg-primary-500  hover:bg-primary-700 hover:text-white '
                            }  `}
                        >
                            {loading && <LoadingSpinner />}
                            {apply_status !== 'SAVED' ? 'บันทึกใบสมัคร' : 'ส่งใบสมัคร'}
                        </button>
                    </div>
                    {step == 1 && (
                        <h1 className="text-md text-red-500">* ส่งใบสมัครแล้วจะไม่สามารถแก้ไขใบสมัครได้ โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนส่งใบสมัคร</h1>
                    )}{' '}
                </div>
            )}
        </div>
    );
};

export default CoopRegisterPage;
