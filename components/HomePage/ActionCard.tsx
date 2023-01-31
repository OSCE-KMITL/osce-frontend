import React, { FunctionComponent } from 'react';
import Link from 'next/link';

interface OwnProps {
    goto: string;
    button_title: string;
    hero_content: string;
    description: string;
}

type Props = OwnProps;

const ActionCard: FunctionComponent<Props> = ({ hero_content, goto, description, button_title }) => {
    return (
        <Link
            href={goto}
            className="max-h-max rounded-xl bg-slate-200 hover:bg-primary-400 text-gray-800 hover:text-white  flex gap-8 flex-col px-6 py-6 font-primary_noto cursor-pointer"
        >
            <p className="flex justify-center align-middle rounded-xl bg-black w-fit px-4 text-xl  text-white py-2 gap-6">{button_title}</p>
            <h1 className="font-semibold text-3xl xl:text-5xl ">{hero_content}</h1>
            <p className="font-extralight text-md xl:text-xl ">{description}</p>
        </Link>
    );
};

export default ActionCard;
