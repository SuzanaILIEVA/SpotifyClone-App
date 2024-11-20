import React from 'react';
import Routes from './src/navigation/Routes';
import {ArtistProvider} from './src/context/ArtistContext';
import {AlbumProvider} from './src/context/AlbumContext';
import {ProfileProvider} from './src/context/ProfileContext';
import {LikedSongProvider} from './src/context/LikedSongsContext';

const App = () => {
  return (
    <ProfileProvider>
      <ArtistProvider>
        <AlbumProvider>
          <Routes />
        </AlbumProvider>
      </ArtistProvider>
    </ProfileProvider>
  );
};

export default App;
