import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import { MediaProvider } from './lib/mediaStore.jsx';
import App from './App.jsx';
import './styles/global.css';

// Preview (Claude artifact): hash URLs like #/birds, because the page is a single file.
// Production: normal URLs like /birds. The host must rewrite unknown paths to index.html.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <I18nProvider>
        <MediaProvider>
          <App />
        </MediaProvider>
      </I18nProvider>
    </Router>
  </React.StrictMode>
);
