import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);
  if (!place) return;

  const placePhoto = (index) => {
    return (
      place.photos[index] && (
        <img
          // className="object-cover w-full h-full"
          className="object-cover aspect-square h-full"
          src={`http://localhost:4000/uploads/${place.photos[index]}`}
        />
      )
    );
  };

  return (
    <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="block font-semibold my-2 underline underline-offset-4"
        target="_blank"
        href={`https://maps.google.com/?q=${place}`}
      >
        {place.address}
        <section className="grid gap-2 grid-cols-[2fr_1fr] grid-rows-2">
          <div className="row-span-2">{placePhoto(0)}</div>
          <div className="">{placePhoto(1)}</div>
          <div className="">{placePhoto(2)}</div>
        </section>
      </a>
    </div>
  );
}
