import React, { FC } from 'react';
import Input from '@ui/Input';
import { DatePicker } from 'antd';
import { UseFormRegister } from 'react-hook-form';
import { RegisterCoopHookState, registerErrorSchema } from '@features/register-coop/interfaces';
import moment from 'moment';
import { useFacultyState } from '@features/register-coop/hooks/useFormState';

export interface RegisterForm {
    register: UseFormRegister<RegisterCoopHookState>;
    errors: any;
}

const PersonalInformation: FC<RegisterForm> = ({ register, errors }) => {
    const { handleBrithDateStateChange } = useFacultyState();
    function disabledDate(current) {
        // Can not select days before today and today
        const start = moment('1990-01-01', 'YYYY-MM-DD');
        return current < start || current > moment();
    }

    return (
        <>
            <div className=" w-full p-6 rounded-md bg-white my-6">
                <div className="flex flex-col justify-between w-full my-6">
                    <div className="w-[30%] mb-6">
                        <p className="text-3xl font-bold">ข้อมูลประจำตัว</p>
                    </div>
                    <div className="grid grid-cols-4 gap-x-6 ">
                        <div className="col-span-1">
                            <Input
                                name={'citizen_id'}
                                type="text"
                                label={'เลขบัตรประจำตัวประชาชน'}
                                placeholder={' 1234567890000'}
                                fullWidth
                                register={register}
                                isError={errors.citizen_id && true}
                                errors={errors}
                                validationSchema={registerErrorSchema.citizen_id}
                            />{' '}
                        </div>{' '}
                        <div className="col-span-2  grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="relation" className="block text-[18px] font-medium text-gray-900 dark:text-white">
                                    เพศ
                                </label>
                                <select
                                    id="relation"
                                    defaultValue={'DEFAULT'}
                                    {...register('gender', registerErrorSchema.gender)}
                                    className="bg-gray-50 border text-[18px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value={'DEFAULT'} hidden disabled>
                                        เลือกเพศ
                                    </option>
                                    <option key={'men'} value={'ชาย'}>
                                        ชาย
                                    </option>
                                    <option key={'women'} value={'หญิง'}>
                                        หญิง
                                    </option>
                                    <option key={'unspecified '} value={'ไม่ต้องการระบุ'}>
                                        ไม่ต้องการระบุ
                                    </option>
                                </select>{' '}
                            </div>
                            <Input
                                name={'weight'}
                                type="number"
                                step
                                label={'น้ำหนัก (kg)'}
                                fullWidth
                                register={register}
                                isError={errors.weight && true}
                                errors={errors}
                                placeholder={' 75'}
                                validationSchema={registerErrorSchema.weight}
                            />{' '}
                            <Input
                                name={'height'}
                                type="number"
                                step
                                label={'ส่วนสูง (cm)'}
                                fullWidth
                                register={register}
                                isError={errors.height && true}
                                errors={errors}
                                placeholder={'176'}
                                validationSchema={registerErrorSchema.height}
                            />{' '}
                        </div>
                        <div className="col-span-1 mb-4 ">
                            <label htmlFor="countries" className="block text-[18px] font-medium text-gray-900 dark:text-white">
                                วันเกิด (วัน/เดือน/ปี คศ.)
                            </label>
                            <DatePicker
                                className={'py-3 w-full text-[20px] font-primary_noto'}
                                format={'DD/MM/YYYY'}
                                style={{ fontSize: '18px' }}
                                disabledDate={disabledDate}
                                placeholder={'เลือกวันเกิด'}
                                size={'large'}
                                onChange={(date, dateString) => {
                                    handleBrithDateStateChange(dateString);
                                }}
                            />
                        </div>
                        <div className="col-span-2">
                            <Input
                                name={'address'}
                                type="text"
                                label={'ที่อยู่ปัจจุบัน'}
                                placeholder={' หอพักอยู่สบาย 1471/1 ถนนลาดกระบัง แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520'}
                                fullWidth
                                register={register}
                                isError={errors.address && true}
                                errors={errors}
                                validationSchema={registerErrorSchema.address}
                            />{' '}
                        </div>
                        <div className="col-span-1">
                            <Input
                                name={'phone_number'}
                                type="string"
                                label={'เบอร์โทรศัพท์'}
                                placeholder={' 0931234568'}
                                fullWidth
                                register={register}
                                isError={errors.phone_number && true}
                                errors={errors}
                                validationSchema={registerErrorSchema.phone_number}
                            />{' '}
                        </div>
                        <div className="col-span-1 mb-4  ">
                            {' '}
                            <label htmlFor="religion" className="block  text-[20px] font-medium text-gray-900 dark:text-white">
                                ศาสนา
                            </label>
                            <select
                                id="religion"
                                defaultValue={'DEFAULT'}
                                {...register('religion', registerErrorSchema.religion)}
                                className="bg-gray-50 border text-[18px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value={'DEFAULT'} hidden disabled>
                                    เลือกศาสนา
                                </option>
                                <option value={'พุทธ'}>พุทธ</option>
                                <option value={'อิสลาม'}>อิสลาม</option>
                                <option value={'คริสต์'}>คริสต์</option>
                                <option value={'ฮินดู'}>ฮินดู</option>
                                <option value={'อื่น ๆ'}>อื่น ๆ</option>
                                <option value={'ไม่ต้องการระบุ'}>ไม่ต้องการระบุ</option>
                            </select>{' '}
                        </div>
                        <div className="col-span-2 gap-x-6 flex flex-row">
                            <div className="flex items-center   ">
                                <input
                                    id="military_status"
                                    {...register('military_status')}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                                />
                                <label htmlFor="military_status" className="ml-2 text-[20px] font-medium text-gray-900 dark:text-gray-300">
                                    ผ่านการเกณฑ์ทหารแล้ว
                                </label>
                            </div>
                            <div className="flex items-center    ">
                                <input
                                    {...register('driver_license')}
                                    id="driver_license"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                                />
                                <label htmlFor="driver_license" className="ml-2 text-[20px] font-medium text-gray-900 dark:text-gray-300">
                                    มีใบอนุญาติขับขี่รถยนต์
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalInformation;
