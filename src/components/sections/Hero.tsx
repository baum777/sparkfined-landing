import { motion } from 'framer-motion';
import { MiniChart } from '../charts/MiniChart';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Most Traders Lose.
          <br />
          Not Because They're Unlucky.
          <br />
          Because They Trade Blind.
        </motion.h1>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Chaotic Trading Card */}
          <div className="pnl-card chaotic">
            <div className="pnl-label error">CHAOTIC TRADING</div>
            <div className="pnl-chart">
              <MiniChart type="chaotic" />
              <span className="sr-only">
                Chaotic trading resulted in a loss scenario with high volatility.
              </span>
            </div>
            <div className="pnl-stats">
              <div className="stat-row">
                <span className="stat-label">PnL</span>
                <span className="stat-value bad">-23%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Emotion</span>
                <span className="stat-value bad">High</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Method</span>
                <span className="stat-value bad">Reactive</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="arrow-divider">→</div>

          {/* Data-Driven Card */}
          <div className="pnl-card smooth">
            <div className="pnl-label success">DATA-DRIVEN TRADING</div>
            <div className="pnl-chart">
              <MiniChart type="smooth" />
              <span className="sr-only">
                Data-driven trading resulted in smoother, more consistent gains.
              </span>
            </div>
            <div className="pnl-stats">
              <div className="stat-row">
                <span className="stat-label">PnL</span>
                <span className="stat-value good">+67%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Emotion</span>
                <span className="stat-value good">Low</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Method</span>
                <span className="stat-value good">Analytical</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          The difference? <strong className="text-gradient">Real-time analytics.</strong>
          <br />
          Try them yourself below. No signup required.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a href="#tools" className="btn-primary">
            ↓ Experience the Tools
          </a>
        </motion.div>
      </div>

      {/* Easter Egg */}
      <div className="easter-egg fire">🔥</div>
    </section>
  );
}
