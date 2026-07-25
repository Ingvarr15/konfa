import { RouterProvider } from 'react-router/dom';
import { router } from '../router';

export const App = function App() {
  return <RouterProvider router={router} />;
};
