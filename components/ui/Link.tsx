import { ButtonOrLink, Props as ButtonOrLinkProps } from './ButtonOrLink';
import { buttonStyles } from '@ui/Button';
import { VariantProps } from 'class-variance-authority';

export interface LinkProps extends ButtonOrLinkProps, VariantProps<typeof buttonStyles> {}
/**
 * Component สำหรับแสดงผล content
 * เพื่อ reusable
 */
export function Link({ href, intent, fullWidth, ...props }: LinkProps) {
    return <ButtonOrLink href={href} className={buttonStyles({ intent, fullWidth })} {...props} />;
}
