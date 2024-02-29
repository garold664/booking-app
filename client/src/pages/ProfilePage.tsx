import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext.tsx';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage.tsx';
import AccountNav from '../components/AccountNav.tsx';

export default function ProfilePage() {
  let { subpage } = useParams();

  subpage = subpage ?? 'profile';
  const { ready, user, setUser } = useUserContext();

  const [redirect, setRedirect] = useState<string | null>(null);

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} {user?.email} <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
