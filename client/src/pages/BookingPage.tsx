import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';
import GalleryPopup from '../components/GalleryPopup';

import { type Booking } from '../../../lib/types';

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  console.log('booking', booking);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(
          ({ _id }: { _id: string }) => _id === id
        );
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) return '';

  return (
    <GalleryPopup place={booking.place}>
      <div className="max-w-[1400px] m-auto">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <AddressLink className="my-2 text-blue-500">
          {booking.place.address}
        </AddressLink>
        <div className="flex justify-between items-center bg-gray-200 p-4 mb-4 rounded-xl">
          <div>
            <h2 className="text-2xl mb-4">Your booking information:</h2>
            <BookingDates booking={booking} />
          </div>
          <div className="bg-primary p-5 rounded-md text-white">
            <h3>Total price:</h3>
            <div className="text-3xl">
              <b>$</b>
              {booking.price}
            </div>
          </div>
        </div>
        <PlaceGallery place={booking.place} />
      </div>
    </GalleryPopup>
  );
}
