import React, { useEffect, useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';

export default function PlacesFormPage() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState(14);
  const [checkOut, setCheckOut] = useState(11);
  const [maxGuests, setMaxGuests] = useState(1);

  const [price, setPrice] = useState(100);

  const [redirect, setRedirect] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckOut(data.checkOut);
      setCheckIn(data.checkIn);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function savePlace(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const placeDate = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      await axios.put('/places', { id, ...placeDate });
      setRedirect('/account/places');
    } else {
      await axios.post('/places', placeDate);
      setRedirect('/account/places');
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="container mx-auto">
      <AccountNav />
      <form onSubmit={savePlace}>
        <label className="text-2xl block mt-4">Title</label>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label className="text-2xl block mt-4">Address</label>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        <label className="text-2xl block mt-4">Description</label>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <label className="text-2xl block mt-4">Perks</label>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        <label className="text-2xl block mt-4">Extra info</label>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        <label className="text-2xl block mt-4">Check in & out times</label>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label className="block mt-2">Check in time</label>
            <input
              type="number"
              placeholder="14:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(+ev.target.value)}
            />
          </div>
          <div>
            <label className="block mt-2">Check out time</label>
            <input
              type="number"
              placeholder="11:00"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <label className="block mt-2">Max number of guests</label>
            <input
              type="number"
              placeholder="2"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(+ev.target.value)}
            />
          </div>
          <div>
            <label className="block mt-2">Price per night</label>
            <input
              type="number"
              placeholder="100"
              value={price}
              onChange={(ev) => setPrice(+ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
