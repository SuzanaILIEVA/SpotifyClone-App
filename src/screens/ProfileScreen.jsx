import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ProfileContext} from '../context/ProfileContext';
import LinearGradient from 'react-native-linear-gradient';
import round from 'lodash/round';

const ProfileScreen = () => {
  const {profilData, loading, error} = useContext(ProfileContext);

  const {name, image_url, followers_count, public_playlists} = profilData;

  const convertSpotifyImageUriToUrl = spotifyImageUri => {
    const imageId = spotifyImageUri.split(':').pop();
    return `https://i.scdn.co/image/${imageId}`;
  };

  const formatFollowers = count => {
    if (count >= 10000000) {
      return `${round(count / 1000000, 1)}M`;
    }

    if (count >= 1000) {
      return `${round(count / 1000, 1)}K`;
    }
  };

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={{marginTop: 10}}>
        <View
          style={{
            padding: 15,
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
          }}>
          <Image source={{uri: image_url}} style={styles.profileImage} />

          <View>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileFolowers}>
              {formatFollowers(followers_count)} followers
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontWeight: '500',
            marginHorizontal: 15,
          }}>
          Your Playlist
        </Text>

        <View style={styles.playListContainer}>
          {public_playlists.map((playlist, i) => (
            <View key={i} style={styles.playlistRow}>
              <Image
                source={{uri: convertSpotifyImageUriToUrl(playlist.image_url)}}
                style={styles.playlistImage}
              />
              <View>
                <Text style={styles.playlistTitle}>{playlist.name}</Text>
                <Text style={styles.playlistCount}>
                  {formatFollowers(playlist.followers_count)} followers
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 0.9,
    marginBottom: 10,
    resizeMode: 'cober',
  },
  profileName: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 25,
  },
  profileFolowers: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'semibold',
  },
  playListContainer: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  playlistImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  playlistRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  playlistTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    flexWrap: 'wrap',
    marginHorizontal: 10,
    maxWidth: 240,
  },
  playlistCount: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
