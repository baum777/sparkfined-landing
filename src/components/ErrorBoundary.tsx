import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
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
          <div>
            <h1 style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: '#FF4444',
            }}>
              ⚠️ Oops!
            </h1>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#00F5FF',
            }}>
              Something went wrong
            </h2>
            <p style={{
              color: '#AAAAAA',
              marginBottom: '2rem',
              maxWidth: '500px',
            }}>
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#00F5FF',
                color: '#0A0E1A',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <details style={{
                marginTop: '2rem',
                textAlign: 'left',
                background: '#141927',
                padding: '1rem',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '2rem auto 0',
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>
                  Error Details (Dev Only)
                </summary>
                <pre style={{
                  color: '#FF4444',
                  fontSize: '0.875rem',
                  overflow: 'auto',
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
