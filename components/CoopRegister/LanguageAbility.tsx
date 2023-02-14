import React, { FC } from 'react';
import Input from '@ui/Input';
import { registerErrorSchema } from '@features/register-coop/interfaces';

interface OwnProps {}

type Props = OwnProps;

const LanguageAbility: FC<Props> = (props) => {
    return (
        <div className=" w-full p-6 rounded-md bg-white my-6">
            <div className="flex flex-col justify-between w-full my-6">
                <div className=" mb-6">
                    <p className="text-3xl font-bold">
                        ความสามารถทางภาษา<span className="text-gray-400 font-medium text-xl"> (ขั้นต่ำ 1 ภาษา)</span>{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LanguageAbility;
