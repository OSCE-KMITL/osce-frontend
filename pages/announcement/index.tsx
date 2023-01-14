import React, { useContext, useEffect } from 'react';
import AnnouncementCards from '../../components/announcement/AnnouncementCards';
import { AuthenticationContext } from '../../context/AuthContextProvider';
import { RoleOption } from '../../constants/RoleOptions';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import { storeAnnouncement } from '../../features/announcement/announcement-slice';
import { useDispatch } from 'react-redux';
import { useGetAnnouncements } from '../../features/announcement/hooks/useGetAnnouncement';
import Link from 'next/link';
import BreadcrumbComponent from '../../components/common/Beardcrumb/Beardcrumb';

const Announcements: React.FC = () => {
    const { me } = useContext(AuthenticationContext);
    const { data, loading, error } = useGetAnnouncements();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(storeAnnouncement(data));
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center gap-8 w-full min-h-full max-h-full relative  py-8">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className="text-5xl font-primary_noto font-semibold"> ประชาสัมพันธ์</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <div className="w-[80%] flex flex-row justify-between items-center gap-6 font-primary_noto ">
                <div className=" flex flex-row gap-6 font-primary_noto ">
                    <p className=" bg-gray-500 text-white px-4 py-2 rounded-2xl  cursor-pointer"> ทั้งหมด</p>
                    <p className="  px-4 py-2 rounded-2xl  cursor-pointer"> ทั่วไป</p>
                    <p className="  px-4 py-2 rounded-2xl  cursor-pointer"> กำหนดการ</p>
                    <p className=" px-4 py-2 rounded-2xl  cursor-pointer"> ประกาศรับสมัคร</p>
                    <p className="  px-4 py-2 rounded-2xl  cursor-pointer"> กิจกรรม</p>
                </div>
                {me?.role === RoleOption.COMMITTEE && (
                    <Link href={'announcement/new'} className=" bg-primary-500 text-white px-4 py-2 rounded-xl  cursor-pointer">
                        + สร้างประกาศไหม่
                    </Link>
                )}
            </div>
            <div className="w-[80%] flex flex-col font-primary_noto gap-2  ">
                {loading && <LoadingSpinner />}
                {error && <LoadingSpinner />}
                {error && <h1>{error.message}</h1>}
                {data && <AnnouncementCards getAnnouncements={data.getAnnouncements} />}
            </div>{' '}
        </div>
    );
};

export default Announcements;

/*
<div className="w-[80%] flex flex-col font-primary_noto gap-2 ">
    <p className="font-bold text-xl">ปักหมุดไว้</p>
    <div className="flex flex-row justify-between gap-4">
        <div className="w-1/3 h-[150px] bg-white flex flex-col px-2 py-2 rounded-md shadow-md "></div>
        <div className="w-1/3 h-[150px] bg-white flex flex-col px-2 py-2 rounded-md shadow-md "></div>
        <div className="w-1/3 h-[150px] bg-white flex flex-col px-2 py-2 rounded-md shadow-md "></div>
    </div>
</div>*/
