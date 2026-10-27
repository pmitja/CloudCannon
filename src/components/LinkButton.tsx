import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  href: string;
  label: string;
  variant?: ComponentProps<typeof Button>['variant'];
  size?: ComponentProps<typeof Button>['size'];
  className?: string;
  /** Extra attributes for the <a>, e.g. CloudCannon editable-region data attributes */
  linkProps?: Record<string, string>;
};

/** shadcn/ui Button rendered as a link. */
export default function LinkButton({ href, label, variant = 'default', size = 'lg', className, linkProps }: Props) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} {...linkProps}>
        {label}
      </a>
    </Button>
  );
}
