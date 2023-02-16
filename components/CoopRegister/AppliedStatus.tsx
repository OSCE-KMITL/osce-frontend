import { studentInfoStateSelector, studentStatusStateSelector } from '@features/student/student.slice';
import { FC } from 'react';
import { useSelector } from 'react-redux';

interface AppliedStatusProps {}

const AppliedStatus: FC<AppliedStatusProps> = () => {
    const apply_status = useSelector(studentStatusStateSelector);
    const info = useSelector(studentInfoStateSelector);

    return (
        <div className="w-full  flex flex-col  items-center ">
            <div className="grid grid-cols-2 w-2/3 min-h-full bg-white text-[20px] px-4 py-2 rounded-md gap-x-6 gap-y-4 ">
                <h1>รหัสนักศึกษา</h1>
                <h1>63015208</h1>
                <h1>ชื่อ-นามสกุล</h1>
                <h1>อภิสิทธิ์ ทับแสง</h1>
                <h1>คณะ</h1>
                <h1>วิศวะกรรมศาตร์</h1>
                <h1>ภาควิชา</h1>
                <h1>วิศวะกรรมคอมพิวเตอร์</h1>
                <h1>หลักสูตร</h1>
                <h1>วิศวะกรรมคอมพิวเตอร์ (ต่อเนื่อง)</h1>
                <h1>สถานะ </h1>
                <div className="bg-blue-200 h-10 w-1/3 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                    <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-1" />
                        <span className="text-xl text-blue-500 font-normal">ยืนยันการสมัคร</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppliedStatus;
