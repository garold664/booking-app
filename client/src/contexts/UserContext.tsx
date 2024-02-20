import axios from 'axios';
import React, { useContext } from 'react';
import { createContext, useEffect, useState } from 'react';
import { type User } from '../../../lib/types';

export const UserContext = createContext({});

type UserContextProviderProps = {
  children: React.ReactNode;
};

export function useUserContext() {
  const value = useContext(UserContext);
  if (value == null) throw Error('Cannot use outside of UserContextProvider');
  return value;
}
export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
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
