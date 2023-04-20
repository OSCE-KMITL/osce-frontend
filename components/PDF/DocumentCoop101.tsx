import { IStudent } from '@features/student/interfaces/Student';
import React, { FC } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import image101 from '../../public/coop.101.jpg';
import { font_sarabun } from '@components/PDF/Font/Font';
import { Button } from 'antd';
import { formatDateToThai } from 'utils/common';
import { log } from 'console';

interface Prop {
    student: IStudent;
}

const DocumentCoop101: FC<Prop> = ({ student }) => {
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

    const year = new Date().getFullYear() + 543;
    const name = name_th + ' ' + lastname_th;

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

        if (name_prefix) {
            if (name_prefix === 'นาย') {
                doc.setFillColor(0, 0, 0);
                doc.rect(60, 65.8, 10, 0.5, 'F');
            } else if (name_prefix === 'นางสาว') {
                doc.setFillColor(0, 0, 0);
                doc.rect(52, 65.8, 6, 0.5, 'F');
            }
        }

        name && doc.text(name, 75, 66.8);
        student_id && doc.text(student_id, 165, 66.8);
        year && doc.text(year.toString(), 130, 80.5);
        department?.department_name_th && doc.text(department?.department_name_th, 39, 73.5);
        curriculum?.curriculum_name_th && doc.text(curriculum?.curriculum_name_th, 120, 73.5);

        // // doc.save('a4.pdf');

        const pdfBlob = doc.output('blob');

        const pdfDataUrl = window.URL.createObjectURL(pdfBlob);

        window.open(pdfDataUrl, '_blank');

        window.URL.revokeObjectURL(pdfDataUrl);
    };

    return (
        <Button
            type="link"
            onClick={handleOnClick}
            className="h-auto px-3 py-1 text-center border text-base border-gray-800 bg-gray-100 text-gray-500 shadow-sm rounded-md cursor-pointer flex flex-row items-center gap-x-1"
        >
            101
        </Button>
    );
};

export default DocumentCoop101;
