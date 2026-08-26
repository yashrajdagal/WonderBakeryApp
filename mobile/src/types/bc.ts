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

