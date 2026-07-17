// ═══════════════════════════════════════════════════════════════════════
// src/types/index.ts — Barrel Export
// ═══════════════════════════════════════════════════════════════════════
// A barrel file re-exports everything from a folder through one entry.
//
// WITHOUT barrel:
//   import { Product } from '@types/domain';
//   import { ApiError } from '@types/api';
//   import { BCItem } from '@types/bc';
//
// WITH barrel:
//   import { Product, ApiError, BCItem } from '@types';
//
// One import line regardless of how many type files we have.
// Refactoring internals (splitting bc.ts, renaming api.ts) doesn't 
// affect any file that imports from '@types'.
// ═══════════════════════════════════════════════════════════════════════

export * from './domain';  // Re-exports everything domain.ts exports
export * from './api';     // Re-exports everything api.ts exports
export * from './bc';      // Re-exports everything bc.ts exports