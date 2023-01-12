import React, { FunctionComponent } from 'react';
import { GetAnnouncementResponse } from '../../features/announcement/types';
import Link from 'next/link';

type Props = GetAnnouncementResponse;

const AnnouncementCards: FunctionComponent<Props> = (data) => {
    return (
        <>
            {data.getAnnouncements.map((ann) => (
                <div key={ann.id} className="w-full h-[300px] bg-white flex flex-col px-6 py-6 overflow-hidden rounded-md shadow-sm justify-between ">
                    <h2 className="text-2xl font-bold">{ann.title}</h2>
                    <p className="text-[16px] font-normal text-gray-500 text-clip overflow-hidden ">{ann.description}</p>
                    <div>
                        <hr className="h-[1.5px] my-4 bg-gray-400 border-1 bg-gray-200" />
                        <div className="h-auto flex flex-row items-center  justify-between">
                            <div className="flex flex-row  items-center gap-4">
                                <p className=" bg-gray-200 text-gray-600 px-4 py-1 rounded-2xl  cursor-pointer"> ทั่วไป</p>
                                <p className="text-[16px] font-normal text-gray-500 text-clip overflow-hidden ">
                                    ผู้สร้าง :{ann.advisor_id.name + ann.advisor_id.last_name}
                                </p>
                            </div>{' '}
                            <div className="flex flex-row  items-center gap-4">
                                <p className="text-[16px] font-normal text-gray-500 text-clip overflow-hidden ">สร้างเมื่อ: {ann.createdAt}</p>
                                <Link href={'/announcement/' + ann.id} className=" bg-primary-100 text-primary-500 px-4 py-2 rounded-2xl  cursor-pointer">
                                    {' '}
                                    รายละเอียด
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
