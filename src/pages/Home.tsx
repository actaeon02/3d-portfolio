import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import SelectedWorks from '../components/SelectedWorks';
import TechStack from '../components/TechStack';
import Footer from '../components/Footer';
import ThreeScene from '../components/ThreeScene';
import { useContact } from '../context/ContactContext';

export default function Home() {
  const { openContact } = useContact();

  return (
    <div className="min-h-screen relative selection:bg-[var(--accent)] selection:text-white">
      {/* Global 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto bg-[var(--bg-color)]">
        {/* Subtle Data Dot Grid Background */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }}
        />
        {/* Radial fade to seamlessly blend into the background colors at the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-color)_80%)] pointer-events-none" />
        
        {/* 3D Scene rendered on top of the backgrounds, but behind the UI */}
        <ThreeScene />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 pointer-events-none">
        {/* Enable pointer events only for interactive sections so we can still drag the 3D scene where there is empty space */}
        <div className="pointer-events-auto">
          <Navbar />
          <main>
            <Hero onContactClick={openContact} />
            <About />
            <Experience />
            <SelectedWorks />
            <TechStack />
          </main>
          <Footer onContactClick={openContact} />
        </div>
      </div>
    </div>
  );
}
