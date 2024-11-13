import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = () => {
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      {/* <Loader /> */}
      <ScrollView contentContainerStyle={{padding: 3}}>
        <View style={styles.headercontainer}>
          <View style={styles.headercontent}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAqOFvRymkUtq98cu5cgOza2yBq_KLf-xZmsD2yetOennC5xQ6g9gavkuTCM4abfDsUF0&usqp=CAU',
                width: 60,
                height: 60,
              }}
              style={{borderRadius: 50}}
            />
            <Text style={styles.headertext}>message</Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={40}
            color={'white'}
          />
        </View>
        {/* tab buttons */}
        <View style={styles.tabButtons}>
          <Pressable style={styles.tabBtn}>
            <Text style={styles.tabBtnText}>Music</Text>
          </Pressable>
          <Pressable style={styles.tabBtn}>
            <Text style={styles.tabBtnText}>Podcasts & Shows</Text>
          </Pressable>
        </View>

        {/* types */}
        <View>
          <Pressable style={styles.songsRow}>
            <LinearGradient
              colors={['#33006F', '#fff']}
              style={{borderRadius: 10}}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="heart" size={32} color="white" />
              </Pressable>
            </LinearGradient>
            <Text
              style={{
                color: 'white',
                marginLeft: 20,
                fontSize: 20,
              }}>
              Liked Songs
            </Text>
          </Pressable>

          <Pressable style={styles.songsRow}>
            <LinearGradient
              colors={['#33006F', '#fff']}
              style={{borderRadius: 10}}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="party-popper"
                  size={32}
                  color="white"
                />
              </Pressable>
            </LinearGradient>
            <Text
              style={{
                color: 'white',
                marginLeft: 20,
                fontSize: 20,
              }}>
              The Party Hits
            </Text>
          </Pressable>

          <Pressable style={styles.songsRow}>
            <LinearGradient
              colors={['#33006F', '#fff']}
              style={{borderRadius: 10}}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="star" size={32} color="white" />
              </Pressable>
            </LinearGradient>
            <Text
              style={{
                color: 'white',
                marginLeft: 20,
                fontSize: 20,
              }}>
              90s Love Songs
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headercontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headercontent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    paddingVertical: 20,
  },
  headertext: {
    color: 'white',
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabButtons: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  tabBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 5,
    elevation: 2,
  },
  tabBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  songsRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    borderRadius: 10,
  },
});
