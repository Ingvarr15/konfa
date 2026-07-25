import {
  type AnchorHTMLAttributes,
  type ComponentPropsWithoutRef,
} from 'react';
import { Link as ReactLink } from 'react-router';
import { checkIsRelativeUrl, cx } from '@/shared/libs';
import styles from './styles.module.scss';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>
  & Omit<ComponentPropsWithoutRef<typeof ReactLink>, 'to'>;

export const Link = function Link({
  href,
  className,
  children,
  ...props
}: Props) {
  const hrefString = href || '';
  const isRelative = checkIsRelativeUrl(hrefString);

  const commonProps = { ...props, className: cx(styles.link, className) };

  if (isRelative) {
    return (
      <ReactLink
        to={hrefString}
        {...commonProps}
      >
        {children}
      </ReactLink>
    );
  }

  return (
    <a
      href={hrefString}
      rel="noopener noreferrer"
      {...commonProps}
    >
      {children}
    </a>
  );
};
