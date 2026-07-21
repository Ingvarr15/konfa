import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@/pages/main';

export const Router = function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
