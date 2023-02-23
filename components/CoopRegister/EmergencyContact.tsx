import React, { FunctionComponent } from 'react';
import { RegisterForm } from '@components/CoopRegister/PersonalInformation';
import Input from '@ui/Input';
import { registerErrorSchema } from '@features/register-coop/interfaces';

interface OwnProps {}

type Props = OwnProps;

const EmergencyContact: FunctionComponent<RegisterForm> = ({ register, errors }) => {
    return (
        <div className=" w-full p-6 rounded-md bg-white my-6">
            <div className="flex flex-col justify-between w-full my-6">
                <div className="w-[30%] mb-6">
                    <p className="text-3xl font-bold">บุคคลที่ติดต่อได้ในกรณีฉุกเฉิน</p>
                </div>
                <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                    {' '}
                    <div className="col-span-1">
                        <Input
                            name={'emer_name'}
                            type="string"
                            step
                            label={'ชื่อ (ภาษาไทย)'}
                            fullWidth
                            register={register}
                            isError={errors.emer_name && true}
                            errors={errors}
                            placeholder={'ใจดี'}
                            validationSchema={registerErrorSchema.emer_name}
                        />{' '}
                    </div>{' '}
                    <div className="col-span-1">
                        <Input
                            name={'emer_lastname'}
                            type="string"
                            step
                            label={'นามสกุล (ภาษาไทย)'}
                            fullWidth
                            register={register}
                            isError={errors.emer_lastname && true}
                            errors={errors}
                            placeholder={'บุญใจ'}
                            validationSchema={registerErrorSchema.emer_lastname}
                        />{' '}
                    </div>
                    <div className="col-span-1">
                        <Input
                            name={'emer_tel'}
                            type="string"
                            label={'เบอร์โทรศัพท์'}
                            placeholder={'0931234568'}
                            fullWidth
                            register={register}
                            isError={errors.emer_tel && true}
                            errors={errors}
                            validationSchema={registerErrorSchema.emer_tel}
                        />{' '}
                    </div>
                    <div className=" col-span-1 ">
                        <label htmlFor="emer_relation" className="block  text-[20px] font-medium text-gray-900 dark:text-white">
                            เกี่ยวข้องเป็น
                        </label>
                        <select
                            id="emer_relation"
                            defaultValue={'DEFAULT'}
                            {...register('emer_relation', registerErrorSchema.emer_relation)}
                            className="bg-gray-50 border text-[18px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value={'DEFAULT'} hidden disabled>
                                เลือกความสัมพันธ์
                            </option>
                            <option value={'พ่อ/แม่'}>พ่อ/แม่</option>
                            <option value={'พี่/น้อง'}>พี่/น้อง</option>
                            <option value={'ผู้ปกครอง'}>ผู้ปกครอง</option>
                            <option value={'คู่สมรส'}>คู่สมรส</option>
                            <option value={'อื่น ๆ'}>อื่น ๆ</option>
                        </select>{' '}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContact;
