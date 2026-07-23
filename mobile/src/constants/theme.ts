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

      //Neutrals
      background: '#faf7f2',   // Cream off-white - main screen background
      surface: '#ffffff',      // Pure white - cards, modals. input backgrounds
      surfaceAlt: '#f5f0ea',   // Slightly Warmer - alternate card backgrounds

      // Text
      textPrimary: '#2c1810',   // Near-black with warm tint - headings, body
      textSecondary: '#6b5b4f', // Mid-tone - subtexts, metadata
      textTertiary: '#a89b91',  // Light - placeholders, disabled labels
      textInverse: '#ffffff',   // White texts on dark or black background
      
      // Borders
      border: '#e8dfd3',        // Hairline borders, dividers, input borders
      borderStrong: '#c8b8a8',  // More visible borders when needed

      // Semantic colours (meaning-bearing)
      success: '#4a7c59',        // Order delivered, payment confirmed
      warning: '#e0a458',        // Low stock, pending aaction required
      error: '#c44545',          // Validation errors, failed request
      info: '#5b7b9a',           // Informaational Banners
      
      // Order Status Colours
      //This maps to OrderStatus type values, component looks up by status string.
      // StatusBage component: backgroundColor: COLORS.orderStatus[order.status]
      orderStatus: {
        placed: '#5b7b9a',
        confirmed: '#4a7c59',
      }
}
