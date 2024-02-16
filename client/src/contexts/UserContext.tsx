import axios from 'axios';
import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { User } from '../../../lib/types';

export const UserContext = createContext({});

type UserContextProviderProps = {
  children: React.ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      // React.Strict mode is on
      //StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).
      // console.log('use effect');
      // axios.get('/profile ');
      axios.get('/profile').then(({ data }: { data: User }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
