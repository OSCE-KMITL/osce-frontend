import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import NotificationService from '@lib/ant_service/NotificationService';
import MessageService from '@lib/ant_service/MessageService';
import jsPDF, { jsPDFOptions } from 'jspdf';
import Button from '@ui/Button';
import image102 from '../../public/coop.102.jpg';
import { font_sarabun } from '@components/PDF/Font/Font';
import { IStudent } from '@features/student/interfaces/Student';

interface OwnProps {
    student?: IStudent;
    year: string | null;
    name: string | null;
    student_number: string | null;
    department: string | null;
    curriculum: string | null;
    gpa: string | null;
    date_of_birth: string | null;
    sex: string | null;
    height: string | null;
    weight: string | null;
    id_card_number: string | null;
    religion: string | null;
    car_license: {
        have_or_not: number; //0 : no have, 1 : have
        number: string | null;
    };
    military_status: number | null; // 0 : ผ่านแล้ว, 1: ยังไม่ได้เกณ, 2: ได้รับการยกเว้น
    address: {
        part_1: string | null; // ex 113 ม.12 ต.ห้วยใหญ่
        part_2: string | null; // ex อ.บางละมุง จ.ชลบุรี
    };
    phone_number: string | null;
    email: string | null;
    emergency_person_name: string | null;
    emergency_person_relation: string | null;
    emergency_person_phone: string | null;
    skill: {
        skill_1: {
            skill: string | null;
            score: number | null; //0-3   0: Excellent, 1: Good, 2: Fair, 3: Poor
        } | null;
        skill_2: {
            skill: string | null;
            score: number | null; //0-3   0: Excellent, 1: Good, 2: Fair, 3: Poor
        } | null;
        skill_3: {
            skill: string | null;
            score: number | null; //0-3   0: Excellent, 1: Good, 2: Fair, 3: Poor
        } | null;
    } | null;
    language_skill: {
        language_skill_1: {
            language: string | null;
            score: number | null; //0-3   0: Excellent, 1: Good, 2: Fair, 3: Poor
        } | null;
        language_skill_2: {
            language: string | null;
            score: number | null; //0-3   0: Excellent, 1: Good, 2: Fair, 3: Poor
        } | null;
        language_skill_3: {
            language: string | null;
            score: number | null; //0-3   0: Excellent, 1: Good, 2: Fair, 3: Poor
        } | null;
    } | null;
}

type Props = OwnProps;

const PDF102: FunctionComponent<Props> = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const message = MessageService.getInstance();
    const notification = NotificationService.getInstance();
    const {
        name,
        address,
        car_license,
        curriculum,
        date_of_birth,
        department,
        email,
        emergency_person_name,
        emergency_person_phone,
        emergency_person_relation,
        gpa,
        height,
        id_card_number,
        language_skill,
        military_status,
        phone_number,
        religion,
        skill,
        student_number,
        weight,
        year,
        sex,
    } = props;

    const font = font_sarabun;
    const handleGenPDF = async () => {
        const doc = new jsPDF();

        const img_data = image102;

        doc.addFileToVFS('Sarabun-Regular-normal.ttf', font);
        doc.addFont('Sarabun-Regular-normal.ttf', 'Sarabun-Regular', 'normal');

        // Calculate the image dimensions to fit the entire page
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (img_data.height * imgWidth) / img_data.width;

        doc.addImage(img_data.src, 'JPEG', 0, 0, imgWidth, imgHeight);
        doc.setFontSize(9);
        // doc.setTextColor('red');
        doc.setFont('Sarabun-Regular');
        name && doc.text(name, 32, 69);
        student_number && doc.text(student_number, 124, 69);
        year && doc.text(year, 150, 58);
        department && doc.text(department, 35, 75);
        curriculum && doc.text(curriculum, 86, 75);
        gpa && doc.text(gpa, 155, 75);
        date_of_birth && doc.text(date_of_birth, 45, 92);
        sex && doc.text(sex, 85, 92);
        height && doc.text(height, 130, 92);
        weight && doc.text(weight, 180, 92);
        id_card_number && doc.text(id_card_number, 75, 98);
        religion && doc.text(religion, 150, 98);

        //มีใบขับขี่ไหม
        if (car_license !== null) {
            if (car_license.have_or_not === 1) {
                doc.text('X', 82.5, 103.3); //มีใบขับขี่
                car_license.number && doc.text(car_license.number, 98, 104); //มีใบขับขี่เลขที่
            } else {
                doc.text('X', 61.7, 103.3); //ไม่มีใบขับขี่
            }
        }

        //การเกณทหาร
        if (military_status !== null) {
            if (military_status === 0) {
                doc.text('X', 61.7, 108.8); //ผ่านการเกณ
            } else if (military_status === 1) {
                doc.text('X', 94.5, 108.8); //ยังไม่เกณ
            } else if (military_status === 2) {
                doc.text('X', 154, 108.8); //ได้รับยกเว้น
            }
        }

        address.part_1 && doc.text(address.part_1, 35.7, 120.5); //ที่อยู่บรรทัด1
        address.part_2 && doc.text(address.part_2, 35.7, 125.5); //ที่อยู่บรรทัด2
        phone_number && doc.text(phone_number, 120, 120.5);
        email && doc.text(email, 120, 126);

        //บุคคลติตต่อฉุกเฉิน
        emergency_person_name && doc.text(emergency_person_name, 35.7, 138);
        emergency_person_relation && doc.text(emergency_person_relation, 118, 138);
        emergency_person_phone && doc.text(emergency_person_phone, 169, 138);

        //ความสามารถช่อง 1
        doc.setFillColor(255, 255, 255);
        doc.rect(13.5, 156.8, 25, 4, 'F');
        if (skill.skill_1 !== null) {
            skill.skill_1.skill && doc.text(skill.skill_1.skill, 13.5, 160);
            if (skill.skill_1.score === 0) {
                doc.text('X', 48, 160); // Excellent
            } else if (skill.skill_1.score === 1) {
                doc.text('X', 64, 160); // Good
            } else if (skill.skill_1.score === 2) {
                doc.text('X', 79, 160); // Fair
            } else if (skill.skill_1.score === 3) {
                doc.text('X', 94, 160); // Poor
            }
        }
        //ความสามารถช่อง 2
        doc.setFillColor(255, 255, 255);
        doc.rect(13.5, 162, 25, 4, 'F');
        if (skill.skill_2 !== null) {
            skill.skill_2.skill && doc.text(skill.skill_2.skill, 13.5, 165.5);

            if (skill.skill_2.score === 0) {
                doc.text('X', 48, 165.5); // Excellent
            } else if (skill.skill_2.score === 1) {
                doc.text('X', 64, 165.5); // Good
            } else if (skill.skill_2.score === 2) {
                doc.text('X', 79, 165.5); // Fair
            } else if (skill.skill_2.score === 3) {
                doc.text('X', 94, 165.5); // Poor
            }
        }

        //ความสามารถช่อง 3
        doc.setFillColor(255, 255, 255);
        doc.rect(13.5, 167.8, 25, 4, 'F');
        if (skill.skill_3 !== null) {
            skill.skill_3.skill && doc.text(skill.skill_3.skill, 13.5, 171);

            if (skill.skill_3.score === 0) {
                doc.text('X', 48, 171); // Excellent
            } else if (skill.skill_3.score === 1) {
                doc.text('X', 64, 171); // Good
            } else if (skill.skill_3.score === 2) {
                doc.text('X', 79, 171); // Fair
            } else if (skill.skill_3.score === 3) {
                doc.text('X', 94, 171); // Poor
            }
        }

        //ภาษา 1
        doc.setFillColor(255, 255, 255);
        doc.rect(103, 156.8, 25, 4, 'F');
        if (language_skill.language_skill_1 !== null) {
            language_skill.language_skill_1.language && doc.text(language_skill.language_skill_1.language, 103, 160);

            if (language_skill.language_skill_1.score === 0) {
                doc.text('X', 138.5, 160); // Excellent
            } else if (language_skill.language_skill_1.score === 1) {
                doc.text('X', 151.5, 160); // Good
            } else if (language_skill.language_skill_1.score === 2) {
                doc.text('X', 165, 160); // Fair
            } else if (language_skill.language_skill_1.score === 3) {
                doc.text('X', 184, 160); // Poor
            }
        }

        //ภาษา 2
        doc.setFillColor(255, 255, 255);
        doc.rect(103, 162.3, 25, 4, 'F');
        if (language_skill.language_skill_2 !== null) {
            language_skill.language_skill_2.language && doc.text(language_skill.language_skill_2.language, 103, 165.5);

            if (language_skill.language_skill_2.score === 0) {
                doc.text('X', 138.5, 165.5); // Excellent
            } else if (language_skill.language_skill_2.score === 1) {
                doc.text('X', 151.5, 165.5); // Good
            } else if (language_skill.language_skill_2.score === 2) {
                doc.text('X', 165, 165.5); // Fair
            } else if (language_skill.language_skill_2.score === 3) {
                doc.text('X', 184, 165.5); // Poor
            }
        }

        //ภาษา 3
        doc.setFillColor(255, 255, 255);
        doc.rect(103, 167.8, 25, 4, 'F');
        if (language_skill.language_skill_3 !== null) {
            language_skill.language_skill_3.language && doc.text(language_skill.language_skill_3.language, 103, 171);

            if (language_skill.language_skill_2.score === 0) {
                doc.text('X', 138.5, 171); // Excellent
            } else if (language_skill.language_skill_2.score === 1) {
                doc.text('X', 151.5, 171); // Good
            } else if (language_skill.language_skill_2.score === 2) {
                doc.text('X', 165, 171); // Fair
            } else if (language_skill.language_skill_2.score === 3) {
                doc.text('X', 184, 171); // Poor
            }
        }
        // doc.save('a4.pdf');

        // Generate the PDF as Blob
        const pdfBlob = doc.output('blob');

        // Create a data URL from the Blob
        const pdfDataUrl = window.URL.createObjectURL(pdfBlob);

        // Open a new window with the PDF data URL
        window.open(pdfDataUrl, '_blank');

        // Release the URL object to free up memory
        window.URL.revokeObjectURL(pdfDataUrl);
    };
    return (
        <div>
            <Button onClick={handleGenPDF}>gen pdf</Button>
        </div>
    );
};

export default PDF102;
