import './styles/global.css';
import './styles/landing.css';
import CTAPaths from './components/landing/CTAPaths';
import FAQ from './components/landing/FAQ';
import Footer from './components/landing/Footer';
import HeaderNavigation from './components/landing/HeaderNavigation';
import HeroProblemStatement from './components/landing/HeroProblemStatement';
import InteractiveChartDemo from './components/landing/InteractiveChartDemo';
import JournalSolution from './components/landing/JournalSolution';
import MarketReplayDemo from './components/landing/MarketReplayDemo';
import ProgressionSystem from './components/landing/ProgressionSystem';
import SignalAnalyzer from './components/landing/SignalAnalyzer';
import SocialProof from './components/landing/SocialProof';
import SystemArchitecture from './components/landing/SystemArchitecture';
import { landingContent } from './content/landingContent';

function App() {
  return (
    <div className="app">
      <HeaderNavigation {...landingContent.header} />
      <main>
        <HeroProblemStatement {...landingContent.hero} />
        <InteractiveChartDemo {...landingContent.chartDemo} />
        <JournalSolution {...landingContent.journalSolution} />
        <MarketReplayDemo {...landingContent.marketReplay} />
        <ProgressionSystem {...landingContent.progression} />
        <SignalAnalyzer {...landingContent.signalAnalyzer} />
        <SystemArchitecture {...landingContent.architecture} />
        <SocialProof {...landingContent.socialProof} />
        <FAQ {...landingContent.faq} />
        <CTAPaths {...landingContent.ctaPaths} />
      </main>
      <Footer {...landingContent.footer} />
    </div>
  );
}

export default App;
