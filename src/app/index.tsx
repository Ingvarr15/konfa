import { createRoot } from 'react-dom/client';
import '@/shared/styles/normalize.scss';
import { Providers } from './providers';
import { App } from './ui';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <Providers>
    <App />
  </Providers>,
);
