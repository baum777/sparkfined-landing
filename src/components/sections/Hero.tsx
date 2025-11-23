import { motion } from 'framer-motion';
import AnimatedLineChart from '../AnimatedLineChart';
import CountingNumber from '../CountingNumber';
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
          <motion.div
            className="pnl-card chaotic"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="pnl-label error">CHAOTIC TRADING</div>
            <div className="pnl-chart">
              <AnimatedLineChart
                trend="down"
                color="#FF4444"
                glowColor="#FF4444"
              />
            </div>
            <div className="pnl-stats">
              <div className="stat-row">
                <span className="stat-label">PnL</span>
                <span className="stat-value bad">
                  <CountingNumber value={-42} prefix="" suffix="%" duration={2.5} />
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Win Rate</span>
                <span className="stat-value bad">
                  <CountingNumber value={38} suffix="%" duration={2.5} />
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Method</span>
                <span className="stat-value bad">Gut Feeling</span>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="arrow-divider">→</div>

          {/* Data-Driven Card */}
          <motion.div
            className="pnl-card smooth"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="pnl-label success">DATA-DRIVEN TRADING</div>
            <div className="pnl-chart">
              <AnimatedLineChart
                trend="up"
                color="#00DD88"
                glowColor="#00DD88"
              />
            </div>
            <div className="pnl-stats">
              <div className="stat-row">
                <span className="stat-label">PnL</span>
                <span className="stat-value good">
                  <CountingNumber value={156} prefix="+" suffix="%" duration={2.5} />
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Win Rate</span>
                <span className="stat-value good">
                  <CountingNumber value={64} suffix="%" duration={2.5} />
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Method</span>
                <span className="stat-value good">Analytics</span>
              </div>
            </div>
          </motion.div>
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
