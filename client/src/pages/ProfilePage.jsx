import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

export default function ProfilePage() {
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

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // return <div>Account Page for {user?.name || ''}</div>;
  // return <div>Account Page for {user.name}</div>;
  return (
    <div>
      <AccountNav />
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
