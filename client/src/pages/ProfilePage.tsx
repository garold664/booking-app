import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext.tsx';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage.tsx';
import AccountNav from '../components/AccountNav.tsx';
import Spinner from '../ui/Spinner.tsx';

export default function ProfilePage() {
  let { subpage } = useParams();

  subpage = subpage ?? 'profile';
  const { ready, user, setUser } = useUserContext();

  const [redirect, setRedirect] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    try {
      setIsLoading(true);
      await axios.post('/logout');
      setIsLoading(false);
      setRedirect('/');
      setUser(null);
    } catch (error) {
      setError('Logout failed. Try again later.');
    }
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
        <div className="text-center max-w-md mx-auto">
          <p className="my-6">
            Logged in as <b>{user?.name}</b> ({user?.email})
          </p>
          <button
            onClick={logout}
            // className={isLoading && !error ? 'primary-disabled' : 'primary'}
            className={'primary'}
            disabled={isLoading && !error}
          >
            {isLoading && !error ? (
              <span className="flex gap-2 justify-center">
                Loading... <Spinner />
              </span>
            ) : (
              'Logout'
            )}
          </button>
          {error && <p className="text-red-600 font-bold">{error}</p>}
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
