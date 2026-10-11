import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Book render error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0E0F12] p-6 text-center text-white">
          <div className="font-display text-lg font-semibold">Something broke while rendering the book</div>
          <pre className="mt-4 max-w-lg overflow-auto rounded-lg bg-white/10 p-4 text-left text-xs text-white/80">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="mt-5 rounded-full border border-white/30 px-5 py-2 text-sm hover:bg-white/10"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
