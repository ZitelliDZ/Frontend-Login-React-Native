import React, { useContext, useReducer } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ProtectedScreen from '../screens/ProtectedScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/auth/AuthContext';
import Loading from '../components/Loading';
import ProductsNavigator from './ProductsNavigator';

const Stack = createStackNavigator();

const Navigation = () => {

  const {status} = useContext(AuthContext)

  if (status === 'checking') {
    return (<Loading />);
  }


  return (
    
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}

    >

      {
        status !== 'authenticated' ?
        (
          <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) :
        (
          <>
            <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default Navigation

