import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

const Error = ({error}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#fff', fontSize: 25, fontWeight: '500'}}>
        erorrr {error.message}
      </Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({});
