import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function AlbumCard({album}) {
  //   console.log('Album=>', album);

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Info', {album})}>
      <View style={styles.albumContainer}>
        <Image
          source={{uri: album?.data?.coverArt?.sources[0].url}}
          style={styles.albumImg}
        />

        <Text numberOfLines={1} style={styles.albumTitle}>
          {album.data.name}
        </Text>

        <Text numberOfLines={1} style={styles.albumTitle}>
          {album.data.artists.items[0].profile.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  albumContainer: {
    margin: 10,
    width: 100,
  },
  albumImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#F1F1F1',
    resizeMode: 'cover',
  },
  albumTitle: {
    color: '#fff',
    textAlign: 'center',
  },
});
