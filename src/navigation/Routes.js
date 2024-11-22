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
import LibraryScreen from '../screens/LibraryScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#131624',
          ...(Platform.OS === 'android' && {
            shadowColor: '#fff',
            elevation: -10,
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

      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarLabelStyle: {color: '#fff', fontSize: 13, fontWeight: '500'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="library" size={28} color={'white'} />
            ) : (
              <Ionicons name="library-outline" size={24} color={'white'} />
            ),
        }}
      />
    </Tab.Navigator>
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
