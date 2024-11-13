import React from 'react';
import Routes from './src/navigation/Routes';
import {ArtistProvider} from './src/context/ArtistContext';
import {AlbumProvider} from './src/context/AlbumContext';

const App = () => {
  return (
    <ArtistProvider>
      <AlbumProvider>
        <Routes />
      </AlbumProvider>
    </ArtistProvider>
  );
};

export default App;
