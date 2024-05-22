import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PlaceType } from '../../../lib/types';
import baseUrl from '../baseUrl';

export default function IndexPage() {
  const [places, setPlaces] = useState<PlaceType[] | []>([]);

  useEffect(() => {
    axios.get('/places').then((response) => {
      setPlaces([...response.data]);
    });
    return () => {};
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6 mt-8">
      {places.length > 0 &&
        places.map((place: PlaceType) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            {place.photos?.[0] && (
              <img
                className="rounded-2xl aspect-square object-cover mb-2"
                src={`${baseUrl}/uploads/${place.photos[0]}`}
                alt=""
              />
            )}
            <h2 className="font-bold leading-4">{place.address}</h2>
            <h3 className="text-sm truncate leading-4 text-gray-500">
              {place.title}
            </h3>
            <div className="mt-2">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
