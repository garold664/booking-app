import { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';

import { Link } from 'react-router-dom';
// import BookingDates from '../BookingDates';
import { type Booking } from '../lib/types';
import BookingDates from '../components/BookingDates';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    console.log(axios.defaults);
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
      // console.log('bookings', response.data);
    });
  }, []);
  return (
    <div className="container mx-auto">
      <AccountNav />
      {bookings?.length > 0 &&
        bookings.map((booking: Booking) => (
          <Link
            to={`/account/bookings/${booking._id}`}
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4 transition hover:scale-[1.01] hover:contrast-[1.1] text-black"
            key={booking.place._id}
          >
            <div className="w-48">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-3 pr-3 grow ">
              <h2 className="text-xl">{booking.place.title}</h2>
              <BookingDates
                booking={booking}
                className="mt-2 mb-2 py-2 border-t-4 border-gray-300 text-sm text-gray-500"
              />
              <div className="flex items-center gap-1 text-lg font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                  />
                </svg>
                Total Price: ${booking.price}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
