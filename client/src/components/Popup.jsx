import React, { Children, cloneElement, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import AddressLink from '../AddressLink';
import PlaceGallery from './PlaceGallery';
import BookingWidget from '../BookingWidget';
import { useGalleryContext } from '../contexts/galleryContext';

const showGallery = (classNames, setShowAllPhotos, place) => {
  return (
    <div
      className={`fixed z-10 bg-blue-200 inset-0 bottom-auto min-h-screen   transition-all duration-500 ${classNames}`}
    >
      <div className="p-8 grid gap-4 max-w-[1400px] m-auto">
        <div>
          <h2 className="text-3xl pr-48">Photos of {place.title}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed right-2 top-2 flex gap-1 p-2 rounded-md bg-gray-200 shadow-lg shadow-gray-900 duration-150 hover:shadow-md hover:shadow-gray-700"
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Close photos
          </button>
        </div>
        )
        {place?.photos?.length > 0 &&
          place.photos.map((photo) => (
            <div key={photo}>
              <img
                className="object-cover aspect-square w-full"
                src={`http://localhost:4000/uploads/${photo}`}
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default function Popup({ children, gallery, place }) {
  // const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { isPopupShown: showAllPhotos, setIsPopupShown: setShowAllPhotos } =
    useGalleryContext();
  console.log('setIsPopupShown: ', showAllPhotos);
  return (
    <>
      <Transition in={showAllPhotos} mountOnEnter unmountOnExit timeout={500}>
        {(state) => {
          console.log('state', state);
          const classNames =
            state === 'entering' || state === 'entered'
              ? 'absolute opacity-100 top-0'
              : 'fixed opacity-100 top-[100vh]';

          return showGallery(classNames, setShowAllPhotos, place);
        }}
      </Transition>
      <Transition in={!showAllPhotos} mountOnEnter unmountOnExit timeout={900}>
        {(state) => {
          console.log('state: ', state);
          return children;
        }}
      </Transition>
    </>
  );
}
