import React, { FunctionComponent } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

export const input = cva('shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5', {
    variants: {
        intent: {
            default: 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 ',
            error: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 ',
        },
        fullWidth: {
            true: 'w-full',
        },
    },
    defaultVariants: {
        intent: 'default',
    },
});

interface InputFormProps extends VariantProps<typeof input> {}

type Props = InputFormProps & ComponentProps<'input'>;

const Input: FunctionComponent<Props> = ({ intent, fullWidth, ...props }: InputFormProps) => {
    return <input className={input({ intent, fullWidth })} {...props} />;
};

export default Input;
