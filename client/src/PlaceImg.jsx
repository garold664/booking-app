import React from 'react';

export default function PlaceImg({
  place,
  index = 0,
  className = 'w-full h-full object-cover',
}) {
  if (!place?.photos?.length) return '';

  return (
    <img
      className={className}
      src={'http://localhost:4000/uploads/' + place.photos[index]}
    />
  );
}
