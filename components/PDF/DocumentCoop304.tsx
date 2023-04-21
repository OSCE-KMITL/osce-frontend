import { IStudent } from '@features/student/interfaces/Student';
import React, { FC } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import image304_1 from '../../public/coop.304-1.jpg';
import image304_2 from '../../public/coop.304-2.jpg';
import image304_3 from '../../public/coop.304-3.jpg';
import { font_sarabun } from '@components/PDF/Font/Font';
import { Button, Tooltip } from 'antd';
import { formatDateToThai } from 'utils/common';
import { log } from 'console';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface Prop {
    student: IStudent;
}

const DocumentCoop304: FC<Prop> = ({ student }) => {
    const {
        account,
        address,
        advisor_assessment,
        birth_date,
        citizen_id,
        company_assessment,
        coop_status,
        created_at,
        curriculum,
        department,
        driver_license,
        emer_lastname,
        emer_name,
        emer_relation,
        emer_tel,
        faculty,
        gender,
        gpa,
        height,
        job,
        language_abilities,
        lastname_eng,
        lastname_th,
        military_status,
        name_eng,
        name_prefix,
        name_th,
        phone_number,
        progress_report,
        religion,
        score_from_advisor,
        score_from_company,
        score_from_presentation,
        skills,
        student_apply_job,
        student_id,
        transcript,
        updated_at,
        weight,
        advisor,
    } = student;

    type Subtopic = {
        id: number;
        question: string;
        details: string;
        answer: number | null;
    };

    type Topic = {
        id: number;
        name: string;
        subtopics: Subtopic[];
    };

    const year = new Date().getFullYear() + 543;
    const name = name_prefix + ' ' + name_th + ' ' + lastname_th;

    const assessmentWidthPostion = (score: number) => {
        const width = [128, 143.5, 157.5, 174, 190.5];
        if (score === 5) {
            return width[0];
        } else if (score === 4) {
            return width[1];
        } else if (score === 3) {
            return width[2];
        } else if (score === 2) {
            return width[3];
        } else if (score === 1) {
            return width[4];
        } else return 0;
    };
    const handleOnClick = () => {
        const font = font_sarabun;
        const doc = new jsPDF();
        const img_data_1 = image304_1;
        const img_data_2 = image304_2;
        const img_data_3 = image304_3;

        doc.addFileToVFS('Sarabun-Regular-normal.ttf', font);
        doc.addFont('Sarabun-Regular-normal.ttf', 'Sarabun-Regular', 'normal');

        // Calculate the image dimensions to fit the entire page
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (img_data_1.height * imgWidth) / img_data_1.width;

        doc.addImage(img_data_1.src, 'JPEG', 0, 0, imgWidth, imgHeight);
        doc.setFontSize(9);
        // doc.setTextColor('red');
        doc.setFont('Sarabun-Regular');

        name && doc.text(name, 55, 68.5);
        student_id && doc.text(student_id, 155, 68.5);
        job?.company_id?.name_th && doc.text(job?.company_id?.name_th, 52, 73.5);
        job?.project_topic && doc.text(job?.project_topic, 58, 83.5);
        job?.supervisor_name && doc.text(job?.supervisor_name, 54, 88.5);
        job?.supervisor_job_title && doc.text(job?.supervisor_job_title, 135.5, 88.5);
        job?.supervisor_phone_number && doc.text(job?.supervisor_phone_number, 43, 93.5);
        job?.supervisor_email && doc.text(job?.supervisor_email, 130, 93.5);

        //assessment
        const assessment: Topic[] = Object.values(company_assessment?.assessment_obj);
        const topic_hight = [
            [154, 167],
            [185, 198.5, 209, 220.5, 232, 243, 254],
            [60, 78, 95, 112],
            [134, 149, 166, 186, 197.5],
            [215, 231],
        ];

        if (assessment) {
            for (let i = 0; i < 2; i++) {
                const topic: Subtopic[] = assessment[i]?.subtopics;
                if (topic) {
                    for (let j = 0; j < topic.length; j++) {
                        const w = assessmentWidthPostion(topic[j].answer);
                        doc.text('X', w, topic_hight[i][j]);
                    }
                }
            }
        }

        doc.addPage();
        doc.addImage(img_data_2.src, 'JPEG', 0, 0, imgWidth, imgHeight);
        if (assessment) {
            for (let i = 2; i < assessment.length; i++) {
                const topic: Subtopic[] = assessment[i]?.subtopics;
                if (topic) {
                    for (let j = 0; j < topic.length; j++) {
                        const w = assessmentWidthPostion(topic[j].answer);
                        doc.text('X', w, topic_hight[i][j]);
                    }
                }
            }
        }

        doc.addPage();
        doc.addImage(img_data_3.src, 'JPEG', 0, 0, imgWidth, imgHeight);

        //จุดเด่น
        const width_strength = [43.5, 49, 54.5];
        const strength = company_assessment?.strength?.split('|');

        if (strength) {
            for (let index = 0; index < strength.length; index++) {
                strength[index] && doc.text(strength[index], 27.5, width_strength[index]);
            }
        }

        //ข้อควรปรับปรุง
        const width_improvement = [70, 75.5, 81.5];
        const improvement = company_assessment?.improvement?.split('|');

        if (improvement) {
            for (let index = 0; index < improvement.length; index++) {
                improvement[index] && doc.text(improvement[index], 27.5, width_improvement[index]);
            }
        }

        doc.setFillColor(255, 255, 255);
        doc.rect(15, 85, 200, 30, 'F');
        // doc.save('a4.pdf');

        const pdfBlob = doc.output('blob');

        const pdfDataUrl = window.URL.createObjectURL(pdfBlob);

        window.open(pdfDataUrl, '_blank');

        window.URL.revokeObjectURL(pdfDataUrl);
    };

    return (
        <>
            <Tooltip title="กดเพื่อเปิดไฟล์ PDF" placement="right">
                <Button type="ghost" className="text-base text-white m-0 px-2 bg-green-600 " onClick={handleOnClick}>
                    {score_from_company}/40
                </Button>
            </Tooltip>
        </>
    );
};

export default DocumentCoop304;
