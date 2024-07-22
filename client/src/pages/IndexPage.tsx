import { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { PlaceType } from '../lib/types';
import { uploadsUrl } from '../baseUrl';

export default function IndexPage() {
  const [places, setPlaces] = useState<PlaceType[] | []>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    // console.log('loading places');
    axios
      .get('/places')
      .then((response) => {
        setPlaces([...response.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
    return () => {};
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6 mt-8">
      {!isLoading && error !== '' && <h1>{error}</h1>}
      {!isLoading && error === '' && places.length === 0 && <h1>No places</h1>}
      {isLoading && error === '' && places.length > 0 && (
        <h1 className="text-center">Loading...</h1>
      )}
      {!isLoading &&
        error === '' &&
        places.length > 0 &&
        places.map((place: PlaceType) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            {place.photos?.[0] && (
              <img
                className="rounded-2xl aspect-square object-cover mb-2"
                // src={`${baseUrl}/uploads/${place.photos[0]}`}
                src={`${uploadsUrl}/${place.photos[0]}`}
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
