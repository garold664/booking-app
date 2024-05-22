import React from 'react';
import { useGalleryContext } from '../contexts/galleryContext';
import { PlaceType } from '../../../lib/types';
import baseUrl from '../baseUrl';

type PlaceGalleryProps = {
  place: PlaceType;
};

export default function PlaceGallery({ place }: PlaceGalleryProps) {
  const { setIsPopupShown: setShowAllPhotos } = useGalleryContext();
  const placePhoto = (index: number) => {
    if (!place.photos || place.photos.length === 0)
      return (
        <img
          className="object-cover aspect-square h-full cursor-pointer transition duration-300 hover:opacity-80"
          src="https://via.placeholder.com/600"
        />
      );
    return (
      place.photos?.[index] && (
        <img
          // className="object-cover w-full h-full"
          onClick={() => setShowAllPhotos(true)}
          className="object-cover aspect-square h-full cursor-pointer transition duration-300 hover:opacity-80"
          src={`${baseUrl}/uploads/${place.photos[index]}`}
        />
      )
    );
  };
  return (
    <div className="relative">
      <section className="grid gap-2 grid-cols-[2fr_1fr] grid-rows-2 rounded-3xl overflow-hidden">
        <div className="row-span-2">{placePhoto(0)}</div>
        <div className="">{placePhoto(1)}</div>
        <div className="">{placePhoto(2)}</div>
      </section>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex absolute bottom-2 right-2 py-2 px-4 rounded-xl border-2 border-black bg-white shadow-md shadow-gray-900 transition duration-300 hover:scale-105 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
