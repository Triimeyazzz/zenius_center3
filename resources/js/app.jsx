import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PembayaranList from './Pages/Pembayaran/PembayaranList.jsx';
import PembayaranForm from './Pages/Pembayaran/PembayaranForm.jsx';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
const App = () => {
    return (
    <Router>
        <Routes>
          {/* Tambahkan rute untuk komponen yang sudah ada */}
          {/* <Route path="/" exact component={Home} /> */}
          {/* <Route path="/about" component={About} /> */}

          {/* Rute baru untuk pembayaran */}
          <Route path="/pembayaran" exact component={PembayaranList} />
          {/* <Route path="/pembayaran/create" component={PembayaranForm} /> */}

          {/* Rute fallback jika tidak ada rute yang cocok */}
          <Route path="*">
            <h1>404 Not Found</h1>
          </Route>
        </Routes>
    </Router>
    );
  }

  export default App;
