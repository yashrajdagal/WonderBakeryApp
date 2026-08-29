// BC ITEM (response model)
//Endpoint: GET /api/v2.0/companies/({companyId})/items

// Only the fields this app actually consumes are modelled. The real respones carries more (posting groups, tax groups, gtin). We omit what we don't use so the contract stays honest with our dependencies.

export interface BCItem {
   id: string;    // GUID - BC's immutable internal key. API operation addresses the records by this Id, for e.g (PATCH /items({id})). The human-readable numbers cannot be used for API addressing.

   number: string;  // Maps to Product.bcItemNumber
   displayName: string; // description name and a mismatch from domain, which calls it name. Maps to Product.name

   displayName2?: string; //Optional second description line.
   itemCategoryId: string; // ('BREAD', 'VIENNO')
   itemCategoryCode: string; // Maps to ProductCategory Union.
   blocked: boolean;  // if true cannot be sold. Maps to Product.isAvailable.
   inventory: number; // it doesn't mean reserved value is available
   unitPrice: number; // Selling Price
   unitCost: number;  // purchasing cost/price of an item
   baseUnitOfMeasureId: string;   // GUID instructed
   baseUnitOfMeasureCode: string; // (PC, BOX, KG)
   lastDateModifedDateTime: string; 
}

// BC SALES ORDER (response model)
//Endpoint: GET /api/v2.0/companies/({companyId})/salesOrders
export interface BCSalesOrder {
   id: string;
   number: string;
   customerId: string;
   customerNumber: string;
   customerName: string;
   orderDate: string;

  // ISO date the customer wants delivery.
  // NOTE: BC stores a DATE here, not a time window. Our app's delivery slot
  // has a start and end time — that detail cannot round-trip through this
  // field, so our backend stays the source of truth for the slot.
   requestedDeliveryDate?: string;

  // Money totals calculated by BC, Read-only by our side.
   totalAmountExcludingTax: number;
   totalTaxAmount: number;
   totalAmountIncludingTax: number;
   
  // Our app tracks physical delivery steps while BC tracks business paperwork, so we keep them separate to prevent losing detailed customer updates.
  status: string;

  lastModifiedDateTime: string;
}

// BC SALES ORDER LINE (response model)
// GET /api/v2.0/companies/({companyId})/salesOrders({id})/salesOrderLines
export interface BCSalesOrderLine {
  id: string;
  documentId: string;
  sequence: number;
  itemId: number;
  lineType: 'Item' | 'Account' | 'Comment' | 'Resource' | 'Fixed Asset' | 'Charge';
  lineObjectNumber: string;   // The item's readable number, e.g. "BREAD-001".
  description: string;
  quantity: Number;
  unitPrice: Number;

  // Line totals calculated by BC, Read-only 
  // These Lines are store on OrderStatus as the transaction snapshot.
  amountExcludingTax: Number;
  amountIncludingTax: Number;
}

// BC CUSTOMER (response model)
// GET /api/v2.0/companies/({companyId})/customers
export interface BCCustomer {
  id: string;
  number: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  city: string;
}

// WRITE PAYLOADS
//// Separate from the response models above.
//
// WHY SEPARATE: most response fields are read-only — BC computes totals,
// assigns ids, tracks inventory. Reusing Partial<BCSalesOrder> as a POST
// body would let any caller send fields BC will reject or silently ignore,
// and the compiler would allow it. Explicit payload types make the writable
// surface exactly as small as it really is.

// POST /api/v2.0/companies/({companyId})/salesOrders
export interface CreateBCSalesOrderPayload {
  customerNumber: string;
  orderDate: string;
  requestDeliveryDate?: string;
  externalDocumentNumber?: string; //Maps to Order.id for reconcilation.
}

// POST /api/v2.0/companies/({companyId})/salesOrders
