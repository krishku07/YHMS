import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#0F172A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#F8FAFC",
            fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
            padding: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(239,68,68,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              marginBottom: 20,
            }}
          >
            ⚠️
          </div>
          <h1 style={{ fontSize: "1.5rem", marginBottom: 8 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#94A3B8", marginBottom: 24, maxWidth: 400 }}>
            An unexpected error occurred. Please refresh the page or try again.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: "#6D28D9",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 10,
              padding: "12px 28px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

