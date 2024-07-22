import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-purple-950 to-blue-800 p-6 rounded-lg shadow-lg border border-gray-300 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">Ups! Ada yang salah.</h1>
          <p className="text-lg text-yellow-300 mb-6">
          Kami mengalami kesalahan yang tidak terduga. Silakan coba lagi nanti atau segarkan halaman.
                    </p>
          <button 
            onClick={this.handleReload} 
            className="bg-blue-500 text-white text-lg py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Segarkan Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
