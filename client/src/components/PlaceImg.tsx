import { uploadsUrl } from '../baseUrl';
import { PlaceType } from '../lib/types';

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
      // src={`${baseUrl}/uploads/${place.photos[index]}`}
      src={`${uploadsUrl}${place.photos[index]}`}
    />
  );
}
