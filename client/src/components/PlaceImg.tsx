import React from 'react';
import { type PlaceType } from '../../../lib/types';
import baseUrl from '../baseUrl';

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
      src={`${baseUrl}/uploads/${place.photos[index]}`}
    />
  );
}
