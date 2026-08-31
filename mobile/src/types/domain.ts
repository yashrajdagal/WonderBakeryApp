// ─── PRODUCT CATEGORY ───────────────────────────────────────────────────

// Type is like a label alias to describe the behaviour and the shape of data. Such as its properties and methods.

export type ProductCategory =
| 'Bread'
| 'Vienno'
| 'Pastry'
| 'Kitchen';

// Interface is strictly for defining object shapes and can be extended with new properties later. While type is a versatile alias that can represent objects, union, primitives, and tuples. But cannot be changed once created.

// ─── PRODUCT ────────────────────────────────────────────────────────────
export interface Product {

// --Identification--

 id: string;        // our own app/database ID
 bcItemId?: string; // BC's GUID — every v2.0 API call uses this
 bcItemNumber?: string; // BC's human-readable code, e.g. "BREAD-001"

 // -- User-facing fields --
 name: string;
 description: string;
 category: ProductCategory;

// We'll use Number for price as We'll do Maths
 price: number;

//  --Inventory--
// Stock Inventory comes from BC's inventory field during sync.
// The cart reducer uses this to enforce max. quantity per order.
stock: number;
isAvailable: boolean;
 
// --Display--
images: string[];
allergens: string[]; 

// --Audit trail--
createdAt: string;
updatedAt: string;
}

// ─── CART ITEM ───────────────────────────────────────────────────────────
export interface CartItem {
product: Product;
quantity: number;
addedAt: string;
}

// ─── ORDER STATUS ────────────────────────────────────────────────────────
// NOTE: this union restricts the VOCABULARY, not the transitions.
// TypeScript cannot stop placed → delivered. Transition enforcement is a
// backend concern (Month 2) — see docs/learnings.md.
// Placed > confirmed > preparing > ready > Out for Delivery > Delivered
// Placed > Cancelled
// Confirmed > Cancelled 
// preparing > Cancelled 

export type OrderStatus = 
  | 'placed'            // Submitted, not yet seen by bakery
  | 'confirmed'         // Bakery accepted — now committed to fulfilling
  | 'preparing'         // In the kitchen
  | 'ready'             // Done, awaiting pickup or driver
  | 'out_for_delivery'  // Driver collected it
  | 'delivered'         // Customer received it
  | 'cancelled';        // Voided before completion

// UAE has exactly seven emirates. A free-form string invites typos that break delivery-zone matching downstream.

export type UAEEmirate =
| 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Fujairah'
| 'Ras-al-khaimah' | 'Ajman' | 'Umm Al Quwain';

// ─── DELIVERY ADDRESS ────────────────────────────────────────────────────
export interface DeliveryAddress {
  buildingName: string;   // "Damac Heights"
  apartmentNo: string;    // "Unit 2104"
  street: string;         // "Al Sufouh Road"
  area: string;           // "Dubai Marina"
  city: string;           // Almost always "Dubai" but UAE has 7 emirates
  emirate: UAEEmirate;    // "Dubai" | "Abu Dhabi" | "Sharjah" etc.
  landmark?: string;      // "Next to Spinneys" — optional, helps drivers
  countryCode: 'AE';

  // Optional coordinates for map pin display and routing.
  // Present when user drops a pin on the map; absent when they type manually.
  latitude?: number;
  longitude?: number;
}

// ─── ORDER ITEM ──────────────────────────────────────────────────────────
export interface OrderItem {
   productId: string;
   productName: string;
   unitPrice: number;
   quantity: number;
   lineTotal: number;  // unitPrice × quantity — pre-calculated for the receipt
                       // WHY pre-calculate: avoids floating-point drift
                       // from recalculating on every render
}

// The chosen method says nothing about whether money actually arrived.
// A cash_on_delivery order sits at 'pending' until the driver collects.

export type PaymentStatus = 
| 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded';

// ─── ORDER ───────────────────────────────────────────────────────────────
// A Complete placed order. The most important entity in the app.
export interface Order {
  id: string;
  bcSalesOrderId?: string;      // BC GUID — used in API endpoints
  bcSalesOrderNumber?: string;  // e.g. "SO-2026-00042"
  userId: string;
  items: OrderItem[]; // from OrderItem 
  

//--Money--
// Split into components for receipt transparency.
   subtotal: number;
   vat: number;
   deliveryFee: number;
   total: number;

// --state--
    status: OrderStatus;

// --Logistics--
    deliveryAddress: DeliveryAddress;
    deliverySlot?: string;     //Optional time for eg- today, 1-4 PM

//-- Payment--
    paymentMethod: 'cash_on_delivery' | 'card';
    paymentStatus: PaymentStatus;
    paymentReference?: string;    // gateway transaction id - NEVER CARD DATA

//--Audit--
    createdAt: string;
    updatedAt: string;
}

// ─── USER ────────────────────────────────────────────────────────────────
// The autheticated customer profile
export interface User{
    id: string;
    email: string;
    fullName: string;
    phone: string;
    defaultAddress?: DeliveryAddress;
    createdAt: string;
}

// ─── AUTH TOKENS ─────────────────────────────────────────────────────────
export interface AuthTokens{
    accessToken: string;          // Bearer token sent in Authorization header
    refreshToken: string;         // Used only to renew the access token
    accessTokenExpiresAt: number; // Unix timestamp in milliseconds
                                  // Date.now() returns milliseconds
                                  // Compare: Date.now() > accessTokenExpiresAt
}

