import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary-500">
                HikmaUI Demo
              </h1>
              <button
                onClick={() => setIsDark(!isDark)}
                className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-200"
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Build Beautiful UIs Faster
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                A modern CSS framework with JIT compilation, arbitrary values, and
                comprehensive utility classes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-semibold transition-all duration-200">
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Utility Showcase
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Display Utilities */}
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors">
                <div className="w-12 h-12 bg-primary-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Display Utilities
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Block, flex, grid, inline, and hidden utilities for layout control.
                </p>
              </div>

              {/* Position Utilities */}
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors">
                <div className="w-12 h-12 bg-secondary-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Position Utilities
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Relative, absolute, fixed, sticky positioning with inset and z-index.
                </p>
              </div>

              {/* Transform Utilities */}
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-success-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Transform Utilities
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Scale, rotate, translate, and skew transformations.
                </p>
              </div>

              {/* Filter Utilities */}
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors">
                <div className="w-12 h-12 bg-warning-500 rounded-lg mb-4 flex items-center justify-center blur-[2px] hover:blur-none transition-all">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Filter Utilities
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Blur, brightness, contrast, grayscale, and backdrop filters.
                </p>
              </div>

              {/* Border Utilities */}
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-primary-500 ring-4 ring-primary-500 ring-opacity-20">
                <div className="w-12 h-12 bg-danger-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Border Utilities
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Border width, color, style, rounded corners, and ring effects.
                </p>
              </div>

              {/* Transition Utilities */}
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-500 ease-in-out hover:shadow-2xl">
                <div className="w-12 h-12 bg-info-500 rounded-lg mb-4 flex items-center justify-center animate-pulse">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Transition Utilities
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Smooth transitions, custom durations, easing, and animations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Arbitrary Values Demo */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Arbitrary Values
            </h3>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Custom Sizes
                </h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-[137px] h-[89px] bg-primary-500 rounded-lg flex items-center justify-center text-white text-sm">
                    w-[137px]
                  </div>
                  <div className="w-[89px] h-[137px] bg-secondary-500 rounded-lg flex items-center justify-center text-white text-sm">
                    h-[137px]
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Custom Colors
                </h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-24 h-24 bg-[#bada55] rounded-lg" />
                  <div className="w-24 h-24 bg-[#c0ffee] rounded-lg" />
                  <div className="w-24 h-24 bg-[#ff6b6b] rounded-lg" />
                  <div className="w-24 h-24 bg-[rgb(99,102,241)] rounded-lg" />
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Responsive Variants
                </h4>
                <div className="p-4 bg-primary-500 sm:bg-secondary-500 md:bg-success-500 lg:bg-warning-500 rounded-lg text-white text-center font-semibold">
                  Resize browser to see color changes
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  primary → sm:secondary → md:success → lg:warning
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              Built with HikmaUI • A next-generation CSS framework
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
