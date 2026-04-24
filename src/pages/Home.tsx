import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import SelectedWorks from '../components/SelectedWorks';
import TechStack from '../components/TechStack';
import Footer from '../components/Footer';
import { useContact } from '../context/ContactContext';

export default function Home() {
  const { openContact } = useContact();

  return (
    <div className="min-h-screen relative selection:bg-[var(--accent)] selection:text-white">
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
  );
}
