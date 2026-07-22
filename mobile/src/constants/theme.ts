// DESIGN TOKENS AND COLOURS

// PURPOSE - The visual value in the app lives here.
// Components NEVER use hardcoded colours, sizes, or spacing.

// WHY DESIGN TOKENS?
// Can you change the primary button colour?
// without it - I'll search tons of schemas, hex, and colours codes. If there are 100+ theme colours in my files. I might miss 3-4 amongst them.
// With it - I'll just change COLORS.primary in one place. done in 30 seconds.

// The 'as const' at the end of each object tells typescript to infer the LITERAL type of each value not generic type.
// without it - COLORS.primary has a type 'string'.
// with it - COLORS.primary has type '#D4A574' (exact value).
// This enables the autocomplete to show the actual hex values on hover.

// COLOURS 
export const COLORS = {
      //Brand Palette
      primary: '#d4a574',      // Warm Gold - Main CTAs, primary buttons.
      primaryDark: '#a67c52',  // pressed/active state of primary
      primaryLight: '#6b4423', // Light tint - background, chips
      secondary: '#6b4423',    // Deep Brown - headings, secondary actions
      accent: '#e8a87c',       // Peach - badges, highlights, success states 
}