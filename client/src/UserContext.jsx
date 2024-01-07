//! 1:29:00

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  //! 1:51:

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      //! 1:38:00
      // React.Strict mode is on
      //StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).
      // console.log('use effect');
      // axios.get('/profile ');
      //!1:43:00
      axios.get('/profile').then(({ data }) => {
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
