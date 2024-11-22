import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from '../utils';
import axios from 'axios';

import TrackPlayer, {Capability, useProgress} from 'react-native-track-player';
import Modal from 'react-native-modal';

const LikedSongScreen = () => {
  const [searchText, setSearchText] = useState('alan walker');
  const [searchedTracks, setSearchTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation();
  const progress = useProgress();

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'en-US',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data.tracks.hits);

      setSearchTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const setupPlayer = async () => {
    try {
      //oynaticiyi baslatmak icin gerekli olan yapilandirma yapildi
      await TrackPlayer.setupPlayer();

      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      });
    } catch (error) {
      console.log('ERROR setting up player', error);
    }
  };

  //**guncel handleplay */

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri,
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData); // Seçilen şarkıyı ekle
      await TrackPlayer.add(
        searchedTracks.map(item => ({
          id: item.track.key,
          url: item.track.hub.actions.find(action => action.type === 'uri').uri,
          title: item.track.title,
          artist: item.track.subtitle,
          artwork: item.track.images.coverart,
        })),
      );
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log('Şarkıyı oynatırken hata:', error);
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secondsleft = Math.floor(seconds % 60);

    return `${minutes} : ${secondsleft < 10 ? '0' : ' '}${secondsleft}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      //muzik oynatiliyor ise durdur
      await TrackPlayer.pause();
    } else {
      //muzik duruyorsa oynat
      await TrackPlayer.play();
    }
    //ispalying degerini butona basildiginda tam tersi degerine cevirir
    setIsPlaying(!isPlaying);
  };

  //muzigi 10sn geri aldik
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  //muzigi 10sn ileri aldik
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

  /*********** */

  //*playPreviousTrack
  const playPreviousTrack = async () => {
    try {
      const currentTrackIndex = await TrackPlayer.getCurrentTrack(); // Mevcut çalan parçanın indeksini al
      const queue = await TrackPlayer.getQueue();
      if (currentTrackIndex > 0) {
        await TrackPlayer.skipToPrevious(); // Önceki parçaya geç
        const previousTrack = queue[currentTrackIndex - 1]; // Kuyrukta önceki parça
        setSelectedTrack({
          title: previousTrack.title,
          subtitle: previousTrack.artist,
          images: {coverart: previousTrack.artwork},
        }); // Yeni şarkının bilgilerini güncelle
      } else {
        console.log('Kuyruğun başındasınız.');
      }
    } catch (error) {
      console.error('Önceki parçaya geçişte bir hata oluştu:', error);
    }
  };

  //*playNextTrack
  const playNextTrack = async () => {
    try {
      const currentTrackIndex = await TrackPlayer.getCurrentTrack();
      const queue = await TrackPlayer.getQueue();

      if (currentTrackIndex < queue.length - 1) {
        await TrackPlayer.skipToNext();
        const nextTrack = queue[currentTrackIndex + 1]; // Kuyrukta sıradaki parça
        setSelectedTrack({
          title: nextTrack.title,
          subtitle: nextTrack.artist,
          images: {coverart: nextTrack.artwork},
        }); // Yeni şarkının bilgilerini güncelle
      }
    } catch (error) {
      console.error('Sonraki şarkıya geçişte bir hata oluştu:', error);
    }
  };

  //*sarkilari kuyruya ekle
  const addTracksToQueue = async () => {
    const formattedTracks = searchedTracks.map((item, index) => ({
      id: `${item.track.key}-${index}`,
      url: item.track.hub.actions.find(action => action.type === 'uri').uri,
      title: item.track.title,
      artist: item.track.subtitle,
      artwork: item.track.images.coverart,
    }));

    try {
      await TrackPlayer.add(formattedTracks); // Şarkıları kuyruğa ekle
      console.log('Şarkılar kuyruğa eklendi:', formattedTracks);
    } catch (error) {
      console.error('Kuyruğa şarkı eklerken hata oluştu:', error);
    }
  };

  const toggleLike = () => {
    setSelectedTrack({
      ...selectedTrack,
      isLiked: !selectedTrack.isLiked,
    });
  };

  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, [searchText]);

  return (
    <>
      <LinearGradient
        colors={['#040306', '#09381a', '#21bc5a']}
        style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 20}}>
          {/* search area */}
          <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
            <Pressable onPress={() => navigation.goBack()}>
              <Feather
                name="arrow-left-circle"
                size={40}
                color="white"
                style={{marginLeft: 10}}
              />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: '#0000',

                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 30,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <FontAwesome name="search" size={24} color={'white'} />
              <TextInput
                placeholder="Find in Liked Song"
                placeholderTextColor={'white'}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                value={searchText}
                style={{
                  width: '70%',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 17,
                  paddingHorizontal: 10,
                }}
              />
            </Pressable>
          </View>

          {/* songs title section */}
          <View style={{marginHorizontal: 10, marginVertical: 15}}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              Search Songs
            </Text>
            <Text style={{fontSize: 18, color: 'white', marginTop: 5}}>
              5 Songs
            </Text>
          </View>

          {/* songs list */}
          <View>
            {loading ? (
              <ActivityIndicator size={80} color={'white'} />
            ) : (
              <FlatList
                data={searchedTracks}
                keyExtractor={item => item.track.key}
                renderItem={({item}) => (
                  <Pressable onPress={() => handlePlay(item)}>
                    <View style={styles.trackContainer}>
                      <Image
                        source={{uri: item.track.images.coverart}}
                        style={styles.albumCover}
                      />

                      <View style={{flex: 1}}>
                        <Text style={styles.trackTitle}>
                          {item.track.title}
                        </Text>
                        <Text style={styles.trackSubtitle}>
                          {item.track.subtitle}
                        </Text>
                      </View>

                      <Entypo
                        name="controller-play"
                        size={30}
                        color={'white'}
                      />
                    </View>
                  </Pressable>
                )}
              />
            )}
          </View>
        </View>
      </LinearGradient>

      {/* modal  */}

      <Modal
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection={'down'}
        onSwipeComplete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <LinearGradient
          colors={['#21bc5a', '#040306', '#09381a']}
          style={styles.modalcontainer}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Entypo name="chevron-down" size={30} color={'white'} />
              </TouchableOpacity>

              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Songs
              </Text>
              <Entypo name="dots-three-vertical" size={30} color={'white'} />
            </View>
            <View style={{padding: 10}}>
              <Image
                source={{uri: selectedTrack?.images?.coverart}}
                style={styles.modalImage}
              />

              {/* song titles */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 10,
                    }}>
                    {selectedTrack?.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'gray',
                      fontSize: 18,
                      fontWeight: '500',
                      padding: 10,
                    }}>
                    {selectedTrack?.subtitle}
                  </Text>
                </View>
                <Pressable onPress={toggleLike}>
                  <FontAwesome
                    name="heart"
                    size={30}
                    color={selectedTrack?.isLiked ? 'red' : 'white'}
                  />
                </Pressable>
              </View>

              {/* progressbar */}
              <View style={{marginTop: 10}}>
                <View
                  style={{
                    width: '100%',
                    marginTop: 20,
                    height: 3,
                    backgroundColor: 'gray',
                    borderRadius: 5,
                  }}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${
                          (progress.position / progress.duration) * 100
                        }%`,
                      },
                    ]}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      top: -5,
                      width: 10,
                      height: 10,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      left: `${(progress.position / progress.duration) * 100}%`,
                    }}
                  />
                </View>
                {/* times */}
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={{color: 'white'}}>
                    {formatTime(progress.position)}
                  </Text>
                  <Text style={{color: 'white'}}>
                    {formatTime(progress.duration)}
                  </Text>
                </View>
                {/* mix buttons */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Pressable onPress={addTracksToQueue}>
                    <Entypo name="shuffle" size={25} color={'#1ED760'} />
                  </Pressable>

                  <Pressable>
                    <Fontisto name="arrow-swap" size={25} color={'#1ED760'} />
                  </Pressable>
                </View>

                {/* controllers */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 40,
                  }}>
                  <Pressable onPress={seekBackward}>
                    <Entypo
                      name="controller-fast-backward"
                      size={30}
                      color={'white'}
                    />
                  </Pressable>

                  <Pressable onPress={playPreviousTrack}>
                    <Ionicons name="play-skip-back" size={30} color={'white'} />
                  </Pressable>

                  <Pressable onPress={togglePlayback}>
                    {isPlaying ? (
                      <FontAwesome name="pause" size={40} color={'white'} />
                    ) : (
                      <FontAwesome name="play" size={40} color={'white'} />
                    )}
                  </Pressable>

                  <Pressable onPress={playNextTrack}>
                    <Ionicons
                      name="play-skip-forward"
                      size={30}
                      color={'white'}
                    />
                  </Pressable>

                  <Pressable onPress={seekForward}>
                    <Entypo
                      name="controller-fast-forward"
                      size={30}
                      color={'white'}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </>
  );
};

export default LikedSongScreen;

const styles = StyleSheet.create({
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
  },
  albumCover: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    resizeMode: 'cover',
    marginRight: 20,
  },
  trackTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  trackSubtitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },

  // modal styles
  modalcontainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    paddingTop: 30,
    borderRadius: 20,
    padding: 10,
  },

  modalImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    backgroundColor: 'white',
    height: '100%',
  },
});
