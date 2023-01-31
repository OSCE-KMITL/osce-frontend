import React from 'react';
import ContentContainer from '@ui/ContentContainer';
import ActionCard from '../components/HomePage/ActionCard';
import { signIn, useSession } from 'next-auth/react';

const HomePage: React.FC = () => {
    return (
        <ContentContainer>
            <div className="w-full min-h-screen grid xl:grid-cols-2 grid-rows-1 gap-6 px-4 ">
                <div
                    onClick={() =>
                        signIn('google', {
                            callbackUrl: `${window.location.origin}/register`,
                            redirect: true,
                        })
                    }
                    className="bg-sky-50 min-h-screen"
                >
                    ประกาศ
                </div>
                <div className="grid grid-rows-3 gap-4">
                    <ActionCard
                        hero_content="สมัครเข้าร่วมสกิจศึกษา"
                        goto={'/api/auth/signin/'}
                        button_title={'สมัครเข้าร่วมสกิจ'}
                        description={
                            'วิกครัวซองต์โบตั๋นซีนีเพล็กซ์ติงต๊อง ธัมโมชีสแอนด์ โปรเจ็คท์พันธกิจ สเตชันบึมแชมปิยองบ๋อยสเตชั่น อิเหนาเซอร์วิสโปรเจ็คท์พุทโธ\n' +
                            '                            บ๋อยแคปสะบึมเคอร์ฟิว ไวกิ้งบู๊เทอร์โบ สจ๊วตสตูดิโอเต๊ะติงต๊อง ไชน่าสุริยยาตรแยมโรลครัวซองต์'
                        }
                    />{' '}
                    <ActionCard
                        hero_content="ประกาศรายชื่อผู้มีสิทธิ์สหกิจศึกษา"
                        goto={'/jobs'}
                        button_title={'ประกาศรายชื่อ'}
                        description={
                            'วิกครัวซองต์โบตั๋นซีนีเพล็กซ์ติงต๊อง ธัมโมชีสแอนด์ โปรเจ็คท์พันธกิจ สเตชันบึมแชมปิยองบ๋อยสเตชั่น อิเหนาเซอร์วิสโปรเจ็คท์พุทโธ' +
                            'บ๋อยแคปสะบึมเคอร์ฟิว ไวกิ้งบู๊เทอร์โบ สจ๊วตสตูดิโอเต๊ะติงต๊อง ไชน่าสุริยยาตรแยมโรลครัวซองต์'
                        }
                    />{' '}
                    <ActionCard
                        hero_content="งานที่เปิดรับ"
                        goto={'/jobs'}
                        button_title={'งานที่เปิดรับอยู่ในปัจจุบัน'}
                        description={
                            'วิกครัวซองต์โบตั๋นซีนีเพล็กซ์ติงต๊อง ธัมโมชีสแอนด์ โปรเจ็คท์พันธกิจ สเตชันบึมแชมปิยองบ๋อยสเตชั่น อิเหนาเซอร์วิสโปรเจ็คท์พุทโธ' +
                            'บ๋อยแคปสะบึมเคอร์ฟิว ไวกิ้งบู๊เทอร์โบ สจ๊วตสตูดิโอเต๊ะติงต๊อง ไชน่าสุริยยาตรแยมโรลครัวซองต์'
                        }
                    />
                </div>
            </div>
        </ContentContainer>
    );
};

export default HomePage;
