// ─── PRODUCT CATEGORY ───────────────────────────────────────────────────

// Type is like a label alias to describe the behaviour and the shape of data. Such as its properties and methods.
export type ProductCategory = 
    | 'Bread'
    | 'Viennoiserie'
    | 'Pastry'
    | 'Kitchen';

// Interface is strictly for defining object shapes and can be extended with new properties later. While type is a versatile alias that can represent objects, union, primitives, and tuples. But cannot be changed once created.

// ─── PRODUCT ────────────────────────────────────────────────────────────
export interface Product {

// --Identification--
 id: string;
 bcItemNo?: string;

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
images: string;
allergens: string;

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
// Why this is a State Machine (not just a string):
// Valid Transactions are strictly based on:
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


// ─── DELIVERY ADDRESS ────────────────────────────────────────────────────
export interface DeliveryAddress {
  buildingName: string;   // "Damac Heights"
  apartmentNo: string;    // "Unit 2104"
  street: string;         // "Al Sufouh Road"
  area: string;           // "Dubai Marina"
  city: string;           // Almost always "Dubai" but UAE has 7 emirates
  emirate: string;        // "Dubai" | "Abu Dhabi" | "Sharjah" etc.
  landmark?: string;      // "Next to Spinneys" — optional, helps drivers

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

// ─── ORDER ───────────────────────────────────────────────────────────────
// A Complete placed order. The most important entity in the app.
export interface Order {
  id: string;
  bcSalesOrderNo: string;
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
    phone: String;
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

