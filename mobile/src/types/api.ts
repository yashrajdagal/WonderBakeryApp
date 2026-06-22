// The Interview note: "I use a generic response wrapper at all endpoints, which lets me add pagination metadata, request APIS, or feature flag in any responses without changing the inner data types."

// Generic API Response Wrapper 
export interface ApiResponse<T>{
    success: boolean; 
    data: T;
    message?: string; //whether the order is placed or not?
    pagination?: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}


// API error class 
// The axios response interceptor catches HTTP errors and convert them into an instance of API errors before it reaching the servers and component code. 
export class ApiError extends Error{
    status: number;  //Https status code: 400, 401, 403, 404, 409, 500 etc.
    code: string; //to show the different types of error messages (code) to the user.
    details?: unknown; //Raw Error details for debugging.

    constructor(
        message: string, //human-readable: "Out of Stock"
        status: number,  //http status: such as 404/409
        code: string,    //Machine-code: "Insufficient_stock"
        details?: unknown
    ){
        super(message); //It calls the parent error class constructor with the message.

        this.name = "ApiError";
        this.status = status;
        this.code = code;
        this.details = details;
    
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    //convenience method = to make the code more readable 
    // instead of writing - if (error.status === 401 || error.status === 403)
    // we are writing - if (error.isAuthError())
    // same logic, far more readable.

    isAuthError(): boolean {
    // 401: not authenticated (no token or it's expired)
    // 403: authenticated but not authorised (means not permitted)
        return this.status === 401 || this.status === 403;
    }
    
    isNotFound(): boolean {
    // 404: if the response doesn't exist
        return this.status === 404;
    }

    isServerError(): boolean {
    //5xx = backend is broken, it's not client's fault
    //>=500 catches the error above or equal to 500 etc.
        return this.status >= 500;
    }

    isConflict(): boolean {
    //409 = App's conflict when customers are tyna buy out of stock items.
    // We'll use "Sold Out" in UI
        return this.status === 409;
    }
}


