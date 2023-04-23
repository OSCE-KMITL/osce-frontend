import React, { FC, useContext, useEffect } from 'react';
import { Menu } from 'antd';
import { items, itemsAdvisor, itemsCommittee, itemsCompany, student_item, student_not_pass_item } from './items';
import { useRouter } from 'next/router';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { RoleOption } from '@constants/RoleOptions';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { CoopStatus } from '@features/student/interfaces';
import { useGetMe } from '@features/auth/hooks/useGetMe';

const SideBar: FC = () => {
    const { me } = useContext(AuthenticationContext);
    // const { data: dataGetMe, refetch } = useGetMe();
    // const student_id = dataGetMe?.getMe?.is_student?.student_id;
    // const { data: student, loading: student_loading, error: student_error } = useGetStudent(student_id);

    const router = useRouter();

    const roleChecking = () => {
        if (me?.role === RoleOption.STUDENT) {
            if (me.is_student?.coop_status === CoopStatus.PASSED) {
                return student_item;
            } else {
                return student_not_pass_item;
            }
        } else if (me?.role === RoleOption.COMPANY) {
            return itemsCompany;
        } else if (me?.role === RoleOption.COMMITTEE) {
            return itemsCommittee;
        } else if (me?.role === RoleOption.ADVISOR) {
            return itemsAdvisor;
        }
    };
    return (
        <Menu
            onSelect={(action) => {
                router.push(action.key);
            }}
            selectedKeys={[router.pathname]}
            className="w-full h-screen text-md font-medium gap-4  font-primary_noto px-8 flex flex-col py-32 "
            mode={'inline'}
            items={roleChecking()}
        ></Menu>
    );
};

export default SideBar;
