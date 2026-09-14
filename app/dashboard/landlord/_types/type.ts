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
export interface TenantInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface PropertyInfo {
  id: string;
  title: string;
  price: number | string;
  location: string;
  city: string;
}

export interface RentalRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED' | string;
  moveInDate: string;
  moveOutDate: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  propertyId: string;
  isPaid: boolean;
  paidAt: string | null;
  paymentId: string | null;
  tenant: TenantInfo;
  property: PropertyInfo;
}
