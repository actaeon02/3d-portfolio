/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import SelectedWorks from './components/SelectedWorks';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative selection:bg-[var(--accent)] selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <SelectedWorks />
          <TechStack />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
