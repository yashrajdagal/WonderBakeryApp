// Type is like a label alias to describe the behaviour and the shape of data. Such as its properties and methods.
export type ProductCategory = 
    | 'Bread'
    | 'Viennoiserie'
    | 'Pastry'
    | 'Kitchen';

// Interface is strictly for defining object shapes and can be extended with new properties later. While type is a versatile alias that can represent objects, union, primitives, and tuples. But cannot be changed once created.

export interface product {

// --Identification--
 id: string;
 bcItemNo?: string;

 // -- User-facing fields --

 
}

