import React, { FunctionComponent } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ErrorMessage } from '@hookform/error-message';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export const inputStyle = cva('shadow-sm  text-[18px] rounded-lg  outline-0 block  p-2.5', {
    variants: {
        isError: {
            true: 'bg-red-50  border border-red-500 text-gray-900 placeholder-red-700 focus:border-red-500 shadow-red-300 shadow-md ',
            false: 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-green-500 ',
        },
        fullWidth: {
            true: 'w-full',
        },
    },
    defaultVariants: {
        isError: false,
        fullWidth: true,
    },
});

interface InputProps extends VariantProps<typeof inputStyle> {
    name: string;
    label: string;
    register: any;
    errors: any;
    type: React.HTMLInputTypeAttribute;
    validationSchema?: RegisterOptions;
    placeholder?: string;
    step?: boolean | undefined;
    disable?: boolean;
}

const Input: FunctionComponent<InputProps> = ({ disable, step, validationSchema, name, errors, placeholder, register, type, label, fullWidth, isError }) => {
    return (
        <div className="mb-2 h-auto">
            <label htmlFor={name} className={`block text-[18px] font-medium text-gray-900 `}>
                {label}
            </label>
            <input
                className={inputStyle({ isError, fullWidth })}
                id={name}
                name={name}
                type={type}
                {...register(name, validationSchema)}
                placeholder={placeholder}
                step={step ? 0.01 : undefined}
                disabled={disable}
            />
            <div className="h-5">
                {errors && <ErrorMessage errors={errors} name={name} render={({ message }) => <p className={'text-red-500'}>{message}</p>} />}
            </div>
        </div>
    );
};

export default Input;
