import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../AddressLink';
import Popup from '../components/Popup';
import { useGalleryContext } from '../contexts/galleryContext';

export default function PlacePage() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const { setIsPopupShown: setShowAllPhotos } = useGalleryContext();
  console.log(useGalleryContext());

  const location = useLocation();

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

  return (
    <>
      <Popup place={place} gallery={PlaceGallery}>
        <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8 ">
          <div className="max-w-[1400px] m-auto">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} setShowAllPhotos={setShowAllPhotos} />

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
      </Popup>
    </>
  );
}
