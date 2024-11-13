import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <View style={{height: 100}} />
        <Icon name="spotify" size={80} color="white" />
        <Text
          style={{
            color: '#fff',
            fontSize: 38,
            fontWeight: 'bold',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: 30,
            margin: 5,
          }}>
          Millions of Songs Free on Spotify!
        </Text>

        <View style={{height: 80}} />

        <Pressable
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.loginBtnText}>Sign in with Spotify</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <FontAwesome
            name="mobile-phone"
            size={35}
            color="white"
            style={{paddingLeft: 10}}
          />
          <Text style={styles.btnText}>Sign in with Phone Number</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <FontAwesome
            name="google"
            size={28}
            color="white"
            style={{paddingLeft: 10}}
          />
          <Text style={styles.btnText}>Sign in with Google</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <FontAwesome
            name="facebook-square"
            size={28}
            color="white"
            style={{paddingLeft: 10}}
          />
          <Text style={styles.btnText}>Sign in with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: '#1ED760',
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  loginBtnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    borderWidth: 0.8,
    borderColor: '#C0C0C0',
    width: '80%',
    padding: 10,
    borderRadius: 30,
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 25,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'left',
  },
});
