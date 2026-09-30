import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function useDocTitle(title) {
  const { t } = useI18n();
  useEffect(() => { document.title = title ? `${title} · ${t('meta.siteName')}` : `${t('meta.siteName')} · ${t('meta.tagline')}`; }, [title, t]);
}

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    document.body.classList.add('scroll-locked');
    return () => document.body.classList.remove('scroll-locked');
  }, [locked]);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Watches every [data-reveal] element on the page, including ones added later (filters, route changes).
export function useRevealObserver() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.classList.add('js');
    const show = (el) => el.classList.add('in');
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      document.querySelectorAll('[data-reveal]').forEach(show);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const scan = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    // Safety net: never leave content hidden if something goes wrong
    const fallback = setTimeout(() => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.top < window.innerHeight) show(el);
    }), 2500);
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(fallback); };
  }, [pathname]);
}

export function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, inView];
}

export function useCountUp(target, run, duration = 1400) {
  const [n, setN] = useState(prefersReducedMotion() ? target : 0);
  useEffect(() => {
    if (!run || prefersReducedMotion()) { if (run) setN(target); return undefined; }
    let raf; const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return n;
}

// Keeps keyboard focus inside an open dialog/drawer and restores it on close.
export function useFocusTrap(active, ref, onEscape) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const prev = document.activeElement;
    const root = ref.current;
    const focusables = () => [...root.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
    (focusables()[0] || root).focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onEscape?.(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    root.addEventListener('keydown', onKey);
    return () => { root.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps
}
