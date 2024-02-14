import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

export default function Popup({ children, popupContent }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  return (
    <>
      <Transition in={showAllPhotos} mountOnEnter unmountOnExit timeout={500}>
        {(state) => {
          const classNames =
            state === 'entering' || state === 'entered'
              ? 'absolute opacity-100 top-0'
              : 'fixed opacity-100 top-[100vh]';
          return popupContent;
        }}
      </Transition>
      <Transition in={!showAllPhotos} mountOnEnter unmountOnExit timeout={900}>
        {(state) => {
          return children;
        }}
      </Transition>
    </>
  );
}
