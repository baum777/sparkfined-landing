import TradingChart from '../charts/TradingChart';
import './TradingDemo.css';

export function TradingDemoSection() {
  return (
    <section className="trading-demo" id="tools">
      <div className="container">
        <div className="demo-grid">
          <div className="demo-copy">
            <div className="demo-badge">Phase 2 · Live Chart Demo</div>
            <h2 className="demo-headline">From chaos to data-driven trading</h2>
            <p>
              Sparkfined zeigt dir in einem Blick, wie sich aus nervösem Noise ein klarer,
              strukturiert lesbarer Markt konstruieren lässt – mit einem reaktiven,
              animierten Candlestick-Chart direkt im Browser.
            </p>
            <ul className="demo-list">
              <li>
                <span className="icon">✨</span>
                <span>60 Mock-Candles im 4H-Frame, realistische Range &amp; Volatilität.</span>
              </li>
              <li>
                <span className="icon">🖱️</span>
                <span>Hover-Tooltip mit O/H/L/C + Datum, optimiert für ruhige Bewegungen.</span>
              </li>
              <li>
                <span className="icon">⚡</span>
                <span>SVG + Framer Motion – ohne Canvas oder D3, performant &amp; sauber.</span>
              </li>
            </ul>
          </div>

          <div className="demo-visual">
            <TradingChart />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TradingDemoSection;
