import React, { FunctionComponent } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ErrorMessage } from '@hookform/error-message';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export const inputStyle = cva('shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5', {
    variants: {
        isError: {
            true: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:border-red-500',
            false: 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-200 ',
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
}

const Input: FunctionComponent<InputProps> = ({ validationSchema, name, errors, placeholder, register, type, label, fullWidth, isError }) => {
    return (
        <div className="mb-2 h-auto">
            <label htmlFor={name} className={`block text-sm font-medium text-gray-900 `}>
                {label}
            </label>
            <input
                className={inputStyle({ isError, fullWidth })}
                id={name}
                name={name}
                type={type}
                {...register(name, validationSchema)}
                placeholder={placeholder}
            />
            <div className="h-5">
                {errors && <ErrorMessage errors={errors} name={name} render={({ message }) => <p className={'text-red-500'}>{message}</p>} />}
            </div>
        </div>
    );
};

export default Input;
