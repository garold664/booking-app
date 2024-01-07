import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
export default function AccountNav() {
  //! 3:59

  const { pathname } = useLocation();
  // console.log(pathname);
  let subpage = pathname.split('/')?.[2];
  // console.log(subpage);

  // if (subpage === undefined) {
  //   subpage = 'profile';
  // }
  subpage = subpage ?? 'profile';

  const isActive = pathname === 'account' && type === 'profile';

  // 1:59
  function linkClasses(type = null) {
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
