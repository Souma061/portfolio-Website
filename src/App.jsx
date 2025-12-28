import { lazy, Suspense } from 'react';
import './App.css';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import Loading from './components/Loading';
import Navbar from './components/Navbar';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="bg-base text-main">
      <Loading />
      <Cursor />
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="min-h-screen bg-base"></div>}>
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
