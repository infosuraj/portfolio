// context/ProfileContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchProfile } from '../utils/fetchProfile';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then(data => setProfile(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);