import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/dialogs.css';
import './styles/sections-a.css';
import './styles/sections-b.css';
import './styles/sections-c.css';
import './styles/print.css';

import App from './App';
import { applySeo } from './utils/seo';

// Reveals are hidden only when JS is running; without it everything shows.
document.documentElement.classList.add('js');
applySeo();

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
