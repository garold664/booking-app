import { createContext, useContext, useState } from 'react';

export const galleryContext = createContext({});

export function useGalleryContext() {
  const value = useContext(galleryContext);
  if (value == null)
    throw Error('Cannot use outside of GalleryContextProvider');
  return value;
}

export default function GalleryContextProvider({ children }) {
  const [isPopupShown, setIsPopupShown] = useState(false);
  return (
    <galleryContext.Provider value={{ isPopupShown, setIsPopupShown }}>
      {children}
    </galleryContext.Provider>
  );
}
