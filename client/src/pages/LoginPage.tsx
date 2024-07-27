import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext.tsx';
import Spinner from '../ui/spinner.tsx';

export default function LoginPage() {
  const [email, setEmail] = useState('test@email.com');
  const [password, setPassword] = useState('test');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();

  async function handleLoginSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });

      setUser(data);
      alert('Login success!');
      setRedirect(true);
      setIsLoading(false);
    } catch (err: any | { message: string }) {
      setError(err.message);
      setIsLoading(false);
      // alert('Login failed: ' + err.message);
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex flex-col justify-center">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
        <input
          type="email"
          placeholder={'your@email.com'}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder={'password'}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          // className={isLoading ? 'primary-disabled' : 'primary'}
          className={'primary'}
          disabled={isLoading && !error}
        >
          {isLoading && !error ? (
            <span className="flex gap-2 justify-center">
              Loading... <Spinner />
            </span>
          ) : (
            'Login'
          )}
        </button>
        {error && <p className="text-red-600 font-bold">{error}</p>}
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{' '}
          <Link to={'/register'} className="underline text-black font-semibold">
            Register now
          </Link>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
