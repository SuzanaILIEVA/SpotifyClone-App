import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ArtistCard = ({artist}) => {
  return (
    <TouchableOpacity>
      <View style={styles.artistContainer}>
        <Image
          source={
            artist.data.visuals.avatarImage?.sources[0].url
              ? {uri: artist.data.visuals.avatarImage?.sources[0].url}
              : require('../assets/images/imagesong.jpg')
          }
          style={styles.artistImage}
        />
        <Text numberOfLines={1} style={styles.artistName}>
          {artist.data.profile.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  artistContainer: {
    margin: 10,
    width: 100,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});
