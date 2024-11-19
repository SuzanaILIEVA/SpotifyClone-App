import {createContext, useEffect, useState} from 'react';
import {API_KEY} from '../utils';
import axios from 'axios';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profilData, setProfilData] = useState(null);

  const getProfileData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      setProfilData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={{profilData, loading, error}}>
      {children}
    </ProfileContext.Provider>
  );
};
