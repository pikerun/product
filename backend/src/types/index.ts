export interface Sweet {
  sweetId: string;   
  sweetName: string; 
  price: number;     
  type: string;      
}

export interface Store {
  storeId: string;
  storeName: string;
  address: string;
  phoneNumber: string;
  openingHours: string;
  eatIn: boolean;
  takeOut: boolean;
  sweets: Sweet[]; // 
}