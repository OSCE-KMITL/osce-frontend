import React from 'react';
import { useRouter } from 'next/router';
import ContentContainer from '@ui/ContentContainer';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import NotificationService from '@lib/ant_service/NotificationService';
import MessageService from '@lib/ant_service/MessageService';
import { Divider } from 'antd';
import PDF102 from '@components/PDF/PDF102';

const JobList: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const message = MessageService.getInstance();
    const notification = NotificationService.getInstance();
    return (
        <ContentContainer>
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1>ทดสอบ PDF</h1>
                <Divider />
                <PDF102
                    {...{
                        name: 'นาย สารบัญ หนังสือ',
                        sex: 'หญิง',
                        address: { part_1: '13 ม.12 ต.หนองปริอ', part_2: 'อ.บางละมุง จ.ชลบุรี' },
                        car_license: { have_or_not: 0, number: null },
                        curriculum: 'วิศวกรรมคอมพิวเตอร์(ต่อเนื่อง)',
                        department: 'วิศวกรรมคอมพิวเตอร์',
                        date_of_birth: '20/06/1999',
                        email: '63015166@kmitl.ac.th',
                        emergency_person_name: 'นาง สีแพร ดาเนียลเซน',
                        emergency_person_phone: '0992157525',
                        emergency_person_relation: 'ผู้ปกครอง',
                        gpa: '3.14',
                        height: '175',
                        id_card_number: '1200365210236',
                        language_skill: { language_skill_1: { language: 'English', score: 1 }, language_skill_2: null, language_skill_3: null },
                        military_status: 0,
                        phone_number: '0812365258',
                        religion: 'พุทธ',
                        skill: { skill_1: { skill: 'typescript', score: 1 }, skill_2: { skill: 'python', score: 2 }, skill_3: null },
                        student_number: '63015166',
                        weight: '55',
                        year: '2566',
                    }}
                />
            </div>
        </ContentContainer>
    );
};

export default JobList;
