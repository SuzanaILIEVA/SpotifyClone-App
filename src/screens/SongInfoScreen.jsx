import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const SongInfoScreen = () => {
  const navigation = useNavigation();
  // Access the song details from the navigation params.
  const route = useRoute();
  const {album} = route.params || {};
  // console.log('infooooo=====>>>', album);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={{padding: 10}}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={34} color="#1ED760" />
          </TouchableOpacity>

          <View>
            <Image
              source={
                album.data.coverArt.sources[0].url
                  ? {uri: album.data.coverArt.sources[0].url}
                  : require('../assets/images/imagesong.jpg')
              }
              style={styles.image}
            />
          </View>
          <Text style={styles.albumTitle}>{album.data.name}</Text>

          <Text style={styles.albumTitle}>
            {album.data.artists.items[0].profile.name}
          </Text>
        </View>

        <Pressable style={styles.controlView}>
          <Pressable style={styles.downloadbtn}>
            <Feather name="download" size={26} color={'white'} />
          </Pressable>
          <View style={styles.playButtonView}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={30}
              color={'#1ED760'}
            />
            <Pressable style={styles.playBtn}>
              <Entypo name="controller-play" size={30} color={'white'} />
            </Pressable>
          </View>
        </Pressable>

        <View style={styles.info}>
          <View>
            <Text style={styles.artist}>Album : {album.data.name}</Text>

            <Text style={styles.artist}>
              Artist : {album.data.artists.items[0].profile.name}
            </Text>
            <Text style={styles.artist}>Year : {album.data.date.year}</Text>
          </View>
          <View>
            <Entypo name="dots-three-vertical" size={30} color={'white'} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#131624',
    overflow: 'hidden',
    borderRadius: 10,
  },
  albumTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  controlView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playButtonView: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadbtn: {
    backgroundColor: '#1ED760',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  playBtn: {
    backgroundColor: '#1ED760',
    padding: 15,
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  artist: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 5,
    fontWeight: '500',
    fontSize: 22,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 50,
  },
});
