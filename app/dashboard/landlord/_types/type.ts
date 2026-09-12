export type PropertyType = 'HOUSE' | 'APARTMENT' | 'STUDIO' | 'CONDO' | 'VILLA' |'DUPLEX' | 'PENTHOUSE' |string;
export type PropertyStatus = 'AVAILABLE' | 'RENTED' | string;
  
export type Property = {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: string; 
  location: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  amenities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  landlordId: string;
  categoryId: string;
};

