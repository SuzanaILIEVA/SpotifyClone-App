import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import {API_KEY} from '../utils';
import axios from 'axios';

const LikedSongScreen = () => {
  const [searchText, setSearchText] = useState('popular musics');
  const [searchedTracks, setSearchTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

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
      console.log(response.data);

      setSearchTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);
  return (
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
                <Pressable style={{}}>
                  <View style={styles.trackContainer}>
                    <Image
                      source={{uri: item.track.images.coverart}}
                      style={styles.albumCover}
                    />

                    <View style={{flex: 1}}>
                      <Text style={styles.trackTitle}>{item.track.title}</Text>
                      <Text style={styles.trackSubtitle}>
                        {item.track.subtitle}
                      </Text>
                    </View>

                    <Entypo name="controller-play" size={30} color={'white'} />
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </LinearGradient>
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
});
