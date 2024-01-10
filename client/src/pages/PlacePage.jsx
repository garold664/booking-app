import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import BookingWidget from '../BookingWidget';
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  //! 5:22

  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  const placePhoto = (index) => {
    return (
      place.photos[index] && (
        <img
          // className="object-cover w-full h-full"
          onClick={() => setShowAllPhotos(true)}
          className="object-cover aspect-square h-full"
          src={`http://localhost:4000/uploads/${place.photos[index]}`}
        />
      )
    );
  };

  if (!place) return;

  const allPhotos = (
    <Transition in={showAllPhotos} mountOnEnter unmountOnExit timeout={500}>
      {(state) => {
        const classNames =
          state === 'entering' || state === 'entered'
            ? 'absolute opacity-100 top-0'
            : 'fixed opacity-100 top-[100vh]';
        return (
          <div
            className={`fixed z-10 bg-blue-200 inset-0 bottom-auto min-h-screen  transition-all duration-500 ${classNames}`}
          >
            {/* <div className="fixed top-10 left-10">{state}</div> */}
            <div className="p-8 grid gap-4">
              <div>
                <h2 className="text-3xl">Photos of {place.title}</h2>
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
                  <div>
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
      }}
    </Transition>
  );
  //   //! 5:20
  // if (showAllPhotos) {
  // return allPhotos;
  // }

  return (
    <>
      {/* {showAllPhotos && allPhotos} */}
      {allPhotos}
      <Transition in={!showAllPhotos} mountOnEnter unmountOnExit timeout={900}>
        {(state) => {
          return (
            <div className="mt-4 bg-gray-200 -mx-8 px-8 pt-8">
              <h1 className="text-3xl">{place.title}</h1>
              <a
                className="flex gap-2 items-center font-semibold my-2 underline underline-offset-4"
                target="_blank"
                href={`https://maps.google.com/?q=${place}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                {place.address}
              </a>
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

              <div className="grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] my-8">
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
          );
        }}
      </Transition>
    </>
  );
}
