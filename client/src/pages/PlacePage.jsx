import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../AddressLink';
export default function PlacePage() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);

  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (!id) return;
    if (location.pathname.includes('/account/bookings/')) {
      axios.get(`/bookings/${id}`).then((res) => {
        setPlace(res.data);
        console.log(res.data);
      });
    } else
      axios.get(`/places/${id}`).then((res) => {
        setPlace(res.data);
      });
  }, [id]);

  if (!place) return;

  const allPhotos = (classNames) => (
    <div
      className={`fixed z-10 bg-blue-200 inset-0 bottom-auto min-h-screen   transition-all duration-500 ${classNames}`}
    >
      {/* <div className="fixed top-10 left-10">{state}</div> */}
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

  return (
    <>
      {/* {showAllPhotos && allPhotos} */}
      <Transition in={showAllPhotos} mountOnEnter unmountOnExit timeout={500}>
        {(state) => {
          const classNames =
            state === 'entering' || state === 'entered'
              ? 'absolute opacity-100 top-0'
              : 'fixed opacity-100 top-[100vh]';
          return allPhotos(classNames);
        }}
      </Transition>
      <Transition in={!showAllPhotos} mountOnEnter unmountOnExit timeout={900}>
        {(state) => {
          return (
            <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8 ">
              <div className="max-w-[1400px] m-auto">
                <h1 className="text-3xl">{place.title}</h1>
                <AddressLink>{place.address}</AddressLink>
                <PlaceGallery
                  place={place}
                  setShowAllPhotos={setShowAllPhotos}
                />

                <div className="grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] my-8 ">
                  <div>
                    <h2 className="my-4 font-bold text-2xl">Description</h2>
                    {place.description}
                    <b>Check in:</b> {place.checkIn}
                    <br />
                    <b>Check out:</b> {place.checkOut}
                    <br />
                    <b>Max number of guests: </b> {place.maxGuests}
                  </div>
                  <BookingWidget place={place} />
                </div>
                <div className="text-sm text-gray-700 leading-4 -mx-8 px-8 py-8 border-gray-300 border-t bg-white">
                  <h2 className="my-4 font-bold text-2xl">Extra Info</h2>
                  {place.extraInfo}
                </div>
              </div>
            </div>
          );
        }}
      </Transition>
    </>
  );
}
