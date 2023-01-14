import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notification } from 'antd';
import { GoogleIcon } from '../../components/common/Icon';
import { LoginInput, useLogin } from '../../features/auth/hooks/useLogin';

import { AuthenticationContext, UserAuthData } from '../../context/AuthContextProvider';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { TOKEN_NAME } from '../../constants';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginInput>();
    const [api, contextHolder] = notification.useNotification();
    const [login, { loading, error }] = useLogin();
    const { setAuthUser } = useContext(AuthenticationContext);
    const router = useRouter();

    const openNotificationWithIcon = (type: NotificationType, title: string, message: string) => {
        api[type]({
            message: title,
            description: message,
        });
    };

    const onSubmit: SubmitHandler<LoginInput> = async (input) => {
        try {
            await login({
                variables: { ...input },
                onCompleted: (data) => {
                    const { id, role, email, token } = data.signIn;
                    const response: UserAuthData = { role: role, email: email, id: id, token: token };
                    setAuthUser(response);
                    router.back();
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    if (error) {
        openNotificationWithIcon('error', 'พบข้อผิดพลาด', error.message);
    }

    return (
        <div className="w-full h-screen flex justify-center ">
            {contextHolder}
            <form className="flex max-w-3/6  max-w-3/6 h-5/6 flex-col bg-white  mx-auto my-auto py-auto px-24 px-6 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col px-16 my-auto font-primary_noto gap-4">
                    <h1 className="font-bold text-4xl">เข้าสู่ระบบ</h1>
                    <p className="font-light text-xl text-gray-700 ">บุคลากรและนักศึกษาเข้าสู่ระบบด้วย Email ของสถาบัน</p>
                    <div
                        className="flex bg-white  text-gray-900 border-2 justify-center items-center font-semibold  rounded-md gap-4 cursor-pointer"
                        onClick={() => {}}
                    >
                        <GoogleIcon />
                        <p className=" py-3"> {!loading ? 'Log in with Google' : 'Loading ...'}</p>
                    </div>
                    <div className="flex w-full ">
                        <p className="mx-auto font-light text-xl text-gray-700 mt-4 ">หรือ</p>
                    </div>
                    <div className="flex flex-col ">
                        <label>อีเมล</label>
                        <input
                            className={`px-4 py-3 rounded-md border-2 focus:border-blue-400 ${error ? 'border-red-500  ' : 'outline-0'}`}
                            type="email"
                            id="email"
                            {...register('email')}
                            required={true}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>รหัสผ่าน</label>
                        <input
                            className={`px-4 py-3 rounded-md border-2 focus:border-blue-400 ${error ? 'border-red-500  ' : 'outline-0'}`}
                            type="password"
                            id="password"
                            {...register('password')}
                            required={true}
                        />
                    </div>
                    <button
                        className={`${loading ? 'bg-gray-600' : 'bg-gray-900'} border-2 text-white flex justify-center items-center rounded-md`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading && <LoadingSpinner></LoadingSpinner>}
                        <p className="px-3 py-3"> {!loading ? 'Log in ' : 'Loading ...'}</p>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Login;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
    const token = req.cookies[TOKEN_NAME];
    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        };
    } else {
        return { props: {} };
    }
};
