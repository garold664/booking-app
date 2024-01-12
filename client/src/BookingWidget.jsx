import React, { useState } from 'react';
//! 5:53

import { differenceInCalendarDays } from 'date-fns';

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
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
                onClick={(ev) => setName(ev.target.value)}
              />

              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="+700000000"
                value={mobile}
                onClick={(ev) => setMobile(ev.target.value)}
              />
            </div>
          </>
        )}
        <button className="primary mt-4">
          Book this place
          {/* //! 5:53 */}
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
}
