
import { Room, RoomType, GenderPreference } from './types';

export const AREAS = ['Dhanmondi', 'Mirpur', 'Uttara', 'Mohammadpur', 'Banani', 'Farmgate', 'Badda'];

export const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    title: 'Spacious Single Room near UIU',
    description: 'Looking for a decent bachelor for a single room in a 3-bedroom flat. Large window, airy atmosphere.',
    price: 6500,
    area: 'Dhanmondi',
    location: {
      lat: 23.7509,
      lng: 90.3733,
      address: 'Road 15, Dhanmondi, Dhaka'
    },
    type: RoomType.SINGLE,
    gender: GenderPreference.MALE,
    amenities: ['WiFi', 'Generator', 'Attached Bathroom', 'Lift'],
    rules: ['No Smoking', 'Bachelor Allowed', 'Guest Allowed'],
    images: ['https://picsum.photos/id/10/800/600', 'https://picsum.photos/id/11/800/600'],
    ownerId: 'owner1',
    ownerName: 'Mr. Rahim',
    isVerified: true,
    isAvailable: true,
    nearbyUniversities: [
      { name: 'UIU', distance: '0.5 km' },
      { name: 'Daffodil', distance: '1.2 km' }
    ],
    createdAt: '2023-10-01'
  },
  {
    id: '2',
    title: 'Shared Room for Female Students',
    description: 'Shared room for one person. Very close to Brac University. Peaceful environment for studies.',
    price: 4500,
    area: 'Mohakhali',
    location: {
      lat: 23.7776,
      lng: 90.4005,
      address: 'Wireless Gate, Mohakhali'
    },
    type: RoomType.SHARED,
    gender: GenderPreference.FEMALE,
    amenities: ['WiFi', 'Kitchen Access', 'Laundry'],
    rules: ['Female Only', 'No Late Night Entry', 'Student Only'],
    images: ['https://picsum.photos/id/12/800/600', 'https://picsum.photos/id/13/800/600'],
    ownerId: 'owner2',
    ownerName: 'Mrs. Begum',
    isVerified: true,
    isAvailable: true,
    nearbyUniversities: [
      { name: 'Brac University', distance: '0.3 km' },
      { name: 'AIUB', distance: '2.5 km' }
    ],
    createdAt: '2023-10-05'
  },
  {
    id: '3',
    title: 'Budget Friendly Seat in Mirpur-10',
    description: 'Cheap seat available for students. All utilities included. 5 mins walk from Metro Station.',
    price: 3500,
    area: 'Mirpur',
    location: {
      lat: 23.8069,
      lng: 90.3687,
      address: 'Senpara Parbata, Mirpur-10'
    },
    type: RoomType.SHARED,
    gender: GenderPreference.MALE,
    amenities: ['WiFi', 'Gas', 'Electricity'],
    rules: ['Bachelor Allowed', 'Shared Bathroom'],
    images: ['https://picsum.photos/id/14/800/600'],
    ownerId: 'owner3',
    ownerName: 'Tanvir Hossain',
    isVerified: false,
    isAvailable: true,
    nearbyUniversities: [
      { name: 'BUP', distance: '3.0 km' },
      { name: 'MIST', distance: '3.5 km' }
    ],
    createdAt: '2023-10-10'
  },
  {
    id: '4',
    title: 'Luxury Studio Sublet in Banani',
    description: 'Modern studio apartment for a single working student or professional. High-end amenities.',
    price: 15000,
    area: 'Banani',
    location: {
      lat: 23.7937,
      lng: 90.4066,
      address: 'Road 11, Banani'
    },
    type: RoomType.SINGLE,
    gender: GenderPreference.ANY,
    amenities: ['WiFi', 'AC', 'Attached Bathroom', 'Lift', 'Gym Access'],
    rules: ['Quiet Hours', 'No Parties'],
    images: ['https://picsum.photos/id/20/800/600', 'https://picsum.photos/id/21/800/600'],
    ownerId: 'owner4',
    ownerName: 'Sofia Khan',
    isVerified: true,
    isAvailable: true,
    nearbyUniversities: [
      { name: 'North South University', distance: '4.0 km' },
      { name: 'IUB', distance: '4.2 km' }
    ],
    createdAt: '2023-10-12'
  }
];
