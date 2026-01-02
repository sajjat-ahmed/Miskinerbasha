
export enum GenderPreference {
  MALE = 'Male',
  FEMALE = 'Female',
  ANY = 'Any'
}

export enum RoomType {
  SINGLE = 'Single',
  SHARED = 'Shared'
}

export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  area: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  type: RoomType;
  gender: GenderPreference;
  amenities: string[];
  rules: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  isVerified: boolean;
  isAvailable: boolean;
  nearbyUniversities: {
    name: string;
    distance: string;
  }[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'owner';
  favorites: string[];
}
