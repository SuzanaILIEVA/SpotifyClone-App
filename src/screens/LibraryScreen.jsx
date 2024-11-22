import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {AlbumContext} from '../context/AlbumContext';
import Loader from '../components/Loader';
import Error from '../components/Error';

import {useNavigation} from '@react-navigation/native';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const headerTitles = [
    'Play Lists',
    'Podcasts',
    'Albums',
    'Artists',
    'Downloads',
  ];

  const {albums, loading, error} = useContext(AlbumContext);
  //   console.log('albums=====', albums);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      {/* header */}
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          marginBottom: 20,
        }}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAqOFvRymkUtq98cu5cgOza2yBq_KLf-xZmsD2yetOennC5xQ6g9gavkuTCM4abfDsUF0&usqp=CAU',
              width: 60,
              height: 60,
            }}
            style={{borderRadius: 50}}
          />
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}>
            Your Library
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Feather name="search" size={25} color={'white'} />
          <Feather name="plus" size={25} color={'white'} />
        </View>
      </View>

      {/* headerTitles */}
      <ScrollView horizontal style={{height: '10%'}}>
        {headerTitles.map(items => (
          <View
            key={items}
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '400',
                color: '#fff',
                gap: 10,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20,

                paddingHorizontal: 10,
                marginBottom: 10,
                height: 40,
                padding: 5,
              }}>
              {items}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* albums */}

      <Text
        style={{color: 'white', padding: 5, fontSize: 20, fontWeight: 'bold'}}>
        Recently Played...
      </Text>
      <ScrollView style={{paddingHorizontal: 5, marginTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
            justifyContent: 'center',
          }}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            albums
              .slice(0, 9)
              .reverse()
              .map((album, i) => (
                <View key={i}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      width: 100,
                      height: 200,
                      marginBottom: 20,
                    }}>
                    <Pressable
                      onPress={() => navigation.navigate('Info', {album})}>
                      <Image
                        source={
                          album?.data?.coverArt?.sources[0].url
                            ? {uri: album?.data?.coverArt?.sources[0].url}
                            : require('../assets/images/imagesong.jpg')
                        }
                        style={{width: 90, height: 150, borderRadius: 20}}
                      />
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 16,
                          color: 'white',
                          padding: 10,
                        }}>
                        {album.data.name}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 30,
            gap: 40,
            marginBottom: 30,
            margin: 20,
          }}>
          <View>
            <View style={styles.circle}>
              <Feather name="plus" size={70} color={'white'} />
            </View>
            <Text style={{color: 'white', marginLeft: 20, fontSize: 16}}>
              Add Artist
            </Text>
          </View>
          <View>
            <View style={styles.squer}>
              <Feather name="plus" size={70} color={'white'} />
            </View>
            <Text style={{color: 'white', marginLeft: 10, fontSize: 16}}>
              Add Postcast
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  squer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
