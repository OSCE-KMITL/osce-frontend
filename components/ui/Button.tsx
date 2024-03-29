import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { ButtonOrLink, Props as ButtonOrLinkProps } from '@ui/ButtonOrLink';

/**
 * Button Component for reusable code
 * props:
 * intent = ประเภทปุ่ม
 * fullWith = ขนาดเต็ม Container หรือไม่ ? (ใช้ในกรณี container มีพื้นที่น้อย)
 */

export const buttonStyles = cva(
    'flex justify-center font-primary_noto items-center font-light text-md md:text-[19px] px-4 py-2 rounded-md cursor-pointer w-full md:w-fit',
    {
        variants: {
            intent: {
                primary: 'bg-green-600 hover:bg-green-800 text-white ',
                brand: 'bg-primary-500 hover:bg-primary-800 text-white ',
                secondary: 'text-gray-800 bg-gray-300 hover:bg-gray-500',
                danger: 'bg-red-600 hover:bg-red-800 text-white text-white',
            },
            fullWidth: {
                true: 'w-full',
            },
            isDisabled: {
                true: 'cursor-not-allowed',
            },
        },
        defaultVariants: {
            intent: 'primary',
        },
    }
);

export interface ButtonProps extends ButtonOrLinkProps, VariantProps<typeof buttonStyles> {}

export default function Button({ intent, fullWidth, isDisabled, ...props }: ButtonProps) {
    return <ButtonOrLink disabled={isDisabled} className={buttonStyles({ intent, fullWidth, isDisabled })} {...props} />;
}
