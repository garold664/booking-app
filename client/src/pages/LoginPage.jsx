import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext.tsx';

export default function LoginPage() {
  const [email, setEmail] = useState('your@email.com');
  const [password, setPassword] = useState('123');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useUserContext();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      //! 1:23:30 withCredentials
      //! 1:24:20 but lets make it default in App.jsx
      const { data } = await axios.post(
        '/login',
        {
          email,
          password,
        }
        // { withCredentials: true }
      );
      //! 1:33
      // console.log(response);
      setUser(data);
      alert('Login success!');
      setRedirect(true);
    } catch (err) {
      console.error('Login failed: ', err.message);
    }
  }
  //! 1:28:00
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
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{' '}
          <Link to={'/register'} className="underline text-black font-semibold">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
}
