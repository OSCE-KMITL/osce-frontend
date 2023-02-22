import React, { useContext } from 'react';
import ContentContainer from '@ui/ContentContainer';
import ActionCard from '../components/HomePage/ActionCard';
import { useRouter } from 'next/router';
import { ENDPOINT_URI } from '../constants';
import { AuthenticationContext } from '../context/AuthContextProvider';
import { RoleOption } from '../constants/RoleOptions';
import { CookieManager } from '../utils/CookieManager';

const HomePage: React.FC = () => {
    const { me } = useContext(AuthenticationContext);
    const router = useRouter();
    const token = CookieManager.getCookieWithToken();

    const isStudent = (): boolean => {
        if (!me) {
            return false;
        }
        if (me.role === RoleOption.STUDENT) {
            return true;
        }
    };
    return (
        <ContentContainer>
            <div className="w-full min-h-screen grid xl:grid-cols-2 grid-rows-1 gap-6 px-4 ">
                <div className="grid grid-rows-3 gap-2">
                    <div
                        onClick={() => {
                            if (me) {
                                if (me.role === RoleOption.STUDENT) {
                                    router.push('coopregister');
                                } else {
                                    router.push('/');
                                }
                            } else {
                                router.push(ENDPOINT_URI + '/auth/google');
                            }
                        }}
                    >
                        <ActionCard goto={''} hero_content="สมัครเข้าร่วมสกิจศึกษา" button_title={'สมัครเข้าร่วมสหกิจ'} description={''} />
                    </div>{' '}
                    <ActionCard hero_content="ประกาศรายชื่อผู้มีสิทธิ์สหกิจศึกษา" goto={'/jobs'} button_title={'ประกาศรายชื่อ'} description={''} />
                    <ActionCard hero_content="งานที่เปิดรับ" goto={'/jobs'} button_title={'งานที่เปิดรับอยู่ในปัจจุบัน'} description={''} />
                </div>
            </div>
        </ContentContainer>
    );
};

export default HomePage;
