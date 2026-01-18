import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <span className="error-boundary-message">something broke</span>
          <span className="error-boundary-detail">
            {this.state.error.message}
          </span>
          <button
            className="error-boundary-btn"
            onClick={() => { this.setState({ error: null }); window.location.hash = '#/'; }}
          >
            reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
