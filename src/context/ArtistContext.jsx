import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {API_KEY} from '../utils';

// Context'e yukleniyor
const ArtistContext = createContext();

// Provider'a yukleniyor
const ArtistProvider = ({children}) => {
  //state'ler tutuluyor
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // api isteginin atildigi fonksiyon
  const getArtist = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'popular musics',
        type: 'artists',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.artists.items;
      //   console.log(data);
      setArtists(data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };
  // api isteginin baslamasina izin veriliyor
  useEffect(() => {
    getArtist();
  }, []);

  return (
    <ArtistContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistContext.Provider>
  );
};

export {ArtistProvider, ArtistContext};
