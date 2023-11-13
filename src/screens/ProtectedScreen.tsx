import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProtectedScreen = () => {
  const {logOut, user} = useContext(AuthContext);
  const [token, settoken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        settoken(token);
      }
    })();
    
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Screen</Text>
      <Button
        title="logout"
        onPress={() => {
          logOut();
        }}
        color={'#5856D6'}
      />
      <Text>{JSON.stringify({user, token}, null, 2)}</Text>
    </View>
  );
};

export default ProtectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});
