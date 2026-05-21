// ─── Metro Configuration ────────────────────────────────────────────
// Metro is the JavaScript bundler React Native uses. It packages
// your code into a single JS file the runtime executes.
//
// This config tells Metro to honor the same path aliases we set in
// tsconfig.json. Without this, `@components/Button` works in the
// editor (because TypeScript reads tsconfig) but FAILS at runtime
// (because Metro doesn't know about it).

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Start from Expo's default Metro config — never replace from scratch.
// Expo's defaults handle a lot: asset extensions, transformers, etc.
const config = getDefaultConfig(__dirname);

// ─── Register path aliases ──────────────────────────────────────────
// These MUST match what's in tsconfig.json. If they don't, TypeScript
// and Metro disagree — code compiles but fails at runtime with
// "Module not found" errors. One of the most confusing bugs to debug.
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@screens': path.resolve(__dirname, 'src/screens'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@context': path.resolve(__dirname, 'src/context'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@types': path.resolve(__dirname, 'src/types'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@utils': path.resolve(__dirname, 'src/utils'),
};

module.exports = config;