import React from 'react';
import { createContext, useContext, useState } from 'react';

type GalleryContextType = {
  isPopupShown: boolean;
  setIsPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
};

type GalleryContextProps = {
  children: React.ReactNode;
};

export const GalleryContext = createContext<GalleryContextType | null>(null);

export function useGalleryContext() {
  const value = useContext(GalleryContext);
  if (value == null)
    throw Error('Cannot use outside of GalleryContextProvider');
  return value;
}

export default function GalleryContextProvider({
  children,
}: GalleryContextProps) {
  const [isPopupShown, setIsPopupShown] = useState(false);
  return (
    <GalleryContext.Provider value={{ isPopupShown, setIsPopupShown }}>
      {children}
    </GalleryContext.Provider>
  );
}
