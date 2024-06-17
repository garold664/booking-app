export type PlaceType = {
  owner: string;
  title: string;
  address: string;
  _id: string;
  price: number;
  photos: string[];
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  description: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type Booking = {
  _id: string;
  place: PlaceType;
  user: User;
  checkIn: Date;
  checkOut: Date;
  name: string;
  phone: string;
  price: number;
};
