import { IStudent } from '@features/student/interfaces/Student';
import React, { FC } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import image101 from '../../public/coop.201.jpg';
import { font_sarabun } from '@components/PDF/Font/Font';
import { Button } from 'antd';
import { formatDateToThai } from 'utils/common';
import { log } from 'console';

interface Prop {
    student: IStudent;
}

const DocumentCoop201: FC<Prop> = ({ student }) => {
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
        const width = [130, 144.5, 157.5, 172, 187];
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
        const img_data = image101;

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

        name && doc.text(name, 55, 76.5);
        student_id && doc.text(student_id, 155, 76.5);
        job?.project_topic && doc.text(job?.project_topic, 48, 83);
        job?.company_id?.name_th && doc.text(job?.company_id?.name_th, 52, 90);

        //assessment
        const assessment: Topic[] = Object.values(advisor_assessment?.assessment_obj);
        const topic_hight = [[115, 120.5, 127, 132, 138, 144, 150], [164], [185], [207.5], [227], [249.5]];

        if (assessment) {
            for (let i = 0; i < assessment.length; i++) {
                const topic: Subtopic[] = assessment[i]?.subtopics;
                if (topic) {
                    for (let j = 0; j < topic.length; j++) {
                        const w = assessmentWidthPostion(topic[j].answer);
                        doc.text('X', w, topic_hight[i][j]);
                    }
                }
            }
        }
        // doc.save('a4.pdf');

        const pdfBlob = doc.output('blob');

        const pdfDataUrl = window.URL.createObjectURL(pdfBlob);

        window.open(pdfDataUrl, '_blank');

        window.URL.revokeObjectURL(pdfDataUrl);
    };

    return (
        <>
            <Button type="ghost" className="text-base text-green-500 m-0 p-0 " onClick={handleOnClick}>
                {score_from_advisor}/20
            </Button>
        </>
    );
};

export default DocumentCoop201;
