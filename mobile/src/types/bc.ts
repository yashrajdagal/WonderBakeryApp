//BC ITEM ENTITY
// Mirrors the item entity from bc's ODATA API.
// Endpoint: GET /api/v2.0/companies/({companyId})/items 

// when we sync products from BC, the API returns object shaped like this. The BCProductAdapter converts these into my product interface.

export interface BCItem {
    // BC's unique item code, i.e string for e.g 100903, 890631 etc
    // Maps to Product.id and Product.bcItemNo in our domain.    
    No_: string; 

    //BC's item description which would be the name of the item.
    // Maps to Product.name 
    Description: string;

    //Secondary descripton for more details and longer names. (optional)
    Description_2?: string;

    // Category Code - Maps to ProductCategory.
    // In Wonder Bakery the category codes are "BREAD", "VIENNO", "KITCHEN", "PASTRY"
    //  The adaptors will convert them into ProductCategory String union values.
    Item_Category_Code: string;

    //sales price - maps to Product.price
    Unit_Price: number;

    // Purchase cost - company's internal item price
    Unit_Cost: number;
       
    // Available Stock in the inventory - maps to Product.stock
    Inventory: number;
   
    // Unit of mmeasurement - PC (pieces), KG, BOX, CTN, PACK 
    Base_Unit_of_Measure: string;

    // When it's true, that item cannot be sold
    //Maps to Product.isAvailable (inverted: Blocked =true -> isAvailable = false)
    Blocked: boolean;

    // Last time BC modified this item. Used for incremental sync. 
    // To show all the modified items since last sync.
    Last_Date_Modified: string;
}

// BC SALES ORDER HEADER
// Endpoint: GET/POST /api/v2.0/companies({companyID})/salesOrders

// When customer orders, we POST a corresponding sales order to BC. So the Bakery's operations team sees the app orders alongside the B2B orders in BC. Hence, the production can plan with this unified view accordingly.

export interface BCSalesOrder {
    // Auto-generated sales order no. in BC - "SO-2026-0207"
    // This becomes Order.bcSalesOrderNo after order syncs.
    No_: string;

    // When a user registers, BC wil create a code number to record the order details of the user. which would help in trekking the user for the order delivery.
    Sell_to_Customer_No_: string;
    
    // Customer Name - denormalised for quick display in BC without a join.
    Sell_to_Customer_Name: string;

    //When the order was placed. ISO format
    Order_Date: string;

    //When the customer wants it to be delivered. Maps to Order.deliverySlot
    Request_Delivery_Date: string;

    // Order Total value excluding VAT
    Amount: number;

    //Total Value including 5% VAT in UAE
    Amount_Including_VAT: number;

    //BCSalesOrder Status for Our OrderStatus:
    // Open = Our "Placed" or "confirmed"
    // Released = Our "Preparing" or "Ready"
    // Pending = Special workflow for BC state.
    // The adapter maps between these vocabs
    Status: 'Open' | 'Released' | 'Pending'
    
}