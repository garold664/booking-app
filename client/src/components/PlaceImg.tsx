import React from 'react';
import { type PlaceType } from '../../../lib/types';

type PlaceImgProps = {
  place: PlaceType;
  index?: number;
  className?: string;
};

export default function PlaceImg({
  place,
  index = 0,
  className = 'w-full h-full object-cover',
}: PlaceImgProps) {
  if (!place?.photos?.length) return '';

  return (
    <img
      className={className}
      src={'http://localhost:4000/uploads/' + place.photos[index]}
    />
  );
}
