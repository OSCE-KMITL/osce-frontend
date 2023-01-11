import styles from '../styles/Home.module.css';
import { useAppDispatch } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationSelector, loginReducer } from '../features/auth/authSlice';
import { LoginInput } from '../features/auth/hooks/useLogin';
import { useEffect } from 'react';

export default function Home() {
    const selector = useSelector(authenticationSelector);

    return (
        <div>
            <div className={styles.container}>hello</div>
        </div>
    );
}
