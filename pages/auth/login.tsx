import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { message } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { GoogleIcon } from '../../components/common/Icon';
import { LoginInput, useLogin } from '../../features/auth/hooks/useLogin';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../../features/auth/authSlice';
import { getSession } from 'next-auth/react';

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginInput>();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [login, { data, loading, error }] = useLogin();
    const dispatch = useDispatch();

    const push_error_notication = (content: string) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    const onSubmit: SubmitHandler<LoginInput> = async (input) => {
        try {
            await login({
                variables: { ...input },
                onCompleted: (data) => {
                    router.push('/');
                    dispatch(loginReducer());
                },
            });
        } catch (error) {
            console.log(error);
            push_error_notication(error.message);
        }
    };

    if (error) {
        push_error_notication(error.message);
    }

    if (data) {
        console.log(data);
    }

    return (
        <div className="w-full h-full flex justify-center ">
            {contextHolder}
            <form className="flex max-w-3/6  max-w-3/6 h-5/6 flex-col bg-white  mx-auto my-auto py-auto px-24 px-6 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col px-16 my-auto font-primary_noto gap-4">
                    <h1 className="font-bold text-4xl">เข้าสู่ระบบ</h1>
                    <p className="font-light text-xl text-gray-700 ">บุคลากรและนักศึกษาเข้าสู่ระบบด้วย Email ของสถาบัน</p>
                    <div className="flex bg-white  text-gray-900 border-2 justify-center items-center font-semibold  rounded-md gap-4 cursor-pointer">
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
                    <button className="bg-gray-900 border-2 text-white   rounded-md" type="submit" disabled={loading}>
                        <p className="px-24 py-3"> {!loading ? 'Log in with credential' : 'Loading ...'}</p>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {}, // will be passed to the page component as props
    };
}
