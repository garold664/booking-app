import axios from 'axios';
import React, { useContext } from 'react';
import { createContext, useEffect, useState } from 'react';
import { type User } from '../../../lib/types';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  ready: boolean;
};
export const UserContext = createContext<UserContextType | null>(null);

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
