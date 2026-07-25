import { Card as MuiCard, type CardProps } from '@mui/material';
import { cx } from '@/shared/lib';
import styles from './styles.module.scss';

const CardBase = function Card({ className, children, ...props }: CardProps) {
  return (
    <MuiCard className={cx(styles.card, className)} {...props}>
      {children}
    </MuiCard>
  );
};

export const Card = CardBase as typeof MuiCard;
