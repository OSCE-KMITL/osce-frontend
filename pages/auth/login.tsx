import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginInput } from '../../features/auth/useLogin';
import { getSession, signIn, SignInResponse } from 'next-auth/react';
import { message } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginInput>();
    const [messageApi, contextHolder] = message.useMessage();
    const [response, setResponse] = useState<SignInResponse | null | undefined>(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const router = useRouter();

    const push_error_notication = (content: string) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        setLoading(true);
        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
                callbackUrl: 'http://localhost:3000/',
            });

            if (result) {
                setLoading(false);
                setResponse({ ...result });
                if (result.error) {
                    push_error_notication(result.error);
                }
                if (result.ok) {
                    await router.push('/');
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="w-full h-full  flex justify-center align-middle ">
            {contextHolder}
            <form className="flex w-2/6 h-2/3 flex-col bg-white rounded-2xl shadow-md justify-center px-24  px-6 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-bold text-3xl self-center">เข้าสู่ระบบ</h1>
                <label>email</label>
                <input
                    className={`px-4 py-2 rounded-md border-2  ${response?.error ? 'border-red-500  ' : 'outline-0'}`}
                    type="email"
                    id="email"
                    {...register('email')}
                    required={true}
                />
                <label>password</label>
                <input
                    className={`px-4 py-2 rounded-md border-2  ${response?.error ? 'border-red-500  ' : 'outline-0'}`}
                    type="password"
                    id="password"
                    {...register('password')}
                    required={true}
                />
                <button className="px-4 py-4 bg-black text-white mt-5 rounded-md" type="submit" disabled={loading}>
                    {!loading ? 'Login Via Email' : 'Loading ...'}
                </button>
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
/*
const onSubmit: SubmitHandler<LoginInput> = async (data) => {
  try {
    const result = await login({ variables: { ...data } });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};*/
