import { SignUp } from '@/widgets/Auth';
import styles from './styles.module.scss';

export const MainPage = function MainPage() {
  return (
    <main className={styles.main}>
      <SignUp />
    </main>
  );
};
