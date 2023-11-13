import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';
import {ProductProvider} from './src/context/product/ProductContext';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
