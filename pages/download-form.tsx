import React, { useContext, useEffect, useState } from 'react';
import ContentContainer from '@ui/ContentContainer';
import SkeletonLoading from '@ui/SkeletonLoading';
import { AuthenticationContext } from '@context/AuthContextProvider';
import NotificationService from '@lib/ant_service/NotificationService';
import BreadcrumbComponent from '@components/common/Beardcrumb/Beardcrumb';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import { RoleOption } from '@constants/RoleOptions';
import { useGetAnnouncements } from '@features/announcement/hooks/useGetAnnouncement';
import { List, Typography, Space, Button, Divider } from 'antd';
import { FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { useGetMe } from '@features/auth/hooks/useGetMe';
import { ENDPOINT_URI } from '@constants/index';

const Download: React.FC = () => {
    const { me } = useContext(AuthenticationContext);
    const { data, loading, error, refetch } = useGetAnnouncements();
    const notification = NotificationService.getInstance();
    const { data: dataGetMe, refetch: refectch_me } = useGetMe();
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        refectch_me();
    }, []);

    if (loading) {
        return <SkeletonLoading></SkeletonLoading>;
    }
    const student_file = [
        'coop.101_แบบขอเข้าร่วมโครงการสหกิจศึกษา',
        'coop.102_ใบสมัครงานสหกิจศึกษา',
        'coop.103_แบบเสนอชื่อหน่วยงาน',
        'coop.104_แบบแจ้งรายละเอียดงาน ',
        'coop.105_แบบแจ้งโครงร่างรายงาน',
        'coop.106_แบบคำร้องทั่วไป',
    ];
    const company_file = [
        'coop.301_แบบเสนองานสหกิจศึกษา',
        'coop.302_แบบตอบรับนักศึกษาสหกิจศึกษา',
        'coop.303_แบบตอบรับอนุญาตเข้านิเทศงาน',
        'coop.304_แบบประเมินผลนักศึกษา',
    ];
    const advisor_file = ['coop.201_แบบบันทึกการนิเทศงานสหกิจศึกษา', 'coop.202_แบบประเมินผลนักศึกษาสหกิจศึกษา'];

    return (
        <div className="min-w-[1500px] w-full">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 onClick={() => notification.info('assss', 'sss')} className="text-5xl font-primary_noto font-semibold">
                    {' '}
                    ดาวน์โหลดแบบฟอร์ม
                </h1>
                <Divider />
            </div>

            <div className="w-full flex flex-col font-primary_noto gap-6  ">
                {loading && <LoadingSpinner />}
                {error && <LoadingSpinner />}
                {error && <h1>{error.message}</h1>}
                <div className="grid grid-cols-3 gap-8 p-2">
                    <List
                        className="bg-white drop-shadow-xl "
                        header={<div className="flex text-xl font-bold text-primary-500">นักศึกษา</div>}
                        bordered
                        dataSource={student_file}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <>
                                        <Link target={'_blank'} href={ENDPOINT_URI + '/files/form/student/' + item.slice(0, 8) + '.pdf'}>
                                            <DownloadOutlined style={{ fontSize: '24px' }} />
                                        </Link>
                                    </>,
                                ]}
                            >
                                <Typography.Text>
                                    <FilePdfOutlined style={{ color: 'red', fontSize: '20px', marginRight: '16px' }} />
                                </Typography.Text>{' '}
                                {item}
                            </List.Item>
                        )}
                    />
                    <List
                        className="bg-white drop-shadow-xl "
                        header={<div className="text-xl font-bold text-primary-500">อาจารย์นิเทศ</div>}
                        bordered
                        dataSource={advisor_file}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <>
                                        <Link target={'_blank'} href={ENDPOINT_URI + '/files/form/advisor/' + item.slice(0, 8) + '.pdf'}>
                                            <DownloadOutlined style={{ fontSize: '24px' }} />
                                        </Link>
                                    </>,
                                ]}
                            >
                                <Typography.Text>
                                    <FilePdfOutlined style={{ color: 'red', fontSize: '20px', marginRight: '16px' }} />
                                </Typography.Text>{' '}
                                {item}
                            </List.Item>
                        )}
                    />
                    <List
                        className="bg-white drop-shadow-xl "
                        header={<div className="text-xl font-bold text-primary-500">สถานประกอบการ</div>}
                        bordered
                        dataSource={company_file}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <>
                                        <Link target={'_blank'} href={ENDPOINT_URI + '/files/form/company/' + item.slice(0, 8) + '.pdf'}>
                                            <DownloadOutlined style={{ fontSize: '24px' }} />
                                        </Link>
                                    </>,
                                ]}
                            >
                                <Typography.Text>
                                    <FilePdfOutlined style={{ color: 'red', fontSize: '20px', marginRight: '16px' }} />
                                </Typography.Text>{' '}
                                {item}
                            </List.Item>
                        )}
                    />
                </div>
                {/* {data && <AnnouncementCards getAnnouncements={data.getAnnouncements} />} */}
            </div>
        </div>
    );
};

export default Download;
