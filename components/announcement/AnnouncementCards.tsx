import React, { FunctionComponent, useMemo } from 'react';
import { GetAnnouncementsResponse } from '@features/announcement/interfaces';
import Link from 'next/link';
import { ClockCircleOutlined, FilePdfOutlined, UserOutlined } from '@ant-design/icons';
import { formatDateToThai } from '../../utils/common';

type Props = GetAnnouncementsResponse;

const AnnouncementCards: FunctionComponent<Props> = (data) => {
    const randomNumber = useMemo(() => {
        return Math.floor(Math.random() * 11);
    }, [data]);
    return (
        <>
            {data.getAnnouncements.map((ann) => (
                <div key={ann.id} className="w-full h-[200px] bg-white flex flex-col px-6 py-6 overflow-hidden rounded-md shadow-sm justify-between ">
                    <div className="w-full h-1/3 flex flex-row w-full justify-between items-center align-middle ">
                        <h3 className=" text-sm  xl:text-lg font-semibold my-auto">{ann.title}</h3>
                    </div>
                    <div>
                        <hr className="h-[1.5px] my-4 bg-gray-400 border-1 bg-gray-200" />
                        <div className="h-auto flex flex-row items-center  justify-between">
                            <div className="flex flex-row  items-center gap-4">
                                <div className=" gap-2 flex justify-center align-middle items-center  flex-row  font-normal text-gray-500 text-clip  overflow-hidden ">
                                    <UserOutlined className="text-lg" />
                                    {ann.advisor_id && (
                                        <p className="text-sm">
                                            {ann.advisor_id.name} {ann.advisor_id.last_name}
                                        </p>
                                    )}
                                </div>
                                <p className=" bg-blue-100 text-blue-500 px-2  rounded-md  xl:text-sm  cursor-pointer"> ทั่วไป</p>
                            </div>{' '}
                            <div className="flex flex-row  items-center gap-4">
                                <div className="text-sm bg-gray-100 rounded-2xl text-gray-700 px-3 py-1 xl:text-sm md:text-sm xl:text-md font-light my-auto flex flex-row items-center align-middle justify-center gap-2">
                                    <FilePdfOutlined className="text-red-800" />
                                    <p className="text-sm">{randomNumber}</p>
                                </div>
                                <p className="text-[16px] flex  items-center gap-2 font-normal text-gray-500 text-sm xl:text-sm text-clip overflow-hidden ">
                                    <ClockCircleOutlined className={'text-xl'} /> {formatDateToThai(ann.createdAt.toString())}{' '}
                                </p>

                                <Link
                                    href={`/announcement/` + ann.id}
                                    className=" bg-primary-100 text-primary-500 px-4 py-2 rounded-2xl text-sm  cursor-pointer"
                                >
                                    {'ดูรายละเอียด >'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AnnouncementCards;
