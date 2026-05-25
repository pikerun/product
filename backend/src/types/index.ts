export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Sweet {
  id: string;
  shopId: string;    
  sweetName: string;
  shopName: string; 
  category: string;
  price: number;
  description: string;
  tags: string[];
  imageUrl: string;
  coordinates: Coordinates;
}

export interface Store {
  
}
