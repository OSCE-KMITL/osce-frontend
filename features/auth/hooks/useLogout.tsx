import axios from 'axios';
import { ENDPOINT_URI } from '@constants';
import { useState, useEffect } from 'react';
import requestAxios from '@lib/axios';

const useLogout = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const logOut = () => {
        requestAxios
            .get('/logout')
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // custom hook returns value
    return { response, error, loading, logOut };
};

export default useLogout;
