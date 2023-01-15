import React, { FunctionComponent } from 'react';
import parser from 'html-react-parser';
import style from '../../../styles/richtext.module.scss';
interface OwnProps {
    content: string;
}

type Props = OwnProps;

const RichtextDisplay: FunctionComponent<Props> = ({ content }) => {
    return <div className={style.container}>{parser(content)}</div>;
};

export default RichtextDisplay;
