import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <StatusBar hidden />
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
