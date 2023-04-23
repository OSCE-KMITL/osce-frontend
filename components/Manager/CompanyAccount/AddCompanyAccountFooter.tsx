import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { regExPattern } from '@features/register-coop/interfaces';
import NotificationService from '@lib/ant_service/NotificationService';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import { RoleOption } from '@constants/RoleOptions';
import { RegisterAdvisorProps, useAddAdvisor } from '@features/advisor/hooks/AddAdvisor';

type Props = {};
export const AddCompanyFooter = (props: Props) => {
    const [isAddAdvisor, setIsAddAdvisor] = useState(false);
    const [createAdvisor, { loading: create_loading }] = useAddAdvisor();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterAdvisorProps>({ mode: 'onChange' });

    function handleToggleIsAddAdvisor() {
        setIsAddAdvisor((curr) => !curr);
    }

    async function onSubmit(data: RegisterAdvisorProps) {
        const payload: RegisterAdvisorProps = { ...data };
        try {
            await createAdvisor({
                variables: { payload: payload },
                onError: (error) => {
                    console.log(JSON.parse(error.message));
                    NotificationService.getInstance().error('พบข้อผิดพลาด', error.message);
                },
                onCompleted: () => {
                    NotificationService.getInstance().success('เพิ่มบัญชีเสร็จสิ้น', `เพิ่มบัญชีเสร็จสิ้น`);
                    reset();
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            {!isAddAdvisor && (
                <tr className="w-full flex flex-row justify-between gap-x-3">
                    <p className=""></p>
                    <div
                        onClick={handleToggleIsAddAdvisor}
                        className="px-4 py-2  text-primary-100 flex justify-center align-middle items-center bg-primary-500 font-bold rounded-md text-center cursor-pointer"
                    >
                        + อาจารย์สหกิจ
                    </div>
                </tr>
            )}
            {isAddAdvisor && (
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-row gap-x-3  items-start">
                    <div>
                        <label htmlFor="email">อีเมล</label>
                        <input
                            className={'bg-white px-4 py-2 w-full border border-1 rounded-md '}
                            type={'email'}
                            id={'email'}
                            name={'email'}
                            placeholder={'กรอกอีเมล'}
                            {...register('email', { pattern: { value: regExPattern.email, message: 'รูปแบบไม่ถูกต้อง' } })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>{' '}
                    <div>
                        <label htmlFor="name_prefix">ตำแหน่ง </label>
                        <input
                            className={'bg-white px-2 py-2 w-full border border-1 rounded-md '}
                            type={'text'}
                            id={'name_prefix'}
                            name={'name_prefix'}
                            placeholder={'ผศ.ดร'}
                            {...register('name_prefix', {
                                maxLength: { value: 10, message: 'รูปแบบไม่ถูกต้อง' },
                                required: 'กรุณากรอกข้อมูล',
                            })}
                        />
                        {errors.name_prefix && <p className="text-red-500">{errors.name_prefix.message}</p>}
                    </div>{' '}
                    <div>
                        <label htmlFor="name">ชื่อ</label>
                        <input
                            className={'bg-white px-4 py-2 w-full border border-1 rounded-md '}
                            type={'text '}
                            id={'name'}
                            name={'name'}
                            placeholder={'กรอกชื่อจริง'}
                            {...register('name', {
                                maxLength: { value: 100, message: 'รูปแบบไม่ถูกต้อง' },
                                required: 'กรุณากรอกข้อมูล',
                            })}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>{' '}
                    <div>
                        <label htmlFor="lastname">นามสกุล</label>
                        <input
                            className={'bg-white px-4 py-2 w-full border border-1 rounded-md '}
                            type={'text '}
                            id={'lastname'}
                            name={'lastname'}
                            placeholder={'กรอกนามสกุล'}
                            {...register('last_name', {
                                maxLength: { value: 100, message: 'รูปแบบไม่ถูกต้อง' },
                                required: 'กรุณากรอกข้อมูล',
                            })}
                        />
                        {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                    </div>{' '}
                    <div>
                        <label htmlFor="is_committee">บทบาท</label>
                        <select
                            id="relation"
                            defaultValue={'DEFAULT'}
                            {...register('is_committee')}
                            className="bg-gray-50 border text-[16px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 "
                        >
                            <option value={'DEFAULT'} hidden disabled>
                                เลือกสถานะ
                            </option>
                            <option key={RoleOption.COMMITTEE} value={RoleOption.COMMITTEE}>
                                กรรมการ
                            </option>{' '}
                            <option key={RoleOption.ADVISOR} value={RoleOption.ADVISOR}>
                                อาจารย์นิเทศ
                            </option>
                        </select>{' '}
                    </div>{' '}
                    <div className="flex flex-row gap-x-1  items-end self-center">
                        <div
                            onClick={handleToggleIsAddAdvisor}
                            className="px-4  py-2 flex justify-center align-middle items-center bg-gray-50 rounded-md text-center cursor-pointer"
                        >
                            ยกเลิก
                        </div>

                        <div
                            onClick={handleSubmit(onSubmit)}
                            className="px-4 py-2  text-green-500 flex justify-center align-middle items-center bg-green-100 border border-green-500 font-bold rounded-md text-center cursor-pointer"
                        >
                            {create_loading ? <LoadingSpinner /> : 'บันทึก'}
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
