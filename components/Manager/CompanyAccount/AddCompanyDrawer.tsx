import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useForm } from 'react-hook-form';
import { regExPattern } from '@features/register-coop/interfaces';
import { CreateCompanyPayload, IAddCompanyPersonState, useCreateCompanyAccount } from '@features/company/hooks/useCreateCompanyAccount';
import NotificationService from '@lib/ant_service/NotificationService';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import { GET_ALL_COMPANIES } from '@features/company/hooks/useGetCompanys';

const AddCompanyDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [createCompanyAccount, { loading, error }] = useCreateCompanyAccount();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IAddCompanyPersonState>({ mode: 'onChange', shouldUseNativeValidation: true });

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data: IAddCompanyPersonState) => {
        const payload: CreateCompanyPayload = {
            payload: { ...data, is_coordinator: true },
        };
        try {
            await createCompanyAccount({
                variables: payload,
                onCompleted: () => {
                    NotificationService.getInstance().success('เสร็จสิ้น', 'ระบบได้ทำการสร้างบัญชีผู้ใช้เสร็จสิ้น');
                    reset();
                    onClose();
                },
                onError: (error) => {
                    NotificationService.getInstance().error('พบข้อผิดพลาด', error.message);
                },
                refetchQueries: ['GET_ALL_COMPANIES'],
            });
        } catch (e) {
            console.log(e);
            2;
        }
    };
    return (
        <div className="flex flex-row justify-between align-middle items-center">
            <div></div>
            <div
                className="px-4 py-2  text-primary-100 flex justify-center align-middle items-center bg-primary-500 font-bold rounded-md text-center cursor-pointer"
                onClick={showDrawer}
            >
                + เพิ่มบัญชีสำหรับบริษัท
            </div>
            <Drawer title="+ เพิ่มบัญชีสำหรับบริษัท" placement="right" onClose={onClose} open={open}>
                <h3 className={'font-bold text-[28px] mb-4'}>เพิ่มบัญชีสำหรับบริษัท</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
                    <div>
                        <p>ชื่อบริษัท (ภาษาอังกฤษ)</p>
                        <input
                            {...register('company_name', {
                                maxLength: { value: 60, message: 'รูปแบบไม่ถูกต้อง' },
                                required: { value: true, message: 'กรุณาให้ข้อมูล' },
                                pattern: { value: regExPattern.only_eng_sp, message: 'กรอกข้อมูลภาษาอังกฤษเท่านั้น' },
                            })}
                            className="w-full px-2 py-2 text-[20px] border border-gray-700 rounded-md  "
                            type="text"
                            placeholder='cp all'
                        />
                        {<p className="text-red-500">{errors.company_name ? errors.company_name.message : ''}</p>}
                    </div>{' '}
                    <div>
                        <p>ชื่อ-นามสกุลผู้ประสานงาน </p>
                        <input
                            {...register('full_name', {
                                maxLength: { value: 60, message: 'รูปแบบไม่ถูกต้อง' },
                                required: { value: true, message: 'กรุณาให้ข้อมูล' },
                            })}
                            className="w-full px-2 py-2 text-[20px] border border-gray-700 rounded-md  "
                            type="text"
                            placeholder='ชื่อ นามสกุล'
                        />
                        {errors.full_name && <p className="text-red-500">{errors.full_name.message}</p>}
                    </div>{' '}
                    <div>
                        <p>ตำแหน่ง</p>
                        <input
                            {...register('job_title', {
                                maxLength: { value: 60, message: 'รูปแบบไม่ถูกต้อง' },
                                required: { value: true, message: 'กรุณาให้ข้อมูล' },
                            })}
                            className="w-full px-2 py-2 text-[20px] border border-gray-700 rounded-md  "
                            type="text"
                            placeholder='hr'
                        />{' '}
                        {errors.job_title && <p className="text-red-500">{errors.job_title.message}</p>}
                    </div>
                    <div>
                        <p>อีเมลผู้ประสานงาน</p>
                        <input
                            {...register('email', {
                                required: { value: true, message: 'กรุณาให้ข้อมูล' },
                                pattern: { value: regExPattern.email, message: 'รูปแบบอีเมลไม่ถูกต้อง' },
                                maxLength: { value: 60, message: 'รูปแบบไม่ถูกต้อง' },
                            })}
                            className="w-full px-2 py-2 text-[20px] border border-gray-700 rounded-md  "
                            type="text"
                            placeholder='jenjira@cp.co.th'
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>{' '}
                    <div className="flex flex-col">
                        <p>เบอร์โทร</p>
                        <input
                            {...register('phone_number', {
                                maxLength: { value: 10, message: 'รูปแบบไม่ถูกต้อง' },
                                min: { value: 10, message: 'รูปแบบไม่ถูกต้อง' },
                                required: { value: true, message: 'กรุณาให้ข้อมูล' },
                                pattern: { value: regExPattern.phone_number, message: 'รูปแบบไม่ถูกต้อง' },
                            })}
                            className="w-full px-2 py-2 text-[20px] border border-gray-700 rounded-md  "
                            type="text"
                            placeholder='0819874567'

                        />
                        {errors.phone_number ? <p className="text-red-500">{errors.phone_number.message} </p> : ''}
                    </div>
                    <button
                        disabled={loading}
                        className="px-4 py-2 bg-primary-500 text-[20px] text-white rounded-md cursor-pointer hover:bg-primary-700"
                        type={'submit'}
                    >
                        {loading ? <LoadingSpinner /> : 'บันทึก'}
                    </button>
                </form>
            </Drawer>
        </div>
    );
};

export default AddCompanyDrawer;
