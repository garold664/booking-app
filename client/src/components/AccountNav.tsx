import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];

  subpage = subpage ?? 'profile';
  // const isActive = pathname === 'account' && type === 'profile';

  function linkClasses(type: null | string = null) {
    return type === subpage
      ? 'py-2 px-6 bg-primary text-white rounded-full'
      : 'py-2 px-6';
  }
  return (
    <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
      <Link className={linkClasses('profile')} to={'/account'}>
        My profile
      </Link>
      <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        My bookings
      </Link>
      <Link className={linkClasses('places')} to={'/account/places'}>
        My accomodations
      </Link>
    </nav>
  );
}
