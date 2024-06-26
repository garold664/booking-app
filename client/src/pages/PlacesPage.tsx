import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';
import { type PlaceType } from '../lib/types';
// console.log(Perks);
export default function PlacesPage() {
  const [places, setPlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <AccountNav />

      <div className="text-center">
        <br />
        <Link
          className="button bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1"
          to={'/account/places/new'}
        >
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={`/account/places/${place._id}`}
              className="flex items-center bg-gray-100 gap-4 p-2 rounded-2xl my-4 shadow-md hover:scale-[1.01] hover:shadow-sm transition"
            >
              <div className="shrink-0 w-32 h-32 bg-gray-300 rounded-xl overflow-hidden">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
