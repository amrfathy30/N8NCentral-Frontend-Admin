import { Component } from "react";
import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import "../../index.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    this.setState({ error, errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertTriangle className="text-red-600 w-10 h-10" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-red-700 mb-2">
              Oops! Something went wrong 🚨
            </h1>
            <p className="text-gray-600 mb-4">
              An unexpected error occurred while running the app.
            </p>
            <pre className="bg-gray-100 text-left text-sm text-red-600 p-3 rounded-lg overflow-x-auto mb-4">
              {this.state.error?.message}
              {"\n"}
              {this.state.errorInfo?.componentStack}
            </pre>
            <button
              onClick={this.handleReload}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            >
              Reload App 🔄
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
