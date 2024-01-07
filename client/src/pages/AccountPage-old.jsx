import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';

export default function AccountPage() {
  let { subpage } = useParams();

  // 1:57:30

  subpage = subpage ?? 'profile';
  // console.log(subpage);
  const { ready, user, setUser } = useContext(UserContext);

  const [redirect, setRedirect] = useState(null);

  // 2:04
  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  // if (ready && !user) {
  //! 2:08
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  // 1:59

  function linkClasses(type = null) {
    return type === subpage
      ? 'py-2 px-6 bg-primary text-white rounded-full'
      : 'py-2 px-6';
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // return <div>Account Page for {user?.name || ''}</div>;
  // return <div>Account Page for {user.name}</div>;
  return (
    <div>
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
      {/* 2:03 */}
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} {user.email} <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {
        //! 2:14
        subpage === 'places' && <PlacesPage />
      }
    </div>
  );
}
