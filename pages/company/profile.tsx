import React, { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { JobInputCommittee } from '@features/job/hooks/useCreateJob';
import { AuthenticationContext } from 'context/AuthContextProvider';
import { RoleOption } from 'constants/RoleOptions';
import { AutoComplete, Button, Checkbox, DatePicker, Divider, Form, FormInstance, Input, message, Radio, RadioChangeEvent, Select } from 'antd';
import { useGetAllCompany } from 'features/company/hooks/useGetCompanys';
import { UploadFileInput, useUploadFile } from 'features/upload/hooks/useUploadFile';
import dayjs from 'dayjs';
import { require_major, welfare_options } from 'constants/Job/jobData';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import NotificationService from '@lib/ant_service/NotificationService';
import { ICompany } from '@features/company/interfaces';
import { address_option } from '@constants/addressOptions';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useUpdateCompany } from '@features/company/hooks/useUpdateCompany';

const CreateJobPage: FC = () => {
    const notification = NotificationService.getInstance();

    const { data: companies, refetch: refectch_comapny, loading: companies_loading } = useGetAllCompany();
    const { data: dataGetMe, refetch: refectch_me, loading: me_loading } = useGetMe();
    const [updateCompany, { loading: update_company_loading, error: update_company_error }] = useUpdateCompany();
    const [provinceInput, setProvinceInput] = useState(null);
    const [district, setDistrict] = useState<District[]>(null);
    const [districtInput, setDistrictInput] = useState(null);
    const [subDistrict, setSubDistrict] = useState<SubDistrict[]>(null);
    const [subDistrictInput, setSubDistrictInput] = useState(null);
    const [zipcode, setZipcode] = useState<Zipcode[]>(null);
    const [zipcodeInput, setZipcodeInput] = useState(null);
    const [editing, setEditing] = useState(false);
    const company_id = dataGetMe?.getMe?.is_company?.company_id?.id;
    const company = companies?.getAllCompanies?.find((i) => i.id === company_id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm<CompanyProfile>({ mode: 'onChange' });

    interface CompanyProfile {
        name_th: string;

        name_eng: string;

        address: string;

        district: string;

        amphoe: string;

        province: string;

        zipcode: string;

        phone_number: string;

        website_url: string;

        business_type: string;
    }

    interface District {
        amphoe: string;
    }

    interface SubDistrict {
        district: string;
    }

    interface Zipcode {
        zipcode: string;
    }

    const address_obj = address_option;

    const set_province = new Set(address_obj.map((i) => i.province));

    const array_province = Array.from(set_province).map((i) => {
        return { province: i };
    });

    // Handlers for district, amphoe, and province change events
    const handleProvinceChange = (value) => {
        const selectedOption = address_obj.filter((option) => option.province === value);
        const option_district = Array.from(
            new Set(
                selectedOption.map((i) => {
                    return i.amphoe;
                })
            )
        ).map((i) => {
            return { amphoe: i };
        });
        setProvinceInput(value);
        setDistrict(option_district);
        setDistrictInput(null);
        setSubDistrictInput(null);
        setSubDistrict(null);
        setZipcode(null);
        setZipcodeInput(null);
        setValue('province', value);
        setValue('amphoe', null);
        setValue('district', null);
        setValue('zipcode', null);
    };

    const handleAmphoeChange = (value) => {
        const selectedOption = address_obj.filter((option) => option.amphoe === value);
        const option_sub_district = Array.from(
            new Set(
                selectedOption.map((i) => {
                    return i.district;
                })
            )
        ).map((i) => {
            return { district: i };
        });

        setDistrictInput(value);
        setSubDistrict(option_sub_district);
        setSubDistrictInput(null);
        setZipcode(null);
        setZipcodeInput(null);
        setValue('amphoe', value);
        setValue('district', null);
        setValue('zipcode', null);
    };

    const handleDistrictChange = (value) => {
        const selectedOption = address_obj.filter((option) => option.district === value);
        const option_zipcode = Array.from(
            new Set(
                selectedOption.map((i) => {
                    return i.zipcode.toString();
                })
            )
        ).map((i) => {
            return { zipcode: i };
        });
        setZipcode(option_zipcode);
        setZipcodeInput(null);
        setSubDistrictInput(value);
        setValue('district', value);
        setValue('zipcode', null);
    };

    const handleZipcodeChange = (value) => {
        setZipcodeInput(value);
        setValue('zipcode', value);
    };

    const onSubmit = async (data: CompanyProfile) => {
        try {
            if (company_id && data) {
                updateCompany({
                    variables: {
                        updateInput: {
                            id: company_id,
                            address: data.address,
                            business_type: data.business_type,
                            district: data.amphoe,
                            name_eng: data.name_eng,
                            name_th: data.name_th,
                            phone_number: data.phone_number,
                            postal_code: data.zipcode,
                            province: data.province,
                            sub_district: data.district,
                            website_url: data.website_url,
                        },
                    },
                    onCompleted: (result) => {
                        if (result) {
                            notification.success('Success', 'ตอบรับงานเสร็จสิ้น');
                            refectch_comapny();
                            setEditing(false);
                            // setDefaluseValueForm()
                        }
                    },
                    onError: (error) => {
                        if (error) {
                            notification.error('Error', error.message);
                        }
                    },
                });
            }
        } catch (error) {
            notification.error('Error', error.message);
        }
    };

    const handleEdit = () => {
        setDefaluseValueForm();
        setEditing(true);
    };
    const handleCancelEdit = () => {
        setDefaluseValueForm();
        setEditing(false);
    };

    const handleInitPage = () => {
        refectch_me();
        refectch_comapny(),
            () => {
                setValue('name_th', company?.name_th ? company?.name_th : null);
                setValue('name_eng', company?.name_eng ? company?.name_eng : null);
                setValue('business_type', company?.business_type ? company?.business_type : null);
                setValue('phone_number', company?.phone_number ? company?.phone_number : null);
                setValue('website_url', company?.website_url ? company?.website_url : null);
                setValue('address', company?.address ? company?.address : null);
                setValue('province', company?.province ? company?.province : null);
                setValue('amphoe', company?.district ? company?.district : null);
                setValue('district', company?.sub_district ? company?.sub_district : null);
                setValue('zipcode', company?.postal_code ? company?.postal_code : null);
            };
        setProvinceInput(company?.province ? company?.province : null);
        setDistrictInput(company?.district ? company?.district : null);
        setSubDistrictInput(company?.sub_district ? company?.sub_district : null);
        setZipcodeInput(company?.postal_code ? company?.postal_code : null);
    };

    const setDefaluseValueForm = () => {
        reset();
        setValue('name_th', company?.name_th ? company?.name_th : null);
        setValue('name_eng', company?.name_eng ? company?.name_eng : null);
        setValue('business_type', company?.business_type ? company?.business_type : null);
        setValue('phone_number', company?.phone_number ? company?.phone_number : null);
        setValue('website_url', company?.website_url ? company?.website_url : null);
        setValue('address', company?.address ? company?.address : null);
        setValue('province', company?.province ? company?.province : null);
        setValue('amphoe', company?.district ? company?.district : null);
        setValue('district', company?.sub_district ? company?.sub_district : null);
        setValue('zipcode', company?.postal_code ? company?.postal_code : null);

        setProvinceInput(company?.province ? company?.province : null);
        setDistrictInput(company?.district ? company?.district : null);
        setSubDistrictInput(company?.sub_district ? company?.sub_district : null);
        setZipcodeInput(company?.postal_code ? company?.postal_code : null);
    };

    useEffect(() => {
        refectch_me();
        handleInitPage();
        // setDefaluseValueForm();
    }, []);

    return (
        <div className=" gap-8 min-h-screen relative overflow-y-auto py-8 ">
            <div className="w-[80%] h-fit">
                <h1>ข้อมูลบริษัท</h1>
                <Divider />
            </div>
            <div className="flex justify-end items-center m-4 h-18  ">
                {!editing ? (
                    <button
                        className="flex justify-center gap-2  px-4 py-2 rounded-md w-fit bg-primary-400 h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100"
                        onClick={handleEdit}
                    >
                        <PencilSquareIcon className="w-6 h-6 text-gray-100" />
                        แก้ไข
                    </button>
                ) : (
                    <button
                        className="invisible flex  px-4 py-2 rounded-md w-fit bg-primary-400 h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100"
                        onClick={handleEdit}
                        disabled={true}
                    >
                        <PencilSquareIcon className="w-6 h-6 text-gray-100" />
                        แก้ไข
                    </button>
                )}
            </div>

            {company ? (
                <form onSubmit={handleSubmit(onSubmit)} className=" rounded-md  font-primary_noto  ">
                    <div className="grid grid-rows-1 gap-8 mb-8">
                        <div className="">
                            <div className="bg-white rounded-xl grid grid-cols-2 px-6 pt-6 gap-x-8">
                                <div className="mb-2 h-auto">
                                    <label htmlFor="name_th" className="block text-[20px] font-medium text-gray-900">
                                        ชื่อบริษัท (ไทย)*
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-[18px] rounded-lg placeholder:opacity-50  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                        id="name_th"
                                        type="text"
                                        name="name_th"
                                        defaultValue={company?.name_th ? company?.name_th : null}
                                        {...register('name_th', {
                                            required: 'กรุณากรอกข้อมูลชื่อบริษัทภาษาไทย',
                                            maxLength: { value: 100, message: 'ชื่อต้องไม่เกิน 100 ตัวอักษร' },
                                        })}
                                        style={editing ? {} : { opacity: 0.5 }}
                                        disabled={!editing}
                                    />
                                    <div className="h-5 text-red-500">{errors.name_th && <span>{errors.name_th.message}</span>}</div>
                                </div>

                                <div className="mb-2 h-auto">
                                    <label htmlFor="name_eng" className="block text-[20px] font-medium text-gray-900">
                                        ชื่อบริษัท (อังกฤษ)*
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-[18px] rounded-lg placeholder:opacity-50  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                        id="name_eng"
                                        type="text"
                                        name="name_eng"
                                        defaultValue={company?.name_eng ? company?.name_eng : null}
                                        disabled={!editing}
                                        style={editing ? {} : { opacity: 0.5 }}
                                        {...register('name_eng', {
                                            required: 'กรุณากรอกข้อมูลชื่อบริษัทภาษาอังกฤษ',
                                            maxLength: { value: 100, message: 'ชื่อต้องไม่เกิน 100 ตัวอักษร' },
                                        })}
                                    />
                                    <div className="h-5 text-red-500">{errors.name_eng && <span>{errors.name_eng.message}</span>}</div>
                                </div>

                                <div className="mb-2 h-auto">
                                    <label htmlFor="business_type" className="block text-[20px] font-medium text-gray-900">
                                        ประเภทธุรกิจ
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-[18px] rounded-lg placeholder:opacity-50  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                        id="business_type"
                                        type="text"
                                        name="business_type"
                                        placeholder="ออกแบบและพัฒนาซอฟต์แวร์"
                                        defaultValue={company?.business_type ? company?.business_type : null}
                                        style={editing ? {} : { opacity: 0.5 }}
                                        disabled={!editing}
                                        {...register('business_type', {
                                            maxLength: { value: 100, message: 'ประเภทธุรกิจต้องไม่เกิน 100 ตัวอักษร' },
                                        })}
                                    />
                                    <div className="h-5 text-red-500">{errors.business_type && <span>{errors.business_type.message}</span>}</div>
                                </div>

                                <div className="mb-2 h-auto">
                                    <label htmlFor="phone_number" className="block text-[20px] font-medium text-gray-900">
                                        เบอร์ติดต่อ*
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-[18px] rounded-lg placeholder:opacity-50  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                        id="phone_number"
                                        type="tel"
                                        name="phone_number"
                                        placeholder="0817532096"
                                        style={editing ? {} : { opacity: 0.5 }}
                                        defaultValue={company?.phone_number ? company?.phone_number : null}
                                        disabled={!editing}
                                        {...register('phone_number', {
                                            required: 'กรุณากรอกข้อมูลเบอร์ติดต่อ',
                                            pattern: {
                                                value: /^[0-9]{10}$/, // Only allow 10-digit numbers
                                                message: 'กรุณากรอกเบอร์ติดต่อให้ถูกต้อง',
                                            },
                                        })}
                                    />
                                    <div className="h-5 text-red-500">{errors.phone_number && <span>{errors.phone_number.message}</span>}</div>
                                </div>

                                <div className="mb-2 h-auto">
                                    <label htmlFor="website_url" className="block text-[20px] font-medium text-gray-900">
                                        ที่อยู่เว็บไซต์
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-[18px] rounded-lg placeholder:opacity-50  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                        id="website_url"
                                        type="text"
                                        name="website_url"
                                        placeholder="www.company.com"
                                        defaultValue={company?.website_url ? company?.website_url : null}
                                        style={editing ? {} : { opacity: 0.5 }}
                                        disabled={!editing}
                                        {...register('website_url', {
                                            pattern: {
                                                value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/i,
                                                message: 'กรุณากรอกข้อมูลที่อยู่เว็บไซต์ให้ถูกต้อง',
                                            },
                                            maxLength: { value: 200, message: 'ข้อมูลที่อยู่เว็บไซต์ต้องไม่เกิน 200 ตัวอักษร' },
                                        })}
                                    />
                                    <div className="h-5 text-red-500">{errors.website_url && <span>{errors.website_url.message}</span>}</div>
                                </div>
                                <div></div>

                                <div className="mb-2 h-auto col-span-2">
                                    <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                        ที่อยู่*
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-[18px] rounded-lg placeholder:opacity-50  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                        id="address"
                                        type="tel"
                                        name="address"
                                        placeholder="972/1 อาคารวรสุ ชั้น 4 ซ.โรงพยาบาลพระราม 9 ถ.ริมคลองสามแสน"
                                        disabled={!editing}
                                        style={editing ? {} : { opacity: 0.5 }}
                                        defaultValue={company?.address ? company?.address : null}
                                        {...register('address', {
                                            required: 'กรุณากรอกข้อมูลที่อยู่',
                                            maxLength: { value: 200, message: 'ข้อมูลที่อยู่ต้องไม่เกิน 200 ตัวอักษร' },
                                        })}
                                    />
                                    <div className="h-5 text-red-500">{errors.address && <span>{errors.address.message}</span>}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="mb-2 h-auto">
                                        <label htmlFor="province" className="block text-[20px] font-medium text-gray-900">
                                            จังหวัด*
                                        </label>
                                        <Select
                                            size="large"
                                            onChange={handleProvinceChange}
                                            style={{ width: '100%' }}
                                            disabled={!editing}
                                            ref={() => {
                                                register('province');
                                            }}
                                            value={provinceInput}
                                            placeholder={company?.province ? company?.province : null}
                                        >
                                            {array_province.map((option) => (
                                                <option key={option.province} value={option.province}>
                                                    {option.province}
                                                </option>
                                            ))}
                                        </Select>
                                        <div className="h-5 text-red-500">{errors.province && <span>{errors.province.message}</span>}</div>
                                    </div>
                                    <div className="mb-2 h-auto">
                                        <label htmlFor="amphoe" className="block text-[20px] font-medium text-gray-900">
                                            อำเภอ/เขต*
                                        </label>
                                        <Select
                                            size="large"
                                            onChange={handleAmphoeChange}
                                            style={district !== null || !editing ? { width: '100%' } : { width: '100%', opacity: 0.5 }}
                                            value={districtInput}
                                            disabled={district === null || !editing}
                                            placeholder={company?.district ? company?.district : null}
                                            ref={() => {
                                                register('amphoe', { required: 'กรุณากรอกข้อมูลอำเภอ' });
                                            }}
                                        >
                                            {district?.map((option) => (
                                                <option key={option.amphoe} value={option.amphoe}>
                                                    {option.amphoe}
                                                </option>
                                            ))}
                                        </Select>
                                        <div className="h-5 text-red-500">{errors.amphoe && <span>{errors.amphoe.message}</span>}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="mb-2 h-auto">
                                        <label htmlFor="district" className="block text-[20px] font-medium text-gray-900">
                                            ตำบล/แขวง*
                                        </label>
                                        <Select
                                            size="large"
                                            onChange={handleDistrictChange}
                                            style={subDistrict !== null || !editing ? { width: '100%' } : { width: '100%', opacity: 0.5 }}
                                            value={subDistrictInput}
                                            disabled={subDistrict === null || !editing}
                                            placeholder={company?.sub_district ? company?.sub_district : null}
                                            ref={() => {
                                                register('district', { required: 'กรุณากรอกข้อมูลตำบล' });
                                            }}
                                        >
                                            {subDistrict?.map((option) => (
                                                <option key={option.district} value={option.district}>
                                                    {option.district}
                                                </option>
                                            ))}
                                        </Select>
                                        <div className="h-5 text-red-500">{errors.district && <span>{errors.district.message}</span>}</div>
                                    </div>
                                    <div className="mb-2 h-auto">
                                        <label htmlFor="zipcode" className="block text-[20px] font-medium text-gray-900">
                                            รหัสไปรษณีย์*
                                        </label>
                                        <Select
                                            size="large"
                                            onChange={handleZipcodeChange}
                                            style={zipcode !== null || !editing ? { width: '100%' } : { width: '100%', opacity: 0.5 }}
                                            value={zipcodeInput}
                                            disabled={zipcode === null || !editing}
                                            placeholder={company?.postal_code ? company?.postal_code : null}
                                            ref={() => {
                                                register('zipcode', { required: 'กรุณากรอกข้อมูลไปรษณีย์' });
                                            }}
                                        >
                                            {zipcode?.map((option) => (
                                                <option key={option.zipcode} value={option.zipcode}>
                                                    {option.zipcode}
                                                </option>
                                            ))}
                                        </Select>
                                        <div className="h-5 text-red-500">{errors.zipcode && <span>{errors.zipcode.message}</span>}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full justify-end gap-4   ">
                        {editing && (
                            <>
                                <button className="px-2 py-2 rounded-md w-fit  h-[60%]   border-gray-300 text-xl text-gray-400" onClick={handleCancelEdit}>
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="px-2 py-2 rounded-md w-40 bg-green-600 h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100"
                                >
                                    {(!update_company_loading || !companies_loading || !me_loading) && 'บันทึก'}
                                    {(update_company_loading || companies_loading || me_loading) && (
                                        <span>
                                            <LoadingSpinner />
                                        </span>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            ) : (
                <div className=" w-full h-full font-primary_noto text-4xl text-gray-400">
                    <h1 className="">ไม่พบข้อมูลบริษัท !</h1>
                </div>
            )}
        </div>
    );
};

export default CreateJobPage;
