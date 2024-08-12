export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    quantity: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }