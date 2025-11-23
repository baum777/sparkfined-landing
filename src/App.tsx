import Hero from './components/sections/Hero';
import { TradingDemoSection } from './components/sections/TradingDemo';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Header Navigation */}
      <header className="main-header">
        <div className="container">
          <nav className="main-nav">
            <div className="logo">⚡ Sparkfined</div>
            <ul className="nav-links">
              <li><a href="#tools">Try Tools</a></li>
              <li><a href="#progression">Path</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#access">Access</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero />

        <TradingDemoSection />

        {/* TODO: Add other sections */}
        {/* <DemoChart /> */}
        {/* <ProblemSolution /> */}
        {/* <DemoReplay /> */}
        {/* <Progression /> */}
        {/* <DemoSignal /> */}
        {/* <Architecture /> */}
        {/* <SocialProof /> */}
        {/* <FAQ /> */}
        {/* <CTA /> */}
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <p>© 2024 Sparkfined • Built with Vite + React + TypeScript</p>
          <div className="footer-links">
            <a href="https://github.com/baum777/sparkfined-landing" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#">Docs</a>
            <a href="#">X/Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
