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

const SongInfoScreen = () => {
  const navigation = useNavigation();
  // Access the song details from the navigation params.
  const route = useRoute();
  const {album} = route.params || {};

  console.log('infooooo=====>>>', album);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={{padding: 10}}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={34} color="#1ED760" />
          </TouchableOpacity>

          <View>
            <Image
              source={{uri: album.data.coverArt.sources[0].url}}
              style={styles.image}
            />
          </View>
          <Text style={styles.albumTitle}>{album.data.name}</Text>

          <Text style={styles.albumTitle}>
            {album.data.artists.items[0].profile.name}
          </Text>
          <Text style={styles.albumTitle}>{album.data.date.year}</Text>
        </View>

        <Pressable>{/* -----------------*/}</Pressable>
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
});
