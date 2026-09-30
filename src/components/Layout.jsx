import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ProtoBar from './ProtoBar.jsx';
import Sprite from './Sprite.jsx';
import { useRevealObserver } from '../lib/hooks.js';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useRevealObserver();
  return (
    <>
      <Sprite />
      <Header />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <Footer />
      <ProtoBar />
    </>
  );
}
