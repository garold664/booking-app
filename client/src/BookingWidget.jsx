import React from 'react';

export default function BookingWidget({ place }) {
  return (
    <div>
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <div className="text-2xl text-center">
          <b>Price: </b> ${place.price} / per night
        </div>
        <div className="my-4 border p-2 rounded-2xl">
          <label>Check in:</label>
          <input type="date" />
        </div>
        <div className="my-4 border p-2 rounded-2xl">
          <label>Check out:</label>
          <input type="date" />
        </div>
        <div className="flex items-center justify-around my-4 border p-2 rounded-2xl">
          <label>Number of guests:</label>
          <input className="max-w-12" type="number" />
        </div>
        <button className="primary mt-4">Book this place</button>
      </div>
    </div>
  );
}
