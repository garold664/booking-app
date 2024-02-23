import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('your@email.com');
  const [password, setPassword] = useState('123');

  async function registerUser(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });

      alert('Registration successful. Now you can log in');
    } catch (err) {
      alert('Registration failed. Please try again later');
    }
  }
  return (
    <div className="mt-4 grow flex flex-col justify-center">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser}>
        <input
          type="text"
          placeholder={'John Doe'}
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
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
          defaultValue="3"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{' '}
          <Link to={'/login'} className="underline text-black font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
