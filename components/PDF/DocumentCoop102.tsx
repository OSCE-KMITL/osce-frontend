import { IStudent } from '@features/student/interfaces/Student';
import React, { FC } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import image102 from '../../public/coop.102.jpg';
import { font_sarabun } from '@components/PDF/Font/Font';
import { Button } from 'antd';
import { formatDateToThai } from 'utils/common';
import { log } from 'console';

interface Prop {
    student: IStudent;
}

const DocumentCoop102: FC<Prop> = ({ student }) => {
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
    const name = name_prefix + ' ' + name_th + ' ' + lastname_th;
    const new_date = formatDateToThai(birth_date);
    const new_address = address.split(' ');
    const emergency_person_name = emer_name + ' ' + emer_lastname;

    const splitAddress = () => {
        const new_address = address.trim().toLowerCase().split(' ');
        const address_len = new_address.length;
        const mid = Math.floor(address_len / 2);

        const left = new_address.slice(0, mid).join(' ');
        const rigth = new_address.slice(mid, address_len).join(' ');

        return { left, rigth };
    };
    const { left, rigth } = splitAddress();

    const handleOnClick = () => {
        const font = font_sarabun;
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
        student_id && doc.text(student_id, 124, 69);
        year && doc.text(year.toString(), 150, 58);
        department?.department_name_th && doc.text(department?.department_name_th, 24, 75);
        curriculum?.curriculum_name_th && doc.text(curriculum?.curriculum_name_th, 86, 75);
        gpa && doc.text(gpa, 155, 75);
        new_date && doc.text(new_date, 38, 92);
        gender && doc.text(gender, 85, 92);
        height && doc.text(height, 130, 92);
        weight && doc.text(weight, 180, 92);
        citizen_id && doc.text(citizen_id, 75, 98);
        religion && doc.text(religion, 150, 98);
        driver_license ? doc.text('X', 82.5, 103.3) : doc.text('X', 61.7, 103.3);
        military_status ? doc.text('X', 61.7, 108.8) : doc.text('X', 94.5, 108.8);

        left && doc.text(left, 35.7, 120.5); //ที่อยู่บรรทัด1
        rigth && doc.text(rigth, 35.7, 125.5); //ที่อยู่บรรทัด2

        phone_number && doc.text(phone_number, 120, 120.5);
        account?.email && doc.text(account?.email, 120, 126);

        //บุคคลติตต่อฉุกเฉิน
        emergency_person_name && doc.text(emergency_person_name, 35.7, 138);
        emer_relation && doc.text(emer_relation, 118, 138);
        emer_tel && doc.text(emer_tel, 169, 138);

        //ความสามารถช่อง 1
        doc.setFillColor(255, 255, 255);
        doc.rect(13.5, 156.8, 25, 4, 'F');
        if (skills !== null && skills !== undefined) {
            if (skills[0] !== null && skills[0] !== undefined && skills[0]?.skill_name.length <= 17) {
                skills[0]?.skill_name && doc.text(skills[0]?.skill_name, 13.5, 160);
                if (skills[0]?.level === 'Excellent') {
                    doc.text('X', 48, 160); // Excellent
                } else if (skills[0]?.level === 'Good') {
                    doc.text('X', 64, 160); // Good
                } else if (skills[0]?.level === 'Fair') {
                    doc.text('X', 79, 160); // Fair
                } else if (skills[0]?.level === 'Poor') {
                    doc.text('X', 94, 160); // Poor
                }
            }

            //ความสามารถช่อง 2
            doc.setFillColor(255, 255, 255);
            doc.rect(13.5, 162, 25, 4, 'F');
            if (skills[1] !== null && skills[1] !== undefined && skills[1]?.skill_name.length <= 17) {
                skills[1]?.skill_name && doc.text(skills[1]?.skill_name, 13.5, 165.5);

                if (skills[1]?.level === 'Excellent') {
                    doc.text('X', 48, 165.5); // Excellent
                } else if (skills[1]?.level === 'Good') {
                    doc.text('X', 64, 165.5); // Good
                } else if (skills[1]?.level === 'Fair') {
                    doc.text('X', 79, 165.5); // Fair
                } else if (skills[1]?.level === 'Poor') {
                    doc.text('X', 94, 165.5); // Poor
                }
            }

            //ความสามารถช่อง 3
            doc.setFillColor(255, 255, 255);
            doc.rect(13.5, 167.8, 25, 4, 'F');
            if (skills[2] !== null && skills[2] !== undefined && skills[2]?.skill_name.length <= 17) {
                skills[2]?.skill_name && doc.text(skills[2]?.skill_name, 13.5, 171);

                if (skills[2]?.level === 'Excellent') {
                    doc.text('X', 48, 171); // Excellent
                } else if (skills[2]?.level === 'Good') {
                    doc.text('X', 64, 171); // Good
                } else if (skills[2]?.level === 'Fair') {
                    doc.text('X', 79, 171); // Fair
                } else if (skills[2]?.level === 'Poor') {
                    doc.text('X', 94, 171); // Poor
                }
            }
        }

        doc.setFillColor(255, 255, 255);
        doc.rect(103, 156.8, 25, 4, 'F');
        doc.setFillColor(255, 255, 255);
        doc.rect(103, 162.3, 25, 4, 'F');
        doc.setFillColor(255, 255, 255);
        doc.rect(103, 167.8, 25, 4, 'F');

        //ภาษา 1
        if (language_abilities !== null && language_abilities !== undefined) {
            if (language_abilities[0] !== null && language_abilities[0] !== undefined && language_abilities[0]?.name.length <= 19) {
                language_abilities[0]?.name && doc.text(language_abilities[0]?.name, 103, 160);

                if (language_abilities[0]?.level === 'Excellent') {
                    doc.text('X', 138.5, 160); // Excellent
                } else if (language_abilities[0]?.level === 'Good') {
                    doc.text('X', 151.5, 160); // Good
                } else if (language_abilities[0]?.level === 'Fair') {
                    doc.text('X', 165, 160); // Fair
                } else if (language_abilities[0]?.level === 'Poor') {
                    doc.text('X', 184, 160); // Poor
                }
            }

            //ภาษา 2
            if (language_abilities[1] !== null && language_abilities[1] !== undefined && language_abilities[1]?.name.length <= 19) {
                language_abilities[1]?.name && doc.text(language_abilities[1]?.name, 103, 165.5);

                if (language_abilities[1]?.level === 'Excellent') {
                    doc.text('X', 138.5, 165.5); // Excellent
                } else if (language_abilities[1]?.level === 'Good') {
                    doc.text('X', 151.5, 165.5); // Good
                } else if (language_abilities[1]?.level === 'Fair') {
                    doc.text('X', 165, 165.5); // Fair
                } else if (language_abilities[1]?.level === 'Poor') {
                    doc.text('X', 184, 165.5); // Poor
                }
            }

            //ภาษา 3
            if (language_abilities[2] !== null && language_abilities[2] !== undefined && language_abilities[2]?.name.length <= 19) {
                language_abilities[2]?.name && doc.text(language_abilities[2]?.name, 103, 171);

                if (language_abilities[2]?.level === 'Excellent') {
                    doc.text('X', 138.5, 171); // Excellent
                } else if (language_abilities[2]?.level === 'Good') {
                    doc.text('X', 151.5, 171); // Good
                } else if (language_abilities[2]?.level === 'Fair') {
                    doc.text('X', 165, 171); // Fair
                } else if (language_abilities[2]?.level === 'Poor') {
                    doc.text('X', 184, 171); // Poor
                }
            }
        }
        // // doc.save('a4.pdf');

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
        <Button
            type='link'
            onClick={handleOnClick}
            className="h-auto px-3 py-1 text-center border text-base border-gray-800 bg-gray-100 text-gray-500 shadow-sm rounded-md cursor-pointer flex flex-row items-center gap-x-1"
        >
            102
        </Button>
    );
};

export default DocumentCoop102;
