import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext.tsx';
import { PlaceType } from '../../../lib/types.ts';

type BookingWidgetProps = {
  place: PlaceType;
};
export default function BookingWidget({ place }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [redirect, setRedirect] = useState('');

  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const data = {
      place: place._id,
      checkIn,
      checkOut,
      maxGuests,
      name,
      phone,
      price: numberOfNights * place.price,
    };
    const response = await axios.post('/bookings', data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <div className="text-2xl text-center">
          <b>Price: </b> ${place.price} / per night
        </div>
        <div className="flex justify-between my-4 border p-2 rounded-2xl">
          <label>Check in:</label>
          <input
            type="date"
            onChange={(ev) => setCheckIn(ev.target.value)}
            value={checkIn}
          />
        </div>
        <div className="flex justify-between my-4 border p-2 rounded-2xl">
          <label>Check out:</label>
          <input
            type="date"
            onChange={(ev) => setCheckOut(ev.target.value)}
            value={checkOut}
          />
        </div>
        <div className="flex items-center justify-around my-4 border p-2 rounded-2xl">
          <label>Number of guests:</label>
          <input
            className="max-w-12"
            onChange={(ev) => setMaxGuests(ev.target.value)}
            min="1"
            max="2"
            value={maxGuests}
            type="number"
          />
        </div>
        {numberOfNights > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-around my-4 border-t-2 border-gray-200 -mx-4 p-2">
              <label>Your full name</label>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />

              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="+700000000"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          </>
        )}
        <button className="primary mt-4" onClick={bookThisPlace}>
          Book this place
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
}
