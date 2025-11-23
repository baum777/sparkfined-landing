import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0E1A',
      color: '#FFFFFF',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{
          fontSize: '6rem',
          marginBottom: '0',
          color: '#00F5FF',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
        }}>
          404
        </h1>

        <h2 style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#FFFFFF',
        }}>
          Page Not Found
        </h2>

        <p style={{
          color: '#AAAAAA',
          marginBottom: '2rem',
          fontSize: '1.125rem',
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <a
          href="/"
          style={{
            display: 'inline-block',
            background: '#00F5FF',
            color: '#0A0E1A',
            textDecoration: 'none',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ← Back to Home
        </a>

        <div style={{
          marginTop: '3rem',
          fontSize: '4rem',
          opacity: 0.3,
        }}>
          ⚡
        </div>
      </motion.div>
    </div>
  );
}
