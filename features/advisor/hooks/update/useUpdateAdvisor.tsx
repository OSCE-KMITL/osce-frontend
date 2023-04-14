import { useState } from 'react';
import { AccountStatus } from '@features/user-account/interfaces';

export interface IUpdateAdvisorArgs {
    account_id: string;
    advisor_id?: string;
    advisor_status?: AccountStatus;
    is_committee?: Boolean;
}
export function useUpdateAdvisor() {
    const [updateObject, setUpdateObject] = useState<IUpdateAdvisorArgs | null | undefined>();
    function handleRoleChange(val: Boolean) {
        setUpdateObject((prevState) => {
            return { ...prevState, is_committee: val };
        });
    }
    function handleStatusChange(status: AccountStatus) {
        setUpdateObject((prevState) => {
            return { ...prevState, advisor_status: status };
        });
    }
    return { updateObject, setUpdateObject, handleStatusChange, handleRoleChange };
}
