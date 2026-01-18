import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import AuthScreen from '../screens/AuthScreen';
import ProfileDashboard from '../screens/ProfileDashboard';
import HomeScreen from '../screens/HomeScreen';
import EnrolledCourses from '../screens/EnrolledCourses';
import NotFoundScreen from '../screens/NotFoundScreen';
import { storage } from '../utils/storage';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await storage.getToken();
    setIsLoggedIn(!!token);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0E1B3D' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      initialRouteName={isLoggedIn ? 'ProfileDashboard' : 'Home'}
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0E1B3D' }, animation: 'ios_from_left' }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ gestureEnabled: true }} />
      <Stack.Screen name="ProfileDashboard" component={ProfileDashboard} />
      <Stack.Screen name="EnrolledCourses" component={EnrolledCourses} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}
