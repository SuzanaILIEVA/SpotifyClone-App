import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import LikedSongScreen from '../screens/LikedSongScreen';
import SongInfoScreen from '../screens/SongInfoScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    // <View style={styles.shadowOverlay}>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#131624',
          ...(Platform.OS === 'android' && {
            shadowColor: '#fff',
            elevation: -10, // Android için gölge yüksekliği
          }),
          ...(Platform.OS === 'ios' && {
            shadowColor: '#000',
            shadowRadius: 10,
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: -10},
          }),
          height: 60,
          paddingBottom: 10,
          paddingTop: 3,
          borderTopWidth: 0.7,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: '#fff', fontSize: 13, fontWeight: '500'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="home" size={28} color={'white'} />
            ) : (
              <Ionicons name="home-outline" size={24} color={'white'} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {color: '#fff', fontSize: 13, fontWeight: '500'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="person" size={28} color={'white'} />
            ) : (
              <Ionicons name="person-outline" size={24} color={'white'} />
            ),
        }}
      />
    </Tab.Navigator>
    // </View>
  );
};

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#040306" barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Liked" component={LikedSongScreen} />
        <Stack.Screen name="Info" component={SongInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
// const styles = StyleSheet.create({
//   shadowOverlay: {
//     height: -30, // Gölge yüksekliği (ihtiyaca göre ayarlayın)
//     backgroundColor: '#000', // Gölge rengi
//     position: 'absolute',
//     bottom: 0, // Ekranın altında konumlandırma
//     left: 0,
//     right: 0,
//     borderRadius: 20, // Gölge kırpma radiusı
//     zIndex: 2, // Tab bar'ın üstünde görünmesi için
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: -5},
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: -10, // Android'de gölge oluşturmak için
//   },
// });
