// CATEGORY METADATA
// Purpose: It's a metadata for each product category
// It displays Item name, description, category and item code in one place.

import type { ProductCategory } from "@types";

// Interface describing what metadata each category has
// other components import this to know what shape to expect.
export interface CategoryMeta {
    value: ProductCategory;   // Actual type value used in code
    label: string;            // Dsiplayed to customers
    descripton: string;       // description for the item on cards
    bcCode: string;           // Business central Item category code value
    emoji: string;            // Will appear as svgs in the app
}

// The actual category data.
// Array not object, which preserves display order (bread first, kitchen last)
// objects keys are unordered. arrays are ordered.
export const CATEGORIES: CategoryMeta[] = [
    {
        value: 'Bread',
        label: 'Bread',
        descripton: 'Sourdough, baguettes, loaves',
        bcCode: 'BREAD',      // Matches the Item category code in BC
        emoji: '🥖',
    },
    {
        value: 'Vienno',
        label: 'Vienno',
        descripton: 'Croissant, pain au chocolat, danish',
        bcCode: 'VIENNO',      
        emoji: '🥐',
    },
    {
        value: 'Pastry',
        label: 'Pastry',
        descripton: 'Pastries, Cakes, Cupcakes',
        bcCode: 'PASTRY',      
        emoji: '🧁',
    },
    {
        label: 'Kitchen',
        value: 'Kitchen',
        descripton: 'Sandwiches, quiches, ready-to-eat',
        bcCode: 'KITCHEN',      
        emoji: '🥗',
    },
];

//  Helper to find category metadata by its value

// Why a function instead of CATEGORIES.find() inline:
// - Called in multiple places (category cards, product details, BC adapter)
// - centralising means one place to add error handling or logging later
// - The '!' (non-full assertion) is safe here because the typescript type system guarantees 'value' is a valid ProductCategory - So CATEGORIES must contain it.
export function getCategoryMeta(value: ProductCategory): CategoryMeta {
     return CATEGORIES.find(c => c.value === value)!;
}

// Helper to find category by BC code.
// Used in the BC adaptor: given Item Category Code from BC.
// find the matching app category.

// Returns undefined if no match - BC may have category codes we haven't mapped yet. Callers handle the undefined case gracefully.
export function getCategoryByBcCode(bcCode: string): CategoryMeta | undefined {
     return CATEGORIES.find(c => c.bcCode === bcCode);
}
